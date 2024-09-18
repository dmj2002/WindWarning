<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
const islogin = ref(true)
const loginForm = ref({
  username: '',
  password: ''
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form :model="loginForm" v-if="islogin">
        <h1>登录</h1>
        <el-form-item>
          <el-input v-model="loginForm.username" placeholder="请输入用户名" :prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码?</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
        <div class="register-link">
          <a href="#">注册 <span class="arrow">→</span></a>
        </div>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
}
.login-page .bg {
  background: url(/src/assets/login_bg.jpg) no-repeat center / cover;
  border-radius: 0 20px 20px 0;
}
.login-page .form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
}
.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.button {
  width: 100%;
}
</style>
