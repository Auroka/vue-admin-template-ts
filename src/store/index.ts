/*
 * @Description:
 * @Author: lxd
 * @Date: 2020-06-08 17:31:42
 * @LastEditTime: 2020-09-17 14:30:10
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './modules/app'
// import { IUserState } from './modules/user'
import { IPathsState } from './modules/paths'

Vue.use(Vuex)

export interface IRootState {
  app: IAppState
  // user: IUserState
  paths: IPathsState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})

// https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', true, /\.ts$/)

// // you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules: any, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)

//   modules[moduleName] = value.default
//   return modules
// }, {})

// const store = new Vuex.Store({
//   modules,
//   getters
// })

// export default store
