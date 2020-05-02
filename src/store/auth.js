export const state = () => ({
  idToken: null
})

export const mutations = {
  updateIdToken(state, idToken) {
    state.idToken = idToken
  }
}

export const actions = {
  // ログインが成功した場合にidTokenをstoreに格納し、trueを返す
  // ログイン失敗時はfalseを返す
  async getToken({ commit }, authData) {
    try {
      const response = await this.$axios.$post(
        '/accounts:signInWithPassword?key=' + process.env.API_KEY,
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )
      commit('updateIdToken', response.idToken)
      return true
    } catch (error) {
      return false
    }
  }
}
