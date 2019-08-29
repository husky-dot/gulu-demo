import Toast from './toast'

let currentToast
export default {
  install(Vue, options) {
    if (currentToast) {
      currentToast.close()
    }
    Vue.prototype.$toast = function (message, toastOptions) {
      currentToast = createToast({Vue, message, propsData:toastOptions})
    }
  } 
}

function createToast ({Vue,message, propsData,onClose}) {
  let Constructor = Vue.extend(Toast)
  let toast = new Constructor({propsData})
  toast.$slots.default = [message]
  toast.$mount()
  toast.$on('close', onClose)
  document.body.appendChild(toast.$el)
  return toast
}