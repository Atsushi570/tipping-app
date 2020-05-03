import axiosAuth from '~/plugins/axiosAuth.js'

export const state = () => ({
  idToken: null
})

export const mutations = {
  updateIdToken(state, idToken) {
    state.idToken = idToken
  }
}

export const actions = {
  // アカウントの新規登録が成功した場合にユーザ名の登録をする
  // すべて成功した場合にidTokenをstoreに格納する
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
    } catch (error) {
      // 今はに握りつぶしてるが別ブランチで例外処理追加済みなのでこのブランチでは実装しない
    }
  }
}
