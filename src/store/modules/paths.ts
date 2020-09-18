/*
 * @Description:
 * @Author: lxd
 * @Date: 2020-09-17 09:51:01
 * @LastEditTime: 2020-09-17 11:43:39
 */
import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import { asyncRoutes, lastRoutes, constantRoutes } from '@/router'
import store from '@/store'

export interface IPathsState {
  routes: any[]
  addRoutes: any[]
}

@Module({ dynamic: true, store, name: 'paths' })
class Paths extends VuexModule implements IPathsState {
  public routes: any[] = []
  public addRoutes: any[] = []

  @Mutation
  private SET_ROUTES(routes: any) {
    this.addRoutes = routes
    this.routes = constantRoutes.concat(routes)
  }

  @Action
  public generateRoutes(paths: any[]) {
    return new Promise(resolve => {
      if (!paths) {
        throw Error('权限地址不存在')
      }
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, paths).concat(
        lastRoutes
      )
      this.SET_ROUTES(accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

/**
 * Use meta.role to determine if the current user has permission
 * @param paths
 * @param route
 */
function hasPermission(paths: Array<string>, route: any) {
  if (paths.includes(route.path)) {
    return true
  } else {
    return false
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param paths
 */
export function filterAsyncRoutes(
  routes: Array<object>,
  paths: Array<string>
): Array<object> {
  console.log('调用了函数filterAsyncRoutes')
  const res: any = []

  routes.forEach((route: any) => {
    const tmp = { ...route }
    if (hasPermission(paths, tmp) || tmp.path === '') {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, paths)
      }
      res.push(tmp)
    }
  })

  return res
}

export const PathsModule = getModule(Paths)
