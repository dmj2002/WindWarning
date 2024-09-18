<script setup>
import 'element-plus/dist/index.css'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <el-menu
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="route.path"
  >
    <el-menu-item index="1">
      <span>风电预警系统</span>
    </el-menu-item>
    <el-menu-item index="/home">首页</el-menu-item>
    <el-menu-item index="/warning">预警</el-menu-item>
    <el-menu-item index="/report">报告</el-menu-item>
    <el-menu-item index="/settings">设置</el-menu-item>
  </el-menu>
  <router-view></router-view>
</template>

<style scoped>
.el-menu {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.last-item {
  margin-left: auto;
}
</style>
