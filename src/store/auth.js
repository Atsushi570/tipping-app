import axiosAuth from '~/plugins/axiosAuth.js'
import axiosAuthRefresh from '~/plugins/axiosAuthRefresh.js'

export const state = () => ({
  idToken: null,
  refreshToken: null,
  displayName: null,
  uid: null
})

export const getters = {
  displayName(state) {
    return state.displayName
  }
}

export const mutations = {
  updateIdToken(state, idToken) {
    state.idToken = idToken
    localStorage.setItem('idToken', idToken)
  },
  updateRefreshToken(state, { refreshToken, expiresIn }) {
    state.refreshToken = refreshToken
    localStorage.setItem('expirationDateTime', Date.now() + expiresIn * 1000) // idTokenの有効期限が切れるUNIX TIME
    localStorage.setItem('refreshToken', refreshToken)
  },
  updateDisplayName(state, displayName) {
    state.displayName = displayName
    localStorage.setItem('displayName', displayName)
  },
  updateUid(state, uid) {
    state.uid = uid
    localStorage.setItem('uid', uid)
  }
}

export const actions = {
  // アカウントの新規登録が成功した場合にユーザ名の登録をする
  // すべて成功した場合にidTokenとuserNameをstoreに格納する
  async register({ commit, dispatch }, authData) {
    try {
      const response = await axiosAuth.post(
        '/accounts:signUp?key=' + process.env.API_KEY,
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )
      await axiosAuth.post('accounts:update?key=' + process.env.API_KEY, {
        idToken: response.data.idToken,
        displayName: authData.userName,
        returnSecureToken: true
      })

      // responseをstoreとlocalstrageに保存する
      commit('updateDisplayName', authData.userName)
      commit('updateUid', response.data.localId)
      dispatch('saveAuthData', {
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      })

      // tokenの有効期限が切れる前にリフレッシュする処理を開始する
      setTimeout(() => {
        dispatch('refreshToken', response.data.refreshToken)
      }, response.data.expiresIn * 1000)
      return true
    } catch (error) {
      return false
    }
  },

  // ログインが成功した場合にidTokenをstoreに格納し、trueを返す
  // ログイン失敗時はfalseを返す
  // ログイン失敗時はresponse内のrefreshTokenとexpiresInを元に定期的にtokenをリフレッシュする
  async login({ commit, dispatch }, authData) {
    try {
      const response = await axiosAuth.post(
        '/accounts:signInWithPassword?key=' + process.env.API_KEY,
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )

      // responseをstoreとlocalstrageに保存する
      commit('updateDisplayName', response.data.displayName)
      commit('updateUid', response.data.localId)
      dispatch('saveAuthData', {
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      })

      // tokenの有効期限が切れる前に定期的にtokenをリフレッシュする処理を開始する
      setTimeout(() => {
        dispatch('refreshToken', response.data.refreshToken)
      }, localStorage.getItem('expirationDateTime') - Date.now())

      return true
    } catch (error) {
      return false
    }
  },

  // localstrageの情報からidTokenを取得、storeに保存してログイン状態にする
  // idTokenの有効期限が切れている場合はリフレッシュしてからidTokenをstoreに保存する
  autoLogin({ commit, dispatch }) {
    // idTokenが有効期限切れであればリフレッシュしてログイン状態に移行する
    if (Date.now() >= localStorage.getItem('expirationDateTime')) {
      dispatch('refreshToken', localStorage.getItem('refreshToken'))
    }

    // idTokenが有効期限内であればlocalstrageの認証をstoreに保存し、
    // tokenの有効期限が切れる前にリフレッシュする処理を開始する
    else {
      commit('updateIdToken', localStorage.getItem('idToken'))
      setTimeout(() => {
        dispatch('refreshToken', localStorage.getItem('refreshToken'))
      }, localStorage.getItem('expirationDateTime') - Date.now())
    }
  },

  // 引数で受け取った認証情報をstoreとlocalstrageに保存する
  // displayNameはリフレッシュ時には更新しないのでこの関数の外でcommitする
  saveAuthData({ commit }, { idToken, refreshToken, expiresIn }) {
    commit('updateIdToken', idToken)
    commit('updateRefreshToken', { refreshToken, expiresIn })
  },

  // 引数で受け取ったrefreshTokenを使ってidTokenをrefreshする
  async refreshToken({ dispatch }, refreshToken) {
    try {
      const response = await axiosAuthRefresh.post(
        '/token?key=' + process.env.API_KEY,
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }
      )

      dispatch('saveAuthData', {
        idToken: response.data.id_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in
      })

      setTimeout(() => {
        dispatch('refreshToken', response.data.refresh_token)
      }, response.data.expires_in * 1000)
    } catch (error) {}
  }
}
