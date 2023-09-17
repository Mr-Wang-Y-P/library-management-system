<template>
    <div class="box">
        <div class="head">
            <el-carousel :interval="4000" type="card" height="350px" >
                <el-carousel-item v-for="item in imageData" :key="item" >
                <h3 text="2xl" justify="center"><img class="image" :src="item.url"></h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="body">
            <div class="demo-collapse">
                <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="关于我们" name="1">
                    <div>
                    我们是方便广大用户浏览借阅我们的图书而设计的图书借阅系统。
                    </div>
                    <div>
                    我们的图书库有着丰富的图书资源，方便广大用户前来借阅使用。
                    </div>
                </el-collapse-item>
                <el-collapse-item title="联系我们" name="2">
                    <div>
                    我们的地址在南昌市新建区广兰大道418号，欢迎随时联系我们。
                    </div>
                    <div>
                    我们的邮政编码为330880，联系电话为：859746
                    </div>
                </el-collapse-item>
                <el-collapse-item title="支持我们" name="3">
                    <div>
                    欢迎广大用户向我们提供建议，我们也会尽量去满足客户的需求。
                    </div>
                    <div>
                    广大用户喜欢看什么书籍，可以提出建议，我们将会扩充我们的图书资源来满足客户需求。
                    </div>
                </el-collapse-item>
                <!-- <el-collapse-item title="Controllability" name="4">
                    <div>
                    Decision making: giving advices about operations is acceptable, but do
                    not make decisions for the users;
                    </div>
                    <div>
                    Controlled consequences: users should be granted the freedom to
                    operate, including canceling, aborting or terminating current
                    operation.
                    </div>
                </el-collapse-item> -->
                </el-collapse>
            </div>
        </div>
        <!-- <div class="color"></div> -->
        <div class="bottom">
            <ul>
                <li class="li1">
                    <span>版权申明</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>|</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>东华理工大学</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>|</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>© 东华理工大学所有</span>
                </li>
                <li class="li2">
                    <span>@789456123@gmail.com</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>|</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>电话号码:12354789651</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {ref } from 'vue'
const activeName = ref('1')
const imageData= ref([
  {
    url: '../../src/assets/images/index-1.jpg',
  },
  {
    url: '../../src/assets/images/index-2.jpg',
  },
  {
    url: '../../src/assets/images/index-3.jpg',
  },
  {
    url: '../../src/assets/images/index-4.jpg',
  },
  {
    url: '../../src/assets/images/index-5.jpg',
  },
])
</script>

<style lang="less" scoped>
.box{
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: WhiteSmoke;
    position: relative;
}
.head{
    width: 100%;
    height: 350px;
    margin-top: 20px;
}
.image{
    width: 100%;
    height: 350px;
   
}
.body{
    width: 100%;
    margin-top: 20px;
    zoom: 1.8;
    
}
.color {
    background-color: WhiteSmoke;
    width: 100%;
    height: 20px;
  }

.bottom{
    background: #3a95c3;
    height: 80px;
    width: 100%;
    position: absolute;
    bottom: 0;
}
ul{
    list-style-type: none;
}
.li1{
    display: flex;
    align-items: center;
    justify-content: center;
}
.li2{
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
