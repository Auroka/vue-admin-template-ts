/*
 * @Description:
 * @Author: lxd
 * @Date: 2020-09-18 09:45:42
 * @LastEditTime: 2020-09-18 10:22:27
 */
import store from '@/store'
import { AppModule } from '@/store/modules/app'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        AppModule.CloseSideBar(false)
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      AppModule.ToggleDevice('mobile')
      AppModule.CloseSideBar(false)
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        AppModule.ToggleDevice(isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          AppModule.CloseSideBar(false)
        }
      }
    }
  }
}
