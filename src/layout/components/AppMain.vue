<!--
 * @Description: 
 * @Author: lxd
 * @Date: 2020-06-08 17:31:42
 * @LastEditTime: 2020-07-28 16:07:36
-->
<template>
  <section class="app-section">
    <transition name="fade-transform" mode="out-in">
      <main class="app-main-wrap">
        <router-view :key="key" />
      </main>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-section {
  /*50 = navbar  */
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-section {
  padding-top: 50px;
}
.app-main-wrap {
  padding: 20px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
