<template>
    <div class="header">
        <h1 class="logoText1">
            好书上新
        </h1>
        <h1 class="logoText2">
            邀你畅读
        </h1>
        <div class="logoImg">
            <img src="../assets//images//homeBanner.png" alt="">
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.header {
    width: 750px;
    height: 180px;
    position: relative;
    zoom: 0.7;

    h1 {
        position: absolute;
        font-size: 50px;
        background-image: -webkit-linear-gradient(bottom, red, #fd8403, yellow);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-style: italic;
        width: 240px;
    }

    .logoText1 {
        left: 50px;
    }

    .logoText2 {
        left: 260px;
        top: 50px;
    }
}
</style>