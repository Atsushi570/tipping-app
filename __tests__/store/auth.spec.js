/* eslint-disable no-global-assign */
import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import axios from 'axios'
import LocalStorageMock from '../../__mocks__/localstrage'
import * as auth from '~/store/auth'
import * as axiosFirebaseAuth from '~/plugins/axiosFirebaseAuth.js'

// テストでlocalStrageを使用できるようモックを定義する
localStorage = new LocalStorageMock()

// テストでtimerを操作できるようfakeTimerを宣言する
jest.useFakeTimers()

// axiosのモックを定義
// test対象が利用しているplugins内のaxiosインスタンスをモックする
// 戻り値のmockAxiosGetResultはテスト毎に変更する
const testIdToken = 'idToken'
const testRefreshToken = 'refreshToken'
const testExpiresIn = 0
const testDisplayName = 'displayName'
const testUid = 'testUid'
let mockAxiosPostResult = null

function createMock(target) {
  return jest.spyOn(target, 'post').mockReturnValue(mockAxiosPostResult)
}

// テスト対象のactionsを定義
// 呼び出すactionはテスト毎に変更する
let action = null
const testedAction = (context = {}, payload = {}) => {
  return auth.actions[action].bind({ $axios: axios })(context, payload)
}

// refreshTokenの呼び出しを監視するspyの定義
const refreshTokenSpy = jest
  .spyOn(auth.actions, 'refreshToken')
  .mockReturnValue('')

// テスト対象のactionsがmutationを呼び出せるようactionsに渡すstoreを定義
const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store(auth)

// テスト対象のactionsに必要な引数の定義
// テスト毎に変更する
const payload = { userName: testDisplayName }

beforeEach(() => {
  // テスト前にglobalのlocalstrageとrefreshTokenSpyを初期化する
  localStorage.clear()
  refreshTokenSpy.mockClear()

  // axiosPostの戻り値は正常系をデフォルトとする
  mockAxiosPostResult = {
    data: {
      idToken: testIdToken,
      refreshToken: testRefreshToken,
      expiresIn: testExpiresIn,
      displayName: testDisplayName,
      localId: testUid
    }
  }
})

