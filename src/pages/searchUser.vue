<template>
    <div class="Content">
        <h1>
            用户查询及修改
        </h1>
        <div class="search">
            <el-input v-model="searchText" placeholder="关键词查找">
                <template #append>
                    <el-button :icon="Search" @click="searchBook(searchText)" />
                </template>
            </el-input>
        </div>
        <div class="booksTable">
            <el-table :data="tableData" style="width: 100%;height:100%">
                <el-table-column align="center" label="序号" type="index" width="60" />
                <el-table-column align="center" label="用户编号" prop="userId" width="120" />
                <el-table-column align="center" label="用户名" prop="name" />
                <el-table-column align="center" label="电话号码" prop="phone" />
                <el-table-column align="center" label="邮箱" prop="email" />
                <el-table-column align="center" label="密码" prop="password" />
                <el-table-column align="center" label="操作">
                    <template #default="scope">
                        <el-button size="large" @click="$router.push(`/searchUser/${scope.row.userId}`)">
                            Edit
                        </el-button>
                        <el-button size="large" type="danger" @click="handleDelete(scope.row.userId)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { getUserList, getUserInfo, deletedUser } from '@/utils/getUser'
const searchText = ref(null)
const tableData = ref([])
const searchBook = async (searchText) => {
    if (searchText.length === 0) {
        const res = await getUserList()
        tableData.value = res.data
    }
    else {
        const res = await getUserInfo(searchText)
        tableData.value = res.data
    }
}
onMounted(async () => {
    const res = await getUserList()
    console.log(res.data);
    tableData.value = res.data
})

const handleDelete = async (userId) => {
    // console.log(nameid)
    await deletedUser(userId)
    const res = await getUserList()
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

    .search {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 400px;
        height: 60px;

        .el-input-group {
            height: 100%;

        }

    }

    :deep(.el-input__inner) {
        height: 100%;
        font-size: 20px;
    }

    .booksTable {
        width: 96%;
        margin: 20px 2%;
        height: 735px;
        background: red;
    }
}

:deep(.el-popper.is-dark) {
    max-width: 50%;
}
</style>