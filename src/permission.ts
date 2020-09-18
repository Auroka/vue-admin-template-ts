/*
 * @Description:
 * @Author: lxd
 * @Date: 2020-09-17 09:17:05
 * @LastEditTime: 2020-09-18 10:59:12
 */
import router from './router'
import { PathsModule } from './store/modules/paths'
import { Route } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken, getUser, clearUserInfo } from '@/utils/cache'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to: Route, from, next: any) => {
  // Start progress bar
  NProgress.start()

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const token = getToken()
  console.log('token:', token)
  if (token) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const permissionRoutes = PathsModule.routes
      if (permissionRoutes && permissionRoutes.length > 0) {
        next()
      } else {
        try {
          // get user info
          const { paths } = getUser()

          // generate accessible routes map based on roles
          // const accessRoutes = await store.dispatch(
          //   'permission/generateRoutes',
          //   paths
          // )
          const accessRoutes: any = await PathsModule.generateRoutes(paths)
          console.log('生成动态路由--成功')
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          // next({ ...to, replace: true }) // 会抛出一个异常 Error: Redirected when going from "/login" to "/" via a navigation guard.
          next()
        } catch (error) {
          console.log('生成动态路由--失败')
          clearUserInfo()
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    clearUserInfo()
    /* has no token*/
    if (to.path === '/login') {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  console.log('after')
  // Finish progress bar
  NProgress.done()
})
