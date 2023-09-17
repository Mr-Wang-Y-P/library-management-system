<template>
    <div class="borrowTable">
        <div class="search">
            <el-input v-model="searchText" placeholder="关键词查找">
                <template #append>
                    <el-button :icon="Search" @click="searchBook(searchText)" />
                </template>
            </el-input>
        </div>
       <div class="box">
                <el-table  class="table" :data="tableData" height="95%" style="width: 100%">
                    <el-table-column align="center" type="index" label="借书记录序号" min-width="80"/>
                    <el-table-column align="center" prop="nameid" label="书编号" min-width="80"/>
                    <el-table-column align="center"  prop="bookname" label="书名" min-width="120" />
                    <el-table-column align="center" prop="borrowtime" label="借书时间"  min-width="180"/>
                    <el-table-column align="center" prop="reallyrepaytime" label="还书时间" min-width="180" />
                    <el-table-column align="center" prop="repaytime" label="最晚还书时间" min-width="180" />
                    <el-table-column align="center" prop="passCount" label="是否逾期" min-width="200" />
                  </el-table>
       </div>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {getBorrowBook,getBorrowList,getSelectedBorrowBook} from '@/utils/getBorrow'
import {formatDate,deleteDays} from '@/assets/js/addTime'
import { Search } from '@element-plus/icons-vue'
const tableData = ref([])
const searchText =ref('')
const searchBook = async (searchText) => {
    if (searchText.length === 0) {
        const res = await getBorrowList()
        tableData.value = res.data
        addBorrowInfo()
    }
    else {
        const res = await getSelectedBorrowBook(searchText)
        tableData.value = res.data
        addBorrowInfo()
    }
    // addBorrowInfo()
}
const addBorrowInfo = ()=>{
    for(let i=0;i<tableData.value.length;i++){
        // if(deleteDays(formatDate(new Date()),tableData.value[i].reallyrepaytime) < 0){
        //     tableData.value[i].passCount = '已逾期' + deleteDays(formatDate(new Date()),tableData.value[i].reallyrepaytime) + '天'
        // }
        // tableData.value[i].passCount
        if(tableData.value[i].reallyrepaytime.length !==0){
            if(deleteDays(tableData.value[i].reallyrepaytime,tableData.value[i].repaytime) >= 0){
                tableData.value[i].passCount = '还书正常'
            }
            else{
                tableData.value[i].passCount = '之前已逾期' +deleteDays(tableData.value[i].repaytime,tableData.value[i].reallyrepaytime) + '天'
            }
        }
        else{
            // formatDate(new Date())
            if(deleteDays(formatDate(new Date()),tableData.value[i].repaytime) >= 0){
                tableData.value[i].passCount = '暂未还书，还剩'+deleteDays(formatDate(new Date()),tableData.value[i].repaytime) + '天'
            }
            else{
                tableData.value[i].passCount = '暂未还书,已逾期' +deleteDays(tableData.value[i].repaytime,formatDate(new Date())) + '天'
            }
        }
    }
}
onMounted(async()=>{
    // console.log(JSON.parse(sessionStorage.getItem('userInfo')).userId);
    let res = await getBorrowBook(JSON.parse(sessionStorage.getItem('userInfo')).userId)
    tableData.value = res.data
    addBorrowInfo()
    // console.log(res.data,tableData.value);
})
</script>

<style lang="less" scoped>
.borrowTable{
    width: 100%;
    height: 100%;
    background-color: WhiteSmoke;  
    position:relative; 
    .search {
        position: absolute;
        display: flex;
        justify-content: space-between;
        top: 20px;
        left: 6%;
        width: 90%;

        >div {
            width: 400px;
        }
    }
    .box {
        margin: 5%;
        width: 90%;
        height: 800px;
        box-shadow:
          0 2px 4px rgba(0, 0, 0, 0.12),
          0 0 6px rgba(0, 0, 0, 0.04);
        background-color: white;
        border-radius: 30px;
        display: flex;
        align-items: center;
      }
}

</style>