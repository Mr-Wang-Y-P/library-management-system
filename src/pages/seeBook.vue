<template>
    <div class="book">
        <div class="bookHeader">
            <lookBookHeader></lookBookHeader>
        </div>
        <div class="introduction">
            <div class="bookContent">
                <div class="bookImage">
                    <img :src="bookData.url" alt="">
                </div>
                <div class="bookDescribe">
                    <h1 class="title">
                        {{ bookData.name }}
                    </h1>
                    <div class="sortAuthor">
                        <span class="sort">
                            {{ bookData.sort }}
                        </span>
                        <span class="author">
                            {{ bookData.author }}&著
                        </span>
                        <span class="publisher">
                            {{ bookData.publisher }}
                        </span>
                    </div>
                    <div class="text">
                        {{ bookData.describe }}
                    </div>
                    <span class="count" v-if="bookData.stock > 0" :style="{ color: bookData.stock <= 3 ? 'red' : '' }">
                        还剩{{ bookData.stock }} 本
                    </span>
                    <div class="btn">
                        <el-button v-if="bookData.stock > 0" type="primary" @click="Borrow">借阅</el-button>
                        <el-button v-else type="primary" disabled>已借完</el-button>
                    </div>
                    <span class="count1" v-if="bookData.stock > 0">
                        已借{{ maxBorrowNumber }} 本
                    </span>
                    <span class="count3" style="color: red;margin-left:10px">
                        还书默认按照借阅时间顺序归还
                    </span>
                    <div class="count2">
                        <el-input-number v-if="maxBorrowNumber > 0" v-model="borrowNumber" :min="1" :max="maxBorrowNumber" />
                    </div>
                    <div class="btn1">
                        <el-button v-if="maxBorrowNumber > 0" type="primary" @click="returnBook(borrowNumber)">还书</el-button>
                        <el-button v-else type="primary" disabled>暂无书可还</el-button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import lookBookHeader from '../components/lookBookHeader.vue';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getSelectedBook, updateBook } from '../utils/getbooks'
import { addBorrow, getBorrowBook, updateBorrow } from '../utils/getBorrow'
import { addDays, formatDate, deleteDays } from '@/assets/js/addTime'
import { customAlphabet } from 'nanoid'
import { ElMessage, ElMessageBox } from 'element-plus'
const borrowNumber = ref(0)
const maxBorrowNumber = ref(0)
const bookData = ref({})
const route = useRoute()
const borrowForm = ref({})
const personBorrowList = ref([])
const passCount = ref(0)
const nanoid = customAlphabet('1234567890', 8)
onMounted(async () => {
    // console.log(route.params.id);

    let res = await getSelectedBook(route.params.id)
    bookData.value = res.data[0]
    console.log(bookData.value);
    // 不变的数据
    borrowForm.value.bookname = bookData.value.name
    borrowForm.value.nameid = bookData.value.nameid
    borrowForm.value.userId = JSON.parse(sessionStorage.getItem('userInfo')).userId
    borrowForm.value.borrowers = JSON.parse(sessionStorage.getItem('userInfo')).name

    // console.log(borrowForm.value);
    const borrowList = await getBorrowBook(route.params.id)
    console.log(borrowList.data);
    // 拿到这个人没还的书 的列表
    borrowList.data.forEach((item) => {
        if (Number(item.userId) === JSON.parse(sessionStorage.getItem('userInfo')).userId && item.reallyrepaytime.length === 0) {
            personBorrowList.value.push(item)
            if (deleteDays(formatDate(new Date()), item.repaytime) < 0) {
                passCount.value++;
            }
        }
    })
    console.log(passCount.value);
    if (passCount.value > 0) {
        // ElMessage.warning(`这本书你有${passCount.value}本已逾期,请尽快还书。`)
        ElMessageBox.alert(`这本书你有${passCount.value}本已逾期,请尽快还书。`, '还书提醒', {
            // if you want to disable its autofocus
            // autofocus: false,
            confirmButtonText: 'OK',
            callback: () => {
                ElMessage({
                    type: 'info',
                    message: '已确认提醒',
                })
            },
        })
    }
    console.log(personBorrowList.value)
    maxBorrowNumber.value = personBorrowList.value.length
})

