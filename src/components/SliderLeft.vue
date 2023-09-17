<template>
  <el-row class="tac" v-if="userType == 'manage'">
    <el-col :span="24">
      <el-menu
        :default-active="preservedPath"
        class="el-menu-vertical-demo"
        router
      >
        <el-menu-item index="/home">
          <el-icon><House /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>书籍管理</span>
          </template>
          <el-menu-item index="/addBooks">录入新书</el-menu-item>
          <el-menu-item index="/searchBooks">查询并修改</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/searchUser">查询用户</el-menu-item>
          <el-menu-item index="/addUser">新增用户</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><document /></el-icon>
            <span>借阅记录</span>
          </template>
          <el-menu-item index="/allRecords">所有记录</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/announce">
          <el-icon><Bell /></el-icon>
          <span>公告</span>
        </el-menu-item>
        <el-menu-item index="/personal">
          <el-icon><setting /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  <el-row class="tac" v-else>
    <el-col :span="24">
      <el-menu
        :default-active="preservedPath"
        class="el-menu-vertical-demo"
        router
      >
        <el-menu-item index="/home">
          <el-icon><House /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="#">
          <template #title>
            <el-icon><location /></el-icon>
            <span>借阅管理</span>
          </template>
          <el-menu-item index="/lookBooks">借阅书籍</el-menu-item>
          <el-menu-item index="/borrowBooks">借书记录</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/announce">
          <el-icon><Bell /></el-icon>
          <span>公告</span>
        </el-menu-item>
        <el-menu-item index="/personal">
          <el-icon><setting /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import { Document, Menu as IconMenu, Location, Setting, House, Bell } from '@element-plus/icons-vue'
import { ref, onMounted, computed } from 'vue'
import router from '../router';
const userType = ref('')

onMounted(() => {
  const res = JSON.parse(sessionStorage.getItem('userInfo'))
  if(res){
    userType.value = res.type
  }
})

/**用于菜单激活选项的path获取 */
const preservedPath = computed(() => {
    const currentPath = router.currentRoute.value.path;
    const segments = currentPath.split('/').filter(segment => segment !== '');
    if (segments.length > 0) {
      return `/${segments.shift()}`;
    } else {
      return currentPath;
    }
  })

</script>

<style lang="less" scoped>
.el-row.tac {
    width: 20vw;
    max-width: 180px;
    max-height: calc(100vh - 80px);
    overflow: hidden;
    overflow-y: scroll;
}
.el-sub-menu__title span{
  font-size: 24px;
}
.el-sub-menu .el-icon{
  font-size: 24px;
}


.el-menu-item{
  font-size: 24px;
}
.el-sub-menu .el-menu-item{
  font-size: 20px;
}
.el-icon svg{
  width: 3em!important;
  height: 3em!important;
}
</style>
