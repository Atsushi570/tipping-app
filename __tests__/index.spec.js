import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Component from '~/pages/index.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let router = null
let wrapper = null
let wrapperSuccess = null
let wrapperFail = null

beforeEach(() => {
  // test毎に初期化をする
  router = { push: jest.fn() }

  // firebaseへのログインが成功するwrapper
  wrapperSuccess = shallowMount(Component, {
    stubs: ['nuxt-link'],
    store: new Vuex.Store({
      actions: {
        'auth/login': () => {
          return new Promise((resolve) => {
            resolve(true)
          })
        }
      },
      mutations: {},
      state: {},
      getters: {}
    }),
    mocks: {
      $router: router
    },
    localVue
  })
  wrapperSuccess.formElementEmail = wrapperSuccess.find('[type=Email]')
  wrapperSuccess.formElementPassword = wrapperSuccess.find('[type=password]')

  // firebaseへのログインが失敗するwrapper
  wrapperFail = shallowMount(Component, {
    stubs: ['nuxt-link'],
    store: new Vuex.Store({
      actions: {
        'auth/login': () => {
          return new Promise((resolve) => {
            resolve(false)
          })
        }
      },
      mutations: {},
      state: {},
      getters: {}
    }),
    mocks: {
      $router: router
    },
    localVue
  })
  wrapperFail.formElementEmail = wrapperFail.find('[type=Email]')
  wrapperFail.formElementPassword = wrapperFail.find('[type=password]')

  // デフォルトはFirebaseAuthへのログインが成功するwrapperを使用する
  wrapper = wrapperSuccess
})

afterEach(() => {
  wrapper.destroy()
})

describe('index.vueのテスト', () => {
  describe('フォームの入出力テスト', () => {
    const correctEmail = 'test@example.com'
    const correctPassword = 'password'

    test('EmailとPasswordの入力フォームが存在すること', () => {
      expect(wrapper.formElementEmail.exists()).toBe(true)
      expect(wrapper.formElementPassword.exists()).toBe(true)
    })

    test('フォームに入力をしたときにdataの入力した文字列が反映されること', () => {
      wrapper.formElementEmail.vm.$emit('input', correctEmail)
      wrapper.formElementPassword.vm.$emit('input', correctPassword)

      expect(wrapper.vm.formEmail.input).toBe(correctEmail)
      expect(wrapper.vm.formPassword.input).toBe(correctPassword)
    })

    describe('ログインが成功するパターンのテスト', () => {
      test('dataのerrorMessageが空であること,isLoginFailedはfalseであること,dashboardへのrouter.pushが呼ばれること', async () => {
        wrapper.formElementEmail.vm.$emit('input', correctEmail)
        wrapper.formElementPassword.vm.$emit('input', correctPassword)
        wrapper.find('button.button').trigger('click')

        // dispatch 処理完了を待つ
        await flushPromises()

        expect(wrapper.vm.formEmail.errorMessage).toBe('')
        expect(wrapper.vm.formPassword.errorMessage).toBe('')
        expect(wrapper.vm.isLoginFailed).toBe(false)
        expect(router.push).toBeCalledWith('dashboard')
      })
    })

    describe('ログインが失敗するときのテスト', () => {
      test('要件を満たさない入力をしてログインボタンをクリックしたときにdataのerrorMessageが空ではなく,isLoginFailedはfalseであること', () => {
        wrapper.formElementEmail.vm.$emit('input', 'test')
        wrapper.formElementPassword.vm.$emit('input', 'pass')
        wrapper.find('button.button').trigger('click')

        expect(wrapper.vm.formEmail.errorMessage).not.toBe('')
        expect(wrapper.vm.formPassword.errorMessage).not.toBe('')
        expect(wrapper.vm.isLoginFailed).toBe(false)
      })

      test('要件を満たすがfirebaseAuthの認証が失敗する入力をしてログインボタンをクリックしたときにdataのerrorMessageが空であり,isLoginFailedはtrueであること,router.pushが呼ばれないこと', async () => {
        // FirebaseAuthへのログインが失敗するwrapperを使用する
        wrapper = wrapperFail

        wrapper.formElementEmail.vm.$emit('input', correctEmail)
        wrapper.formElementPassword.vm.$emit('input', 'errorPassword')
        wrapperFail.find('button.button').trigger('click')

        // dispatch 処理完了を待つ
        await flushPromises()

        expect(wrapper.vm.formEmail.errorMessage).toBe('')
        expect(wrapper.vm.formPassword.errorMessage).toBe('')
        expect(wrapper.vm.isLoginFailed).toBe(true)
        expect(router.push).not.toBeCalled()
      })
    })
  })
})