describe('store/auth.jsのテスト', () => {
  // mutationsはactionsの中で読みだされるため個別のテストは行わない
  describe('actionsのテスト', () => {
    describe('registerのテスト', () => {
      test('新規登録のPOSTが成功したとき、trueが返り、idTokenなどの認証情報をstoreとlocalstrageに保存できること', async () => {
        // 使用するaxiosインスタンスのmockを定義
        const firebaseSignUpMock = createMock(axiosFirebaseAuth.signUp)
        const firebaseUpdateMock = createMock(axiosFirebaseAuth.update)

        // registerを呼び出す
        action = 'register'
        const result = await testedAction(store, payload)

        // actions 内のsetTimeoutを実行する
        jest.runAllTimers()

        // storeとlocalstrageに各種データが保存されること
        expect(result).toBe(true)
        expect(firebaseSignUpMock).toHaveBeenCalled()
        expect(firebaseUpdateMock).toHaveBeenCalled()
        expect(store.state.idToken).toBe(testIdToken)
        expect(store.state.refreshToken).toBe(testRefreshToken)
        expect(store.state.displayName).toBe(testDisplayName)
        expect(store.state.uid).toBe(testUid)
        expect(localStorage.idToken).toBe(testIdToken)
        expect(localStorage.expirationDateTime).not.toBe(undefined)
        expect(localStorage.refreshToken).toBe(testRefreshToken)
        expect(localStorage.displayName).toBe(payload.userName)
        expect(localStorage.uid).toBe(testUid)
        expect(refreshTokenSpy).toHaveBeenCalledTimes(1)
      })

      test('新規登録のPOSTが失敗したとき、falseを返す', async () => {
        // axiosが例外を返すよう変更する
        mockAxiosPostResult = () => {
          throw new Error('error')
        }

        // 使用するaxiosインスタンスのmockを定義
        const firebaseSignUpMock = createMock(axiosFirebaseAuth.signUp)

        // registerを呼び出す
        action = 'register'
        const result = await testedAction(store, payload)

        // actions 内のsetTimeoutを実行する
        jest.runAllTimers()

        // storeとlocalstrageに各種データが保存されること
        expect(result).toBe(false)
        expect(firebaseSignUpMock).toHaveBeenCalled()
      })
    })

    describe('loginのテスト', () => {
      test('loginのPOSTが成功したとき、戻り値のidTokenなどの認証情報をstoreとlocalstrageに保存できること', async () => {
        // 使用するaxiosインスタンスのmockを定義
        const firebaseSignInMock = createMock(axiosFirebaseAuth.signIn)

        // loginを呼び出す
        action = 'login'
        const result = await testedAction(store, payload)

        // actions 内のsetTimeoutを実行する
        jest.runAllTimers()

        // storeとlocalstrageに各種データが保存されること
        expect(result).toBe(true)
        expect(firebaseSignInMock).toHaveBeenCalled()
        expect(store.state.idToken).toBe(testIdToken)
        expect(store.state.refreshToken).toBe(testRefreshToken)
        expect(store.state.displayName).toBe(testDisplayName)
        expect(localStorage.idToken).toBe(testIdToken)
        expect(localStorage.uid).toBe(testUid)
        expect(localStorage.expirationDateTime).not.toBe(undefined)
        expect(localStorage.refreshToken).toBe(testRefreshToken)
        expect(localStorage.displayName).toBe(payload.userName)
        expect(localStorage.uid).toBe(testUid)
        expect(refreshTokenSpy).toHaveBeenCalledTimes(1)
      })

      test('loginのPOSTが失敗したとき、falseを返す', async () => {
        // axiosが例外を返すよう変更する
        mockAxiosPostResult = () => {
          throw new Error('error')
        }

        // 使用するaxiosインスタンスのmockを定義
        const firebaseSignInMock = createMock(axiosFirebaseAuth.signIn)

        // loginを呼び出す
        action = 'login'
        const result = await testedAction(store, payload)

        // actions 内のsetTimeoutを実行する
        jest.runAllTimers()

        // storeとlocalstrageに各種データが保存されること
        expect(result).toBe(false)
        expect(firebaseSignInMock).toHaveBeenCalled()
      })
    })

    describe('autoLoginのテスト', () => {
      test('idTokenが有効期限外の時、refreshTokenを実行すること', () => {
        // autoLoginを呼び出す
        action = 'autoLogin'
        testedAction(store, payload)

        // refreshTokenが呼び出されること
        expect(refreshTokenSpy).toHaveBeenCalledTimes(1)
      })

      test('idTokenが有効期限内の時、refreshTokenを実行すること', () => {
        // テストに必要なlocalstrageを更新する'
        localStorage.setItem('expirationDateTime', Date.now() + 10000)
        localStorage.setItem('idToken', testIdToken)

        // autoLoginを呼び出す
        action = 'autoLogin'
        testedAction(store, payload)

        // actions 内のsetTimeoutを実行する
        jest.runAllTimers()

        // idTokenが更新され、refreshTokenが呼び出されること
        expect(store.state.idToken).toBe(testIdToken)
        expect(localStorage.idToken).toBe(testIdToken)
        expect(refreshTokenSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('clearAuthDataのテスト', () => {
      test('storeとlocalstrageが初期化できること', async () => {
        // 使用するaxiosインスタンスのmockを定義
        createMock(axiosFirebaseAuth.signIn)

        // loginを呼び出す
        action = 'login'
        await testedAction(store, payload)

        // actions 内のsetTimeoutを実行する
        jest.runAllTimers()

        // storeとlocalstrageに各種データが保存されること
        expect(store.state.idToken).toBe(testIdToken)
        expect(store.state.refreshToken).toBe(testRefreshToken)
        expect(store.state.displayName).toBe(testDisplayName)
        expect(localStorage.idToken).toBe(testIdToken)
        expect(localStorage.uid).toBe(testUid)
        expect(localStorage.expirationDateTime).not.toBe(undefined)
        expect(localStorage.refreshToken).toBe(testRefreshToken)
        expect(localStorage.displayName).toBe(payload.userName)
        expect(localStorage.uid).toBe(testUid)

        action = 'clearAuthData'
        testedAction(store, payload)

        expect(store.state.idToken).toBe(null)
        expect(store.state.refreshToken).toBe(null)
        expect(store.state.displayName).toBe(null)
        expect(localStorage.idToken).toBe(undefined)
        expect(localStorage.uid).toBe(undefined)
        expect(localStorage.expirationDateTime).toBe(undefined)
        expect(localStorage.refreshToken).toBe(undefined)
        expect(localStorage.displayName).toBe(undefined)
        expect(localStorage.uid).toBe(undefined)
      })
    })
  })
})
