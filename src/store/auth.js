import axiosAuth from '~/plugins/axiosAuth.js'
import axiosAuthRefresh from '~/plugins/axiosAuthRefresh.js'

export const state = () => ({
  idToken: null,
  displayName: null
})

export const mutations = {
  updateIdToken(state, idToken) {
    state.idToken = idToken
  },
  updateDisplayName(state, displayName) {
    state.displayName = displayName
  }
}

export const actions = {
  // アカウントの新規登録が成功した場合にユーザ名の登録をする
  // すべて成功した場合にidTokenとuserNameをstoreに格納する
  async register({ commit }, authData) {
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
      commit('updateIdToken', response.data.idToken)
      commit('updateDisplayName', authData.userName)
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
      commit('updateIdToken', response.data.idToken)
      commit('updateDisplayName', response.data.displayName)

      setTimeout(() => {
        dispatch('refreshToken', response.data.refreshToken)
      }, response.data.expiresIn * 1000)
      return true
    } catch (error) {
      return false
    }
  },

  // 引数で受け取ったrefreshTokenを使ってidTokenをrefreshする
  refreshToken({ commit, dispatch }, refreshToken) {
    try {
      axiosAuthRefresh
        .post('/token?key=' + process.env.API_KEY, {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        .then((response) => {
          commit('updateIdToken', response.data.id_token)

          setTimeout(() => {
            dispatch('refreshToken', response.data.refresh_token)
          }, response.data.expires_in * 1000)
        })
    } catch (error) {}
  }
}
