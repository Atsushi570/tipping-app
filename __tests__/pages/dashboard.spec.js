import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
// import flushPromises from 'flush-promises'
import Component from '~/pages/dashboard.vue'

// wrapperとwrapperに渡す変数を定義する
let wrapper = null
const localVue = createLocalVue()
localVue.use(Vuex)
const router = { push: jest.fn() }
const actions = {
  // fetchで呼び出しているwatchDoc()はテスト対象外とする
  'auth/clearAuthData': jest.fn(),
  'firestore/unsubscribe': jest.fn(),
  'firestore/clearUsersData': jest.fn()
}
const firestore = {
  namespaced: true,
  getters: {
    users: () => users
  }
}
const auth = {
  namespaced: true,
  getters: {
    uid: () => loginUserId
  }
}
const users = {
  otherUserUid: {
    displayName: 'test user',
    wallet: '2000'
  },
  loginUserUid: {
    displayName: 'login user',
    wallet: '1000'
  }
}
const loginUserId = 'loginUserUid'

beforeEach(() => {
  // firebaseへのログインが成功するwrapper
  wrapper = shallowMount(Component, {
    stubs: ['nuxt-link'],
    store: new Vuex.Store({
      actions,
      mutations: {},
      state: {},
      modules: {
        auth,
        firestore
      }
    }),
    mocks: {
      $router: router
    },
    localVue
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('dashboard.vueのテスト', () => {
  test('ページ読み込み時の表示', () => {
    // ログイン中ユーザのuidを取得できること
    expect(wrapper.vm.uid).toBe(loginUserId)

    // firestoreから全てのユーザ情報であるusersを取得できること
    expect(wrapper.vm.users).toEqual(users)

    // modalが表示されていないこと
    expect(wrapper.vm.modal.isActive).toBe(false)
  })
  describe('UserTableコンポーネントのイベント発火時の挙動', () => {
    test('typeにwalletを指定したとき', async () => {
      // typeにwalletを指定する
      const type = 'wallet'
      const uid = 'otherUserUid'

      // UserTableコンポーネントのdisplayModalイベントを発火してDOMの更新を待つ
      const userTable = wrapper.find('usertable-stub')
      userTable.vm.$emit('displayModal', {
        uid,
        type
      })
      await wrapper.vm.$nextTick()

      // 各dataが更新されること
      expect(wrapper.vm.modal.isActive).toBe(true)
      expect(wrapper.vm.modal.type).toBe(type)
      expect(wrapper.vm.selectedUser).toBe(users.otherUserUid)
      expect(wrapper.vm.modalTitle).not.toBe('送る金額')

      // Modalが表示されること
      const modal = wrapper.find('modal-stub')
      expect(modal.exists()).toBe(true)

      // Modal要素のclickCloseイベントを発火してDOMの更新を待つ
      modal.vm.$emit('clickClose')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('modal-stub').exists()).toBe(false)
    })
    test('typeにtippingを指定したとき', async () => {
      // typeにtippingを指定する
      const type = 'tipping'
      const uid = 'otherUserUid'

      // UserTableコンポーネントのdisplayModalイベントを発火してDOMの更新を待つ
      const userTable = wrapper.find('usertable-stub')
      userTable.vm.$emit('displayModal', {
        uid,
        type
      })
      await wrapper.vm.$nextTick()

      // 各dataが更新されること
      expect(wrapper.vm.modal.isActive).toBe(true)
      expect(wrapper.vm.modal.type).toBe(type)
      expect(wrapper.vm.selectedUser).toBe(users.otherUserUid)
      expect(wrapper.vm.modalTitle).toBe('送る金額')

      // Modalが表示されること
      const modal = wrapper.find('modal-stub')
      expect(modal.exists()).toBe(true)

      // Modal要素のclickCloseイベントを発火してDOMの更新を待つ
      modal.vm.$emit('clickClose')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('modal-stub').exists()).toBe(false)
    })
  })
  test('ログアウトボタンをクリックしたときの挙動', () => {
    // ログアウトボタンのclickイベントを発火する
    wrapper.find('.welcomeMessage button-stub').vm.$emit('click')

    // ログアウト処理に必要な関数が呼ばれること
    expect(actions['auth/clearAuthData']).toHaveBeenCalled()
    expect(actions['firestore/clearUsersData']).toHaveBeenCalled()
    expect(wrapper.vm.$router.push).toHaveBeenCalled()
  })
  test('コンポーネントがdestroyしたときの挙動', () => {
    // コンポーネントをdestroyする
    wrapper.destroy()

    // unsubscribeが呼ばれること
    expect(actions['firestore/unsubscribe']).toHaveBeenCalled()
  })
})
