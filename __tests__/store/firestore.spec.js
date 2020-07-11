/* eslint-disable no-global-assign */
import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import * as firebase from '~/plugins/firebase'
import * as firestore from '~/store/firestore'

// テスト対象のactionsを定義
// 呼び出すactionはテスト毎に変更する
let action = null
const testedAction = (context = {}, payload = {}) => {
  return firestore.actions[action](context, payload)
}

// テスト対象のactionsがmutationを呼び出せるようactionsに渡すstoreを定義
const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store(firestore)

// firebase.firestore()のMockを作成する
// firestore()の振る舞いはテスト毎に定義する
jest.mock('~/plugins/firebase', () => ({
  firestore: jest.fn()
}))

describe('store/firestore.jsのテスト', () => {
  // mutationsはactionsの中で読みだされるため個別のテストは行わない
  describe('actionsのテスト', () => {
    describe('watchDocのテスト', () => {
      test('初回のDocument読み込み時に、subscribeが返り、Documentから読み込んだユーザ情報をstoreに保存できること', async () => {
        // テスト対象の処理に合わせてfirestore()の振る舞いを定義する
        let snapshots = []
        const firebaseMock = firebase.firestore.mockImplementation(() => {
          return {
            collection: jest.fn(() => ({
              onSnapshot: jest.fn((func) => {
                func(snapshots)
                return 'unsubscribe'
              })
            }))
          }
        })

        // stateに保存されるデータの定義
        let expectedUsers = {}

        // 複数回に分けてfirestoreからデータの更新を受け取る振る舞いをする
        for (let docCount = 0; docCount < 2; docCount++) {
          const user = {
            id: `docId${docCount}`,
            data: () => {
              return {
                userInfo: `userInfo${docCount}`
              }
            }
          }

          // watchDocを呼び出す
          snapshots = [user]
          action = 'watchDoc'
          await testedAction(store)

          // stateに保存されるデータをexpectedUsersに追加する
          expectedUsers = { ...expectedUsers, [user.id]: user.data() }
        }

        // firebaseMockが呼ばれてstateに各種データが保存されること
        expect(firebaseMock).toHaveBeenCalled()
        expect(store.state.users).toStrictEqual(expectedUsers)
        expect(store.state.unsubscribe).toBe('unsubscribe')
      })
    })
    describe('initUserDocumentのテスト', () => {
      test('ユーザのdisplayNameとwalletの初期設定をfirestoreにsetできること', async () => {
        // firestoreにsetする情報を保持する変数
        const expectedSet = {}

        // テスト対象の処理に合わせてfirestore()の振る舞いを定義する
        const firebaseMock = firebase.firestore.mockImplementation(() => {
          return {
            collection: jest.fn(() => ({
              doc: jest.fn(() => ({
                set: jest.fn(({ displayName, wallet }) => {
                  expectedSet.displayName = displayName
                  expectedSet.wallet = wallet
                })
              }))
            }))
          }
        })

        // 定義した引数を渡してinitUserDocumentを呼び出す
        action = 'initUserDocument'
        const payload = { uid: 'uid', displayName: 'test user' }
        const result = await testedAction(store, payload)

        // firestoreに各種データをsetできること
        expect(firebaseMock).toHaveBeenCalled()
        expect(result).toBe(true)
        expect(expectedSet).toStrictEqual({
          displayName: payload.displayName,
          wallet: 2000
        })
      })
    })

    describe('clearAuthDataのテスト', () => {
      test('storeを初期化できること', async () => {
        // firestoreにsetする情報を保持する変数
        const expectedSet = {}

        // テスト対象の処理に合わせてfirestore()の振る舞いを定義する
        firebase.firestore.mockImplementation(() => {
          return {
            collection: jest.fn(() => ({
              doc: jest.fn(() => ({
                set: jest.fn(({ displayName, wallet }) => {
                  expectedSet.displayName = displayName
                  expectedSet.wallet = wallet
                })
              }))
            }))
          }
        })

        // 定義した引数を渡してinitUserDocumentを呼び出す
        action = 'initUserDocument'
        const payload = { uid: 'uid', displayName: 'test user' }
        await testedAction(store, payload)

        // firestoreに各種データをsetできること
        expect(expectedSet).toStrictEqual({
          displayName: payload.displayName,
          wallet: 2000
        })

        action = 'clearUsersData'
        testedAction(store, payload)

        expect(store.state.unsubscribe).toBe(null)
        expect(store.state.users).toEqual({})
      })
    })
  })
})
