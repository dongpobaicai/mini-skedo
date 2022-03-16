import { createApp } from "vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from "./App";
import 'virtual:svg-icons-register'
import { ComponentsLoader } from './loader'

const init = () => {
  const componentsLoader = ComponentsLoader.get()
  componentsLoader.load()
}
init()
const app = createApp(App)
app.use(ElementPlus)
app.mount("#app");
