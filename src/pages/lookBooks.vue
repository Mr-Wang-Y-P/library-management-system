<template>
    <div class="lookBooks">
        <lookBookHeader></lookBookHeader>
        <div class="home_search">
            <input v-model="searchText" type="text" id="words" name="words" placeholder="请输入关键字">
            <input class="btn1" type="button" value="搜 索" @click="dataSearch(searchText)">
        </div>
        <div class="home_nav">
            <div class="box" v-for="(item, index) in sortList" :key="item" @click="setActive(index, item)"
                :class="{ active: activeIndex === index }">
                <span>
                    {{ item }}
                </span>
            </div>
        </div>
        <div class="books">
            <div class="books_content" ref="bookContent">
                <ul class="bookList">

                    <li v-for="item in bookList" :key="item.nameid" @click="$router.push(`/lookBooks/${item.nameid}`)">

                        <span class="pic">
                            <img v-lazyImg="item.url" alt="">
                        </span>
                        <span class="right">
                            <span class="tt">{{ item.name }}</span>
                            <span class="txt1">
                                <i class="lab">{{ item.sort }}</i>--{{ item.author }}著 </span>
                            <span class="txt1">
                                {{ item.publisher }}
                            </span>
                            <span v-if="item.stock > 0" class="txt1" :style="{ color: item.stock <= 3 ? 'red' : '' }">
                                还剩 {{ item.stock }} 本
                            </span>
                            <span v-else class="txt1" style="color:red ;">
                                已借完
                            </span>
                            <span class="txt2">
                                {{ item.describe }}
                            </span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { getBooksList, getSelectedBook } from '@/utils/getbooks'
import lookBookHeader from '../components/lookBookHeader.vue';
const sortList = ref(['全部'])
const bookList = ref({})
const activeIndex = ref(0);
const searchText = ref('')
const bookContent = ref(null)
const setActive = async (index, item) => {
    searchText.value = ''
    activeIndex.value = index;
    // console.log(item);
    if (item === '全部') {
        const res = await getBooksList()
        bookList.value = res.data
    }
    else {
        const res = await getSelectedBook(item)
        //   console.log(res.data);
        bookList.value = res.data
    }

}
const dataSearch = async (searchText) => {
    activeIndex.value = 0
    // console.log(searchText.length);
    if (searchText.length === 0) {
        const res = await getBooksList()
        bookList.value = res.data
    }
    else {
        const res = await getSelectedBook(searchText)
        bookList.value = res.data
    }
}
onMounted(async () => {
    const res = await getBooksList()
    // console.log(res);
    bookList.value = res.data
    console.log(bookList);
    const books = JSON.parse(JSON.stringify(bookList.value))
    books.forEach(item => {
        if (sortList.value.indexOf(item.sort) === -1) {
            sortList.value.push(item.sort)
        }
    });
    // console.log(sortList);
})
// 监听书籍列表的变化， 每次更新数据 回滚到 顶部
watch(bookList, () => {
    nextTick(() => {
        bookContent.value.scrollTop = 0;
        // console.log("当前滚动条位置:"+bookContent.value.scrollTop);  
    });
});

</script>

<style lang="less"  scoped>
.lookBooks {
    background-image: url('../assets/images/home_back.jpg');
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;



    .home_search {
        background: rgba(0, 0, 64, 0.2);
        border: 1px rgba(255, 255, 255, 0.8) solid;
        border-radius: 5px;
        padding: 1px;
        width: 700px;
        height: 50px;
        margin: 100px auto 40px auto;

        input {
            float: left;
            background: none;
            border: 0;
            border-right: 1px rgba(255, 255, 255, 0.5) solid;
            width: 560px;
            height: 50px;
            box-sizing: border-box;
            padding: 0 8px;
            margin: 0px 0 0 0;
            font-size: 16px;
            color: #FFFFFF;
        }

        .btn1 {
            float: right;
            background: url(../assets/images/ico_search.png
) no-repeat 30px center;
            border: 0;
            width: 140px;
            height: 50px;
            border-radius: 5px;
            text-align: center;
            box-sizing: border-box;
            padding: 0 0 2px 40px;
            font-size: 16px;
            color: #FFFFFF;
            cursor: pointer;
        }
    }

    .home_nav {
        display: flex;

        .box {
            display: inline-block;
            background: rgba(0, 41, 87, 0.4);
            border: 1px rgba(53, 205, 265, 0.4) solid;
            width: auto;
            padding: 0 12px;
            line-height: 35px;
            white-space: nowrap;
            margin: 0 4px;
            font-size: 15px;
            color: #FFFFFF;
            cursor: pointer;
        }

        .active {
            background: #0280E6;
            border-color: rgba(53, 205, 265, 0);
            color: #FFFFFF;
            font-weight: bold;
        }
    }

    .books {
        width: 90%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px rgba(255, 255, 255, 0.4) solid;
        box-sizing: border-box;
        margin: 10px auto 10px auto;
        padding: 14px;
        max-height: 750px;
        height: 550px;

        .books_content {
            background: rgba(255, 255, 255, 0.9);
            height: 100%;
            overflow: auto;

            .bookList {

                padding-top: 5px;
                display: flex;
                width: 100%;
                flex-wrap: wrap;
                padding-left: 0;

                li {
                    cursor: pointer;
                    transform: scale(0.8);
                    width: 32%;
                    list-style: none;
                    margin: 5px;
                    padding: 0;
                    vertical-align: top;
                    background: #FFFFFF;
                    display: flex;
                    max-height: 250px;

                    .pic {
                        flex: auto;
                        display: block;
                        font-size: 0;
                        text-align: center;
                        overflow: hidden;
                        width: auto;
                      
                        img {
                            margin: 5px;
                            width: 100%;
                            height: 100%;
                           
                        }
                    }

                    .right {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-between;
                        width: 180px;
                        padding: 5px;

                        .tt {
                            width: 100%;
                            overflow: hidden;
                            font-size: 20px;
                            color: #001B77;
                            font-weight: bold;
                            text-align: justify;
                            height: 50px;
                            
                        }

                        .txt1 {
                            width: 100%;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-size: 14px;
                            height: 30px;
                        }

                        .txt2 {
                            margin-right: 5px;
                            width: 100%;
                            line-height: 15px;
                            display: -webkit-box;  
                            -webkit-line-clamp: 5; /* 这里的数字表示显示的行数，你可以根据需要调整 */  
                            -webkit-box-orient: vertical;  
                            overflow: hidden;  
                            text-overflow: ellipsis;  
                            word-wrap: break-word;  
                            word-break: break-all;  
                            white-space: normal;  
                            font-size: 14px;
                            color: #AAAAAA;
                            text-align: justify;
                        }
                    }
                }
            }
        }
    }
}
</style>