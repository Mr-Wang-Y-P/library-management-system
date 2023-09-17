<template>
  <div class="page">
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.page {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
}
</style>