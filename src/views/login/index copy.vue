<!-- author:pys -->
<template>
  <div class="login-warpper">
    <img
      class="login-image-bg"
      src="https://imagezm.12yrmh.com/adminloginbg.jpg"
      alt
    />
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">阅燃经纪人画手管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont icon-lock_fill"></i>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <i
            class="iconfont"
            :class="
              passwordType === 'password' ? 'icon-eye-close' : 'icon-eye-open'
            "
          ></i>
        </span>
      </el-form-item>

      <el-button
        class="login-btn"
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>

    <el-dialog
      class="paw-dialog"
      title="密码修改"
      :visible.sync="passwordDialog"
      :close-on-click-modal="false"
      :show-close="false"
      width="500px"
    >
      <el-form label-width="70px" :model="passwordForm" class="clearfix">
        <el-form-item label="新密码">
          <el-input
            type="text"
            v-model="passwordForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="passwordForm.newpassword" show-password></el-input>
        </el-form-item>
        <span class="fl tip"
          >检测到您的密码或存在风险，为了您的账号安全，请先修改密码</span
        >
        <el-button type="primary" class="login-btn fr" @click="apiUpdatePwd"
          >确定</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      userId: '',
      passwordDialog: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      passwordType: 'password',
      passwordForm: {
        password: '',
        newpassword: ''
      },
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(res => {
              if (res) {
                // 第一次登录需要强制修改密码
                this.userId = res
                this.passwordDialog = true
                this.loading = false
              } else {
                this.$router.push('/')
              }
            })
            .catch(error => {
              this.loading = false
              this.$message.closeAll()
              this.$message.error(error.message)
            })
          return
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    apiUpdatePwd() {
      if (!this.userId) {
        return false
      }
      if (!this.passwordForm.password) {
        return false
      }
      if (!this.passwordForm.newpassword) {
        return false
      }
      if (
        this.passwordForm.password.length < 6 ||
        this.passwordForm.password.length > 20
      ) {
        this.$message.warning('密码长度只能在6-20个字符之间')
        return false
      }
      if (!/^[a-zA-Z0-9_ ]*$/.test(this.passwordForm.password)) {
        this.$message.warning('密码只能是数字英文下划线')
        return false
      }
      if (this.passwordForm.password != this.passwordForm.newpassword) {
        this.$message.warning('密码不一致')
        return false
      }
      const params = {
        id: this.userId,
        password: this.passwordForm.password,
        oldPassword: this.loginForm.password
      }
      // 请求更新密码接口
      updateUser(params)
        .then(res => {
          this.$message.success('密码修改成功,请重新登录')
          // 清空登录信息
          this.loginForm.password = ''
          // this.$store.dispatch("user/logout");
          this.passwordDialog = false
        })
        .catch(error => {
          this.$message.closeAll()
          this.$message.error(error.message)
        })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .login-form .el-input input {
    color: $cursor;
  }
}

// 去除自动填充的颜色（设置延迟）
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition-delay: 99999s;
  -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
}

.login-warpper {
  .login-form {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 440px;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #fff;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px transparent inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

  .paw-dialog .el-dialog {
    margin-top: 240px !important;
    .tip {
      font-size: 12px;
      color: red;
      line-height: 36px;
    }
  }
}
</style>

<style lang="scss" scoped>
.login-warpper {
  position: relative;
  min-height: 100%;
  width: 100%;
  // background: url("http://imagezm.12yrmh.com/adminloginbg.jpg") no-repeat;
  // background-size: 100% 100%;
  overflow: hidden;
  .login-image-bg {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 20px 35px 0;
    top: 240px;
    margin: 0 auto;
    overflow: hidden;
    box-sizing: content-box;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.2);
    .login-btn {
      padding: 15px 20px;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0px 0px 0px 10px;
    color: #fff;
    i {
      font-size: 20px;
    }
    .el-icon-user-solid {
      font-size: 18px;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #fff;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    margin-left: 15px;
    color: #fff;
    cursor: pointer;
    // user-select: none;
    i {
      font-size: 18px;
    }
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
