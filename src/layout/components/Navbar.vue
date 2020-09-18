<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="right-container" trigger="click">
        <div class="name-wrapper">
          <span>{{ user && user.userInfoBO && user.userInfoBO.account }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="apiLogout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { AppModule } from '@/store/modules/app'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getUser, clearUserInfo } from '@/utils/cache'
// import { logout } from '@/api/user'
export default {
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    this.user = getUser()
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    sidebar() {
      return AppModule.sidebar
    }
  },
  methods: {
    toggleSideBar() {
      AppModule.ToggleSideBar()
    },
    apiLogout() {
      clearUserInfo()
      this.$router.push(`/login`)
      // logout()
      //   .then(res => {
      //     clearUserInfo()
      //     this.$router.push(`/login`)
      //   })
      //   .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    padding: 0px 15px;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-container {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      cursor: pointer;
      i {
        margin-left: 5px;
      }
    }
  }
}
</style>
