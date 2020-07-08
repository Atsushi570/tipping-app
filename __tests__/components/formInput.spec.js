import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '~/components/formInput.vue'

const localVue = createLocalVue()
const errorMessageProps = 'errorMessageProps'
const labelProps = 'labelProps'
const typeProps = 'typeProps'
const placeHolderProps = 'placeHolderProps'
let wrapper = null

beforeEach(() => {
  // 想定したpropsが渡されるwrapper
  wrapper = shallowMount(Component, {
    propsData: {
      errorMessage: errorMessageProps,
      label: labelProps,
      type: typeProps,
      placeHolder: placeHolderProps,
      localVue
    }
  })
  wrapper.formInput = wrapper.find('input')
})

afterEach(() => {
  wrapper.destroy()
})

describe('formInput.vueのテスト', () => {
  describe('フォームの入出力テスト', () => {
    const testInput = 'test input'

    test('inputフォームが存在すること', () => {
      expect(wrapper.formInput.exists()).toBe(true)
    })

    test('フォームに入力をしたときにdataの入力した文字列が反映されること', () => {
      wrapper.formInput.setValue(testInput)

      expect(wrapper.vm.input).toBe(testInput)
    })
  })
})
