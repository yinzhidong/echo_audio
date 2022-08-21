import { createApp } from "vue"
import EchoMask from "./Mask.vue"

export default {
  instance: null,
  parent: null,
  times: 0, 
  // 为了保证多个同时loading的时候，只显示一个，并且需要全部close之后才消失
  open() {
    if (this.times == 0) {
      this.instance = createApp(EchoMask)
      this.parent = document.createElement("div")
      let appDom = document.getElementById('app')
      appDom.appendChild(this.parent)

      this.instance.mount(this.parent)
    }
    this.times ++
  },
  close() {
    this.times --
    if (this.times <= 0) {
      this.times = 0
      let appDom = document.getElementById('app')
      this.instance.unmount(this.parent)
      appDom.removeChild(this.parent)
    }
  }
};