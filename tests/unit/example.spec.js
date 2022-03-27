import ForgetPassword from '../../src/components/ForgetPassword.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/router"
import { shallowMount } from '@vue/test-utils'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

  test('premier test comme exemple', async () => {
    router.push('/Forget')
    await router.isReady()
    const wrapper = shallowMount(ForgetPassword,{
      mocks: {
        $t: () => {}
      },  
      global: {
        plugins: [router]
      }
  })
  const textInput = wrapper.find("#email")
  await textInput.setValue('la vie en rose')
  expect(textInput.element.value).toBe('la vie en rose')
  });