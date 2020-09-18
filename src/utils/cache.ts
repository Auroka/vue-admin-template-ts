/*
 * @Description:
 * @Author: lxd
 * @Date: 2020-09-17 09:28:16
 * @LastEditTime: 2020-09-17 09:54:47
 */
import Cookies from 'js-cookie'

// App
const sidebarStatusKey = '_admin_sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(sidebarStatusKey, sidebarStatus)

// 用户token
const TOKENKEY = '_admin_contract_token'
export function getToken() {
  return Cookies.get(TOKENKEY)
}
export function setToken(token: string) {
  Cookies.set(TOKENKEY, token, { expires: 7 })
}

// 用户信息
const USERKEY = '_admin_contract_userinfo'
export const getUser = () => JSON.parse(localStorage.getItem(USERKEY) || '')

export function setUser(user: any) {
  localStorage.setItem(USERKEY, JSON.stringify(user))
}

// 清空用户信息
export function clearUserInfo() {
  Cookies.remove(TOKENKEY)
  localStorage.removeItem(USERKEY)
}
