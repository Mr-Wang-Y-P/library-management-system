<template>
  <indexHeader></indexHeader>
  <div class="home">
    <SliderLeft></SliderLeft>
    <!-- <sliderRight></sliderRight> -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import indexHeader from '@/components/indexHeader.vue';
// import sliderRight from '@/components/sliderRight.vue';
import SliderLeft from '@/components/SliderLeft.vue';
</script>

<style  scoped>
.home{
  display: flex;
  flex: 1;
}
</style>
