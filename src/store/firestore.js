import firebase from '~/plugins/firebase'

export const state = () => ({
  unsubscribe: null,
  users: {}
})

export const getters = {
  users(state) {
    return state.users
  }
}

export const mutations = {
  // ドキュメントの監視を停止する時に呼び出す関数をstoreにcommitする
  setUnsubscribe(state, unsubscribe) {
    state.unsubscribe = unsubscribe
  },
  // ドキュメントの新規読み出し、および、更新を検知した際にstoreにcommitする
  updateUsers(state, { id, userInfo }) {
    state.users = { ...state.users, [id]: userInfo }
  }
}

export const actions = {
  // ドキュメントの監視を開始する
  // ドキュメントが更新されたらstateのusersを更新する
  async watchDoc({ commit }) {
    const unsubscribe = await firebase
      .firestore()
      .collection('users')
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          commit('updateUsers', { id: doc.id, userInfo: doc.data() })
        })
      })
    commit('setUnsubscribe', unsubscribe)
  },

  // ドキュメントの監視をやめる
  unsubscribe({ state }) {
    state.unsubscribe()
  }
}
