<!--
 * @Description: 
 * @Author: lxd
 * @Date: 2020-09-16 17:07:08
 * @LastEditTime: 2020-09-18 18:00:57
-->
<template>
  <div class="login-wrapper">
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
      label-width="20px"
    >
      <div class="title-container">
        <h3 class="title">阅燃经纪人画手管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="icon-container">
          <i class="iconfont icon-people_fill"></i>
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
        <span class="icon-container">
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
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>

    <!-- <el-dialog
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
            <el-input
              v-model="passwordForm.newpassword"
              show-password
            ></el-input>
          </el-form-item>
          <span class="fl tip"
            >检测到您的密码或存在风险，为了您的账号安全，请先修改密码</span
          >
          <el-button type="primary" class="login-btn fr" @click="apiUpdatePwd"
            >确定</el-button
          >
        </el-form>
    </el-dialog>-->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form, Input } from 'element-ui'
import { setToken, setUser, clearUserInfo } from '@/utils/cache'
@Component({
  name: 'Login'
})
export default class extends Vue {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!value) {
      callback(new Error('请输入用户名'))
    } else {
      callback()
    }
  }

  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (!value) {
      callback(new Error('请输入密码'))
    } else {
      callback()
    }
  }
  private loginForm = {
    username: 'admin',
    password: '111111'
  }
  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: 'blur' }],
    password: [{ validator: this.validatePassword, trigger: 'blur' }]
  }
  private passwordType = 'password'
  private loading = false

  private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      ;(this.$refs.password as Input).focus()
    })
  }

  private handleLogin() {
    ;(this.$refs.loginForm as Form).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true
        // await UserModule.Login(this.loginForm)
        // this.$router.push({
        //   path: this.redirect || '/',
        //   query: this.otherQuery
        // })
        // Just to simulate the time of the request
        setTimeout(() => {
          this.apiLogin()
          this.loading = false
        }, 500)
      } else {
        return false
      }
    })
  }
  private apiLogin() {
    const data = {
      du_: 'asdadsda',
      id: 1,
      paths: ['/'],
      userInfoBO: {
        account: 'admin',
        name: '管理员'
      }
    }
    setToken(data.du_)
    setUser(data)
    this.$router.push('/')
    // const params = {
    //   account: this.loginForm.username.trim(),
    //   pwd: this.loginForm.password
    // }
    // login(params)
    //   .then(async res => {
    //     if (res.data && res.data.userInfoBO) {
    //       // 需要强制修改密码
    //       if (res.data.userInfoBO.editPwd === 1) {
    //         this.loading = false
    //         this.userId = res.data.userInfoBO.id
    //         setToken(res.data.du_) // 为了请求头中带入token
    //         this.passwordDialog = true
    //       } else {
    //         setToken(res.data.du_)
    //         setUser(res.data)
    //         this.$router.push('/')
    //       }
    //     }
    //   })
    //   .catch(() => {
    //     this.loading = false
    //   })
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

.login-wrapper {
  .login-form {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 380px;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 15px;
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
      .el-form-item__content {
        display: flex;
        align-items: center;
      }
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
.login-wrapper {
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

  .icon-container {
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
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
    // margin-left: 15px;
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
