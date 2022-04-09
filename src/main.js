import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/' // 특정한 폴더에 있는 index란 이름의 파일을 가져올 때는 파일 이름 생략 가능 ./routes/index.js
import store from './store/'
import loadImage from './plugins/loadImage'

createApp(App)
  .use(router) // $route, $router
  .use(store) // $store
  .use(loadImage) // $loadImage
  .mount('#app')