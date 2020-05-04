import axiosAuth from '~/plugins/axiosAuth.js'

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
  async login({ commit }, authData) {
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
      return true
    } catch (error) {
      return false
    }
  }
}
