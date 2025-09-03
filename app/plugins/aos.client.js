import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    nuxtApp.hook('app:mounted', () => {
      AOS.init()
      AOS.refreshHard()
    })

  //   nuxtApp.hook('page:finish', () => {
  //     document.querySelectorAll("[data-aos]").forEach(el => {
  //   el.removeAttribute("data-aos");
  // });
  //     setTimeout(() => {
  //       AOS.refreshHard()
  //     }, 100)
  //   })
  }
})
