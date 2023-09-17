<template>
    <div class="Content">
        <h1>
            书籍查询及修改
        </h1>
        <div class="search">
            <el-input
            v-model="searchText"
            placeholder="关键词查找"
          >
            <template #append>
              <el-button :icon="Search"  @click="searchBook(searchText)"/>
            </template>
          </el-input>
        </div>
        <div class="booksTable">
            <el-table :data="tableData" style="width: 100%;height:100%">
                <el-table-column align="center" label="序号" type="index" width="60"/>
                <el-table-column  align="center" label="书籍编号" prop="nameid" width="120"/>
                <el-table-column  align="center" label="书名" prop="name" />
                <el-table-column  align="center" label="作者" prop="author" />
                <el-table-column  align="center" label="分类" prop="sort" />
                <el-table-column show-overflow-tooltip  align="center" label="描述" prop="describe" />
                <el-table-column  align="center" label="出版社" prop="publisher" />
                <el-table-column  align="center" label="数量" prop="stock" />
                <el-table-column align="center" label="操作">
                  <template #default="scope">
                    <el-button size="large" @click="$router.push(`/searchBooks/${scope.row.nameid}`)">
                        Edit
                        </el-button>
                    <el-button
                      size="large"
                      type="danger"
                      @click="handleDelete(scope.row.nameid)"
                      >Delete</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import {ref,onMounted} from 'vue'
import {getBooksList, getSelectedBook,deletedBook } from '../utils/getbooks'
const searchText = ref(null)
const tableData = ref([])
const searchBook=async(searchText)=>{
    if (searchText.length === 0) {
        const res = await getBooksList()
        tableData.value = res.data
    }
    else {
        const res = await getSelectedBook(searchText)
        tableData.value = res.data
    }
}
onMounted(async()=>{
    const res = await getBooksList()
    console.log(res.data);
    tableData.value = res.data
})

const handleDelete =async (nameid) => {
  // console.log(nameid)
  await deletedBook(nameid)
  const res = await getBooksList()
  tableData.value = res.data
}

</script>

<style lang="less" scoped>
.Content {
    background-color: WhiteSmoke;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        text-align: center;
    }
    .search{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 400px;
        height: 60px;
        .el-input-group{
            height: 100%;
          
        }
       
    }
    :deep(.el-input__inner){
        height: 100%;
        font-size: 20px;
    }
    .booksTable{
        width: 96%;
        margin:20px 2%;
        height: 735px;
        background: red;
    }
}
:deep(.el-popper.is-dark){
    max-width: 50%;
}
</style>