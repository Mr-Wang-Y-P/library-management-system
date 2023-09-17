<template>
    <div :class="{container: true, 'sign-up-model': useForm.vari}">
        <div class="inner-left-container">
            <div class="login-content">
                <h1>图书管理系统</h1>
                <ElButton type="primary" @click="onClick">去注册</ElButton>
            </div>
            <img src="@/assets/welcome.svg" class="image">
        </div>
        <div class="inner-right-container">
            <div class="register-content">
                <h1>图书管理系统</h1>
                <ElButton type="primary" @click="onClick">去登录</ElButton>
            </div>
            <img src="@/assets/account.svg" class="image">
        </div>
        <div class="inner-sign-up-container">
            <LoginForm :key="dateKey" :class="{'sign-up-model': useForm.vari}" />
            <registerForm :key="dateKey" :class="{'sign-up-model': useForm.vari}" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from '@/components/sign/LoginForm.vue';
import registerForm from '@/components/sign/registerForm.vue';
import { useFormStore } from '@/stores/changeForm'

const useForm = useFormStore()
const dateKey = ref(Date.now())

/**登录、注册切换 */
const onClick = () => {
    useForm.changeForm()
    setTimeout(() => {
        dateKey.value = Date.now()
    },1000)
}

</script>

<style lang="less" scoped>
.container {
    width: 100vw;
    height: 100vh;
    background-color: white;
    overflow: hidden;
    position: relative;
    display: flex;

}
.container::before {
    content: "";
    height: 2000px;
    width: 2000px;
    background-color: rgb(160, 209, 35);
    position: absolute;
    z-index: 1;
    border-radius: 50%;
    transform: translateY(-55%);
    right: 50%;
    top: -10%;
    transition: 1.8s ease-in-out;
}
.inner-left-container {
    width: 0;
    flex: 1;
    z-index: 1;
    display: flex;
    flex-direction: column; 
    align-items: flex-end;
    justify-content: space-between;
    padding: 3rem 10% 2rem 10%;
    transition: 1.8s ease-in-out;
    pointer-events: all;
    .image {
        height: 50%;
        width: 100%;
    }
    .login-content {
        text-align: center;
    }
}
.inner-right-container {
    width: 0;
    flex: 1;
    z-index: 1;
    display: flex;
    flex-direction: column; 
    align-items: flex-start;
    justify-content: space-between;
    padding: 3rem 10% 2rem 10%;
    transform: translateX(1000px);
    transition: 1.8s ease-in-out;
    pointer-events: none;
    .image {
        height: 50%;
        width: 100%;
    }
    .register-content {
        text-align: center;
    }
}
.inner-sign-up-container {
    width: 50%;
    height: 50%;
    position: absolute;
    right: 0;
    top: 20%;
    transition: 1.8s ease-in-out;
    transition-delay: 0.3s;
    display: grid;
    grid-template-columns: 1fr;
}
// 动画
.container.sign-up-model::before {
    transform: translate(100%, -55%);
}
.container.sign-up-model .inner-right-container {
    transform: translateX(0px);
    transition: 1.8s ease-in-out;
    pointer-events: all;
}
.container.sign-up-model .inner-left-container {
    transform: translateX(-1000px);
    transition: 1.8s ease-in-out;
    pointer-events: none;
}
.container.sign-up-model .inner-sign-up-container {
    right: 50%;
    transition: 1.8s ease-in-out;
    transition-delay: 0.3s;
}
</style>