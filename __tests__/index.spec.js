import { shallowMount } from '@vue/test-utils'
import Component from '~/pages/index.vue'

describe('Testing index page', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(Component, {
      stubs: ['nuxt-link']
    })
    expect(wrapper.isVueInstance).toBeTruthy()
  })
})
