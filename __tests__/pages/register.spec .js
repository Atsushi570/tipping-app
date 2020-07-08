import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Component from '~/pages/register.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let router = null
let wrapper = null
let wrapperSuccess = null
let wrapperFail = null

beforeEach(() => {
  // test毎に初期化をする
  router = { push: jest.fn() }

  // firebaseへの登録が成功するwrapper
  wrapperSuccess = shallowMount(Component, {
    stubs: ['nuxt-link'],
    store: new Vuex.Store({
      actions: {
        'auth/register': () => {
          return Promise.resolve(true)
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
  wrapperSuccess.formElementUserName = wrapperSuccess.find('[type=text]')
  wrapperSuccess.formElementEmail = wrapperSuccess.find('[type=Email]')
  wrapperSuccess.formElementPassword = wrapperSuccess.find('[type=password]')

  // firebaseへの登録が失敗するwrapper
  wrapperFail = shallowMount(Component, {
    stubs: ['nuxt-link'],
    store: new Vuex.Store({
      actions: {
        'auth/register': () => {
          return Promise.resolve(false)
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
  wrapperFail.formElementUserName = wrapperFail.find('[type=text]')
  wrapperFail.formElementEmail = wrapperFail.find('[type=Email]')
  wrapperFail.formElementPassword = wrapperFail.find('[type=password]')

  // デフォルトはFirebaseAuthへの登録が成功するwrapperを使用する
  wrapper = wrapperSuccess
})

afterEach(() => {
  wrapper.destroy()
})

describe('index.vueのテスト', () => {
  describe('フォームの入出力テスト', () => {
    const correctUserName = 'user'
    const correctEmail = 'test@example.com'
    const correctPassword = 'password'

    test('UserNameとEmailとPasswordの入力フォームが存在すること', () => {
      expect(wrapper.formElementUserName.exists()).toBe(true)
      expect(wrapper.formElementEmail.exists()).toBe(true)
      expect(wrapper.formElementPassword.exists()).toBe(true)
    })

    test('フォームに入力をしたときにdataの入力した文字列が反映されること', () => {
      wrapper.formElementUserName.vm.$emit('input', correctUserName)
      wrapper.formElementEmail.vm.$emit('input', correctEmail)
      wrapper.formElementPassword.vm.$emit('input', correctPassword)

      expect(wrapper.vm.formUserName.input).toBe(correctUserName)
      expect(wrapper.vm.formEmail.input).toBe(correctEmail)
      expect(wrapper.vm.formPassword.input).toBe(correctPassword)
    })

    describe('新規登録が成功するパターンのテスト', () => {
      test('computedのvalidate**が空であること,isRegisterFailedはfalseであること,dashboardへのrouter.pushが呼ばれること', async () => {
        wrapper.formElementUserName.vm.$emit('input', correctUserName)
        wrapper.formElementEmail.vm.$emit('input', correctEmail)
        wrapper.formElementPassword.vm.$emit('input', correctPassword)

        // button要素が有効になる処理完了を待つ
        await flushPromises()

        wrapper.find('button.button').trigger('click')

        // dispatch 処理完了を待つ
        await flushPromises()

        expect(wrapper.vm.validateUserName).toBe('')
        expect(wrapper.vm.validateEmail).toBe('')
        expect(wrapper.vm.validatePassword).toBe('')
        expect(wrapper.vm.isRegisterFailed).toBe(false)
        expect(router.push).toBeCalledWith('dashboard')
      })
    })

    describe('新規登録が失敗するときのテスト', () => {
      test('要件を満たさない入力をして新規登録ボタンをクリックしたときにcomputedのvalidate**が空ではなく,isRegisterFailedはfalseであること', async () => {
        wrapper.formElementUserName.vm.$emit('input', 'a')
        wrapper.formElementEmail.vm.$emit('input', 'wrongEmail')
        wrapper.formElementPassword.vm.$emit('input', 'wrong')

        // button要素が有効になる処理完了を待つ
        await flushPromises()

        wrapper.find('button.button').trigger('click')

        expect(wrapper.vm.validateUserName).not.toBe('')
        expect(wrapper.vm.validateEmail).not.toBe('')
        expect(wrapper.vm.validatePassword).not.toBe('')
        expect(wrapper.vm.isRegisterFailed).toBe(false)
      })

      test('要件を満たすがfirebaseAuthの登録が失敗する入力をして新規登録ボタンをクリックしたときにcomputedのvalidate**が空であり,isRegisterFailedはtrueであること,router.pushが呼ばれないこと', async () => {
        // FirebaseAuthへのログインが失敗するwrapperを使用する
        wrapper = wrapperFail

        wrapper.formElementUserName.vm.$emit('input', correctUserName)
        wrapper.formElementEmail.vm.$emit('input', correctEmail)
        wrapper.formElementPassword.vm.$emit('input', 'errorPassword')

        // button要素が有効になる処理完了を待つ
        await flushPromises()

        wrapperFail.find('button.button').trigger('click')

        // dispatch 処理完了を待つ
        await flushPromises()

        expect(wrapper.vm.validateUserName).toBe('')
        expect(wrapper.vm.validateEmail).toBe('')
        expect(wrapper.vm.validatePassword).toBe('')
        expect(wrapper.vm.isRegisterFailed).toBe(true)
        expect(router.push).not.toBeCalled()
      })
    })
  })
})
