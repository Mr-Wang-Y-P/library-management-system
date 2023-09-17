<template>
    <div class="container">
        <div class="desc">基本资料</div>
        <div class="information">
            <div class="title">读书破万卷，下笔如有神</div>
            <div class="content">
                <div class="avatar">
                    <img :src="userInfo.image" alt="个人头像">
                </div>
                <div class="info">
                    <div class="userId">userId | {{userInfo.userId}}</div>
                    <div class="name">姓名 | {{userInfo.name}}</div>
                    <div class="phone">手机号 | {{userInfo.phone}}</div>
                    <div class="password">密码 | {{userInfo.password}}</div>
                    <div class="emali">邮箱 | {{userInfo.email}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref} from 'vue';
const userInfo = ref({})

onMounted(() => {
    userInfo.value = JSON.parse(sessionStorage.getItem('userInfo'))
    console.log('111');
})
// watch(() => sessionStorage.getItem('userInfo'), (newValue) => {  
//   userInfo.value = JSON.parse(newValue);  
//   console.log(userInfo.value.image);  
// });
</script>

<style lang="less" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 10px 40px;
    .desc {
        width: 100%;
        font-size: 28px;
        font-weight: 100;
        text-align: center;
        padding: 20px 0;
        border-bottom: 1px dashed #333;
    }
    .information {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
            width: 100%;
            padding: 20px 0;
            text-align: center;
        }
        .content {
            width: 80%;
            display: flex;
            margin: 90px auto auto auto;
            .avatar {
                text-align: right;
                padding-right: 60px;
                flex: 1;
                border-radius: 50%;
                img {
                    width: 250px;
                    height: 250px;
                    border-radius: 50%;
                }
            }
            .info {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
            }
        }
    }
}

</style>