<!--
 * @Description: 
 * @Author: lxd
 * @Date: 2020-09-18 09:45:42
 * @LastEditTime: 2020-09-18 10:33:46
-->
<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { AppModule } from '@/store/modules/app'
import { PathsModule } from '@/store/modules/paths'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import global from '@/styles/global.scss'

export default {
  data() {
    return {
      showLogo: true
    }
  },
  components: { SidebarItem, Logo },
  computed: {
    // ...mapGetters(['permission_routes', 'sidebar']),
    permission_routes() {
      return PathsModule.routes
    },
    sidebar() {
      return AppModule.sidebar
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return global
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
