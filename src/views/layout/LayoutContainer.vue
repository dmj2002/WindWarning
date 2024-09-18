<script setup>
import { useRouter, useRoute } from 'vue-router'
import { User } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

function logout() {
  // 处理退出逻辑，例如清除用户信息并跳转到登录页面
  router.push('/login')
}
</script>

<template>
  <el-menu
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="route.path"
  >
    <h2 class="title">
      <span>风电预警系统</span>
    </h2>
    <el-menu-item index="/home">首页</el-menu-item>
    <el-menu-item index="/warning">预警</el-menu-item>
    <el-menu-item index="/report">报告</el-menu-item>
    <el-menu-item index="/settings">设置</el-menu-item>
    <div class="user-avatar">
      <el-dropdown>
        <span class="el-dropdown-link">
          <!-- <el-avatar icon="el-icon-user" class="custom-avatar" /> -->
          <el-avatar class="custom-avatar">
            <el-icon><User /></el-icon>
          </el-avatar>
        </span>
        <template v-slot:dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-menu>
  <router-view></router-view>
</template>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin: 20px 0;
  padding: 10px;
  background-color: #545c64;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title span {
  display: inline-block;
  padding: 0 10px;
}
.el-menu {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.user-avatar {
  position: absolute;
  top: 10px;
  right: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  outline: none;
}
</style>
