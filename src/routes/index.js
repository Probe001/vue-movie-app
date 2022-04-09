import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import Movie from './movie'
import NotFound from './NotFound'

export default createRouter({
  // Hash, History 두가지 모드가 존재.
  // Hash모드 : 메인 도메인 뒤쪽에 /#/ 을 붙여서 접근하는 모드.
  // 해쉬모드를 사용해야만 특정 페이지에서
  // 새로고침했을 때 페이지를 찾을수 없다는 메세지를 방지할 수 있다.
  // 히스토리모드는 서버에 세팅을 해야함.
  history: createWebHashHistory(),
  // pages
  routes: [
    {
      path: '/',
      // https://google.com 에서 끝에 /가 붙으면 메인페이지로 가겠다.
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/:pathMatch(.*)',
      component: NotFound
    }
  ],
  scrollBehavior() {
    return {top: 0}
  }
})