import firebase from '~/plugins/firebase'
const db = firebase.firestore()

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
  },

  // 引数で指定したuidをキーにしてドキュメントを新規作成する
  // フィールドには引数で指定したdisplayNameと2000のwalletを追加する
  // eslint-disable-next-line no-empty-pattern
  async initUserDocument({}, { uid, displayName }) {
    const result = await db
      .collection('users')
      .doc(uid)
      .set({
        displayName,
        wallet: 2000
      })
    console.log(result)
    return true
  }
}
