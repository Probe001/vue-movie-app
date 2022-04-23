import { shallowMount } from '@vue/test-utils'
import Movie from '~/routes/Movie'
import store from '~/store'
import router from '~/routes'
import loadImage from '~/plugins/loadImage'

describe('routes/Movie.vue', () => {
  let wrapper

  beforeEach(async ()=> {
    window.scrollTo = jest.fn()
    router.push('/movie/tt1234567')
    await router.isReady()
    wrapper = shallowMount(Movie, {
      global: {
        plugins: [
          store,
          router,
          loadImage
        ]
      }
    })
  })

  test('최초 접속한 URL 파라미터 확인', () => {
    expect(wrapper.vm.$route.params.id).toBe('tt1234567')
  })

  test('지정한 이미지 크기로 URL 변경여부 확인', () => {
    const url = 'https://google.com/sample_image_SX300.jpg'
    expect(wrapper.vm.requestDiffSizeImage(url)).toContain('SX700')
  })

  test('정상 이미지가 아닌 경우 빈 문자열 반환 확인', () => {
    expect(wrapper.vm.requestDiffSizeImage('')).toBe('')
    expect(wrapper.vm.requestDiffSizeImage('N/A')).toBe('')
  }) 
})
