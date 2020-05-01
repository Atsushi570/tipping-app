export const state = () => ({
  idToken: null
})

export const mutations = {
  updateIdToken(state, idToken) {
    state.idToken = idToken
  }
}

export const actions = {
  login({ commit }, authDate) {
    this.$axios
      .$post('/accounts:signInWithPassword?key=' + process.env.API_KEY, {
        email: authDate.email,
        password: authDate.password,
        returnSecureToken: true
      })
      .then((response) => {
        commit('updateIdToken', response.idToken)
      })
  }
}