const Borrow = async () => {
    console.log('借阅书籍');
    // await addBorrow()
    // 变的数据
    // console.log( borrowForm.value, bookData.value);
    const borrowTime = formatDate(new Date());
    const repayTime = formatDate(addDays(new Date(), 30));
    console.log(borrowTime, repayTime)
    borrowForm.value.borrowtime = borrowTime
    borrowForm.value.repaytime = repayTime
    borrowForm.value.reallyrepaytime = ''
    borrowForm.value.borrowId = Number(nanoid());
    console.log(borrowForm.value);
    const res = await addBorrow(borrowForm.value)
    console.log(res.data);
    bookData.value.stock = bookData.value.stock - 1
    console.log(bookData.value);
    const result = await updateBook(bookData.value)
    console.log(result.data);

    // 借书 更新还书信息
    // 获取借书总列表 筛选出当前用户的借书 未还书的列表
    const borrowList = await getBorrowBook(route.params.id)
    console.log(borrowList.data);
    personBorrowList.value = [];
    borrowList.data.forEach((item) => {
        if (Number(item.userId) === JSON.parse(sessionStorage.getItem('userInfo')).userId && item.reallyrepaytime.length === 0) {
            personBorrowList.value.push(item)
        }
    })
    console.log(personBorrowList.value)
    maxBorrowNumber.value = personBorrowList.value.length
}
const returnBook = async (borrowNumber) => {
    console.log('还书', borrowNumber);
    // 获取借书总列表 筛选出当前用户的借书 未还书的列表
    const borrowList = await getBorrowBook(route.params.id)
    console.log(borrowList.data);
    personBorrowList.value = [];
    borrowList.data.forEach((item) => {
        if (Number(item.userId) === JSON.parse(sessionStorage.getItem('userInfo')).userId && item.reallyrepaytime.length === 0) {
            personBorrowList.value.push(item)
        }
    })
    // 一次还多少本书
    // personBorrowList 默认是 时间顺序 存入
    for (let i = 0; i < borrowNumber; i++) {
        personBorrowList.value[i].reallyrepaytime = formatDate(new Date());
        console.log(personBorrowList.value[i]);
        const borrowRes = await updateBorrow(personBorrowList.value[i])
        console.log(borrowRes.data);
    }
    bookData.value.stock = Number(bookData.value.stock) + Number(borrowNumber)
    maxBorrowNumber.value = maxBorrowNumber.value - borrowNumber
    const result = await updateBook(bookData.value)
    console.log(result.data);
}
</script>

<style lang="less" scoped>
.book {
    background-image: url('http://read.nlc.cn/static/style/css/images/zt_yuewen/ymh_WLWX_home_back.jpg');
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;

    .bookHeader {
        zoom: 1.5;
        height: 200px;
    }

    .introduction {
        width: 60%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px rgba(255, 255, 255, 0.4) solid;
        margin-top: 30px;
        height: 550px;

        .bookContent {
            background: rgba(255, 255, 255, 0.9);
            height: 100%;
            display: flex;
            position: relative;

            .bookImage {
                width: 350px;
                height: 450px;
                margin-top: 50px;
                margin-left: 50px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .bookDescribe {
                margin-left: 50px;
                margin-top: 30px;
                flex: auto;

                .title {
                    width: 100%;
                    color: #001B77;
                    text-align: justify;
                }

                .sortAuthor {
                    margin-top: 40px;
                    margin-left: 15px;
                    font-style: normal;
                    font-weight: 500;
                    font-size: 20px;

                    .sort {
                        margin-right: 30px;
                        background: #FFFFFF;
                        border: 1px #8DC1E9 solid;
                        padding: 0 8px 1px 8px;
                        white-space: nowrap;
                        color: #2D94DF;
                    }

                    .author {
                        margin-right: 30px;
                    }
                }

                .text {
                    width: 440px;
                    margin-top: 40px;
                    margin-left: 15px;
                    font-size: 18px;
                    color: #999999;
                    text-align: justify;
                    max-height: 220px;
                    white-space: wrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .btn {
                    position: absolute;
                    bottom: 50px;
                    right: 40px;
                    width: 100px;
                    height: 40px;

                    button {
                        width: 100%;
                        height: 100%;

                        span {
                            font-size: 24px;
                        }
                    }

                }

                .count {
                    position: absolute;
                    bottom: 60px;
                    left: 500px;
                }

                .btn1 {
                    position: absolute;
                    bottom: 5px;
                    right: 40px;
                    width: 100px;
                    height: 40px;

                    button {
                        width: 100%;
                        height: 100%;

                        span {
                            font-size: 24px;
                        }
                    }

                }

                .count1 {
                    position: absolute;
                    bottom: 10px;
                    left: 500px
                }

                .count2 {
                    position: absolute;
                    bottom: 7px;
                    left: 630px
                }
            }
        }
    }

    :deep(.el-button>span) {
        font-size: 20px;
    }
}</style>