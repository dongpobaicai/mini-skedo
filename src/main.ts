import { createApp } from "vue";
import App from "./App";
import 'virtual:svg-icons-register'
import { ComponentsLoader } from './loader'

const init = () => {
  const componentsLoader = ComponentsLoader.get()
  componentsLoader.load()
}
init()
createApp(App).mount("#app");
