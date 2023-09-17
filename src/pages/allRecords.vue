<template>
    <div class="borrowTable">
        <div class="search">
            <el-input v-model="searchText" placeholder="关键词查找">
                <template #append>
                    <el-button :icon="Search" @click="searchBook(searchText)" />
                </template>
            </el-input>
            <el-button type="primary" @click="addRecords">添加</el-button>
        </div>
        <div class="box">
            <el-table class="table" :data="tableData" height="95%" style="width: 100%">
                <el-table-column align="center" type="index" label="借书记录序号" min-width="80" />
                <el-table-column align="center" prop="nameid" label="书编号" min-width="80" />
                <el-table-column align="center" prop="bookname" label="书名" min-width="120" />
                <el-table-column align="center" prop="userId" label="用户编号" min-width="80" />
                <el-table-column align="center" prop="borrowers" label="借书人" min-width="80" />
                <el-table-column align="center" prop="borrowtime" label="借书时间" min-width="170" />
                <el-table-column align="center" prop="reallyrepaytime" label="还书时间" min-width="170" />
                <el-table-column align="center" prop="repaytime" label="最晚还书时间" min-width="170" />
                <el-table-column align="center" prop="passCount" label="是否逾期" />
                <el-table-column align="center" label="操作" min-width="200">
                    <template #default="scope">
                        <el-button size="large" @click="handleEdit(scope.row)">
                            Edit
                        </el-button>
                        <el-button size="large" type="danger" @click="handleDelete(scope.row.borrowId)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="addBox">
            <el-drawer ref="drawerRef" v-model="dialog" :title="drawerTitle" direction="rtl" class="demo-drawer"
                :before-close="handleClose">
                <div class="demo-drawer__content">
                    <el-form :model="form">
                        <el-form-item label="用户编号" :label-width="formLabelWidth">
                            <el-input v-model="form.userId" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="书籍编号" :label-width="formLabelWidth">
                            <el-input v-model="form.nameid" autocomplete="off" />
                        </el-form-item>

                        <el-form-item label="借书时间" :label-width="formLabelWidth">
                            <!-- <el-input v-model="form.borrowtime" autocomplete="off" />
                     -->
                            <el-date-picker v-model="form.borrowtime" type="datetime" placeholder="Pick a Date"
                                format="YYYY/MM/DD HH:mm:ss" />
                        </el-form-item>
                        <el-form-item label="还书时间" :label-width="formLabelWidth">
                            <!-- <el-input v-model="form.reallyrepaytime" autocomplete="off" /> -->
                            <el-date-picker v-model="form.reallyrepaytime" type="datetime" placeholder="Pick a Date"
                                format="YYYY/MM/DD HH:mm:ss" />
                        </el-form-item>
                        <!-- <el-form-item label="最晚还书时间" :label-width="formLabelWidth">
                    <el-input v-model="form.repaytime" autocomplete="off" />
                  </el-form-item> -->
                    </el-form>
                    <div class="demo-drawer__footer" style="margin-left:30px ;margin-top:50px">
                        <el-button @click="cancelForm">Cancel</el-button>
                        <el-button type="primary" @click="onClick">Submit</el-button>
                    </div>
                </div>
            </el-drawer>
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, reactive,watch } from 'vue'
import { getSelectedBorrowBook, getBorrowList, addBorrow, updateBorrow,deletedBorrow } from '../utils/getBorrow'
import { getUser } from '../utils/getUser'
import { getBook } from '../utils/getbooks'
import { formatDate, deleteDays, addDays } from '../assets/js/addTime'
import { ElDrawer, ElMessage, ElMessageBox } from 'element-plus'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890', 8)
const dialog = ref(false)
const tableData = ref([])
const searchText = ref('')
const formLabelWidth = '100px'
const drawerRef = ref(null)
const isUpdate = ref(false)
const updateForm = ref([])
const drawerTitle = ref('添加借阅记录')
const form = reactive({
    userId: '',
    nameid: '',
    borrowtime: '',
    reallyrepaytime: '',
})
watch(isUpdate,()=>{
    if(!isUpdate.value){
        drawerTitle.value = '添加借阅记录'
    }
    else{
        drawerTitle.value = '编辑借阅记录'
    }
})
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
const cancelForm = () => {
    dialog.value = false
}
const onClick = async () => {

    // console.log(form);
    const user = (await getUser(form.userId)).data
    const book = (await getBook(form.nameid)).data
    if (form.borrowtime.length === 0 || form.userId.length === 0 || form.nameid.length === 0) {
        ElMessage.error('除了还书时间，其他都不能为空')
        return
    }
    // console.log(form.reallyrepaytime);
    if(!isUpdate.value){
        if (form.reallyrepaytime) {
        form.reallyrepaytime = formatDate(form.reallyrepaytime)
    }
    }
  
    if (user.length === 0) {
        ElMessage.error(`编号为${form.userId}的用户不存在，请重新输入`)
        if (!isUpdate.value) {
            form.userId = ''
        }
        return
    }
    if (book.length === 0) {
        ElMessage.error(`编号为${form.nameid}的书籍不存在，请重新输入`)
        form.nameid = ''
        return
    }

    // console.log(book,user);
    form.bookname = book[0].name
    form.borrowers = user[0].name
    // 添加
    if (!isUpdate.value) {
        form.repaytime = formatDate(addDays(form.borrowtime, 30))
        form.borrowtime = formatDate(form.borrowtime)
        form.borrowId = Number(nanoid());
        await addBorrow(form)
    }



    // 编辑
    else {
        if(updateForm.value.borrowtime !== form.borrowtime){
            form.repaytime = formatDate(addDays(form.borrowtime, 30))
            form.borrowtime = formatDate(form.borrowtime)
        }
        if(updateForm.value.reallyrepaytime !== form.reallyrepaytime){
            form.reallyrepaytime = formatDate(form.reallyrepaytime)
        }   
        console.log(form);
        await updateBorrow(form)
       
    }
    console.log(form)

    let res = await getBorrowList()
    tableData.value = res.data
    addBorrowInfo()
  
    dialog.value = false
}
const handleClose = (done) => {
    ElMessageBox.confirm('Are you sure you want to close this?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
       
}
const addRecords = () => {
   
    isUpdate.value = false
    form.userId = ''
    form.nameid =''
    form.borrowtime = ''
    form.reallyrepaytime = ''
    form.bookname = ''
    form.repaytime = ''
    form.borrowers = ''
    form.borrowId = null
    dialog.value = true
}
const handleEdit = (borrow) => {
    isUpdate.value = true
    console.log(borrow);
    updateForm.value = JSON.parse(JSON.stringify(borrow))
    // console.log(updateForm.value);
    form.userId = borrow.userId
    form.nameid = borrow.nameid
    form.borrowtime = borrow.borrowtime
    form.reallyrepaytime = borrow.reallyrepaytime
    form.bookname = borrow.bookname
    form.repaytime = borrow.repaytime
    form.borrowers = borrow.borrowers
    form.borrowId = borrow.borrowId
    console.log(form);
    dialog.value = true
}
const handleDelete =async (borrowId) => {
    console.log(borrowId);
    await deletedBorrow(borrowId)
    let res = await getBorrowList()
    tableData.value = res.data
    addBorrowInfo()
}
onMounted(async () => {
    // console.log(JSON.parse(sessionStorage.getItem('userInfo')).userId);
    let res = await getBorrowList()
    tableData.value = res.data
    addBorrowInfo()
    // console.log(res.data, tableData.value);
})
const addBorrowInfo = () => {
    for (let i = 0; i < tableData.value.length; i++) {
        // if(deleteDays(formatDate(new Date()),tableData.value[i].reallyrepaytime) < 0){
        //     tableData.value[i].passCount = '已逾期' + deleteDays(formatDate(new Date()),tableData.value[i].reallyrepaytime) + '天'
        // }
        // tableData.value[i].passCount
        if (tableData.value[i].reallyrepaytime.length !== 0) {
            if (deleteDays(tableData.value[i].reallyrepaytime, tableData.value[i].repaytime) >= 0) {
                tableData.value[i].passCount = '还书正常'
            }
            else {
                tableData.value[i].passCount = '之前已逾期' + deleteDays(tableData.value[i].repaytime, tableData.value[i].reallyrepaytime) + '天'
            }
        }
        else {
            // formatDate(new Date())
            if (deleteDays(formatDate(new Date()), tableData.value[i].repaytime) >= 0) {
                tableData.value[i].passCount = '暂未还书，还剩' + deleteDays(formatDate(new Date()), tableData.value[i].repaytime) + '天'
            }
            else {
                tableData.value[i].passCount = '暂未还书,已逾期' + deleteDays(tableData.value[i].repaytime, formatDate(new Date())) + '天'
            }
        }
    }
}
</script>

<style lang="less" scoped>
.borrowTable {
    width: 100%;
    height: 100%;
    background-color: WhiteSmoke;
    position: relative;

    .search {
        position: absolute;
        display: flex;
        justify-content: space-between;
        top: 20px;
        left: 5%;
        width: 90%;

        >div {
            width: 400px;
        }
    }

    .box {
        margin: 5% 2%;
        width: 96%;
        height: 820px;
        box-shadow:
            0 2px 4px rgba(0, 0, 0, 0.12),
            0 0 6px rgba(0, 0, 0, 0.04);
        background-color: white;
        border-radius: 30px;
        display: flex;
        align-items: center;
    }
}

:deep(.el-form-item__label) {
    width: 100px;
}
</style>