<template>
    <div class="Content">
        <h1>
            录入新书
        </h1>
        <div class="addBook">
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon  label-width="120px"
                class="demo-ruleForm">
                <div ref="onlineImg" v-show="imgChoice === 'true' || imgChoice === 'null'">
                    <el-form-item label="网络图片" prop="url">
                        <el-input v-model="ruleForm.url" type="text" autocomplete="off" />
                    </el-form-item>
                </div>
                <div ref="localImg" v-show="imgChoice === 'false' || imgChoice === 'null'">
                    <el-form-item label="本地图片" prop="url">
                        <el-button type="primary" @click="uploadImg">上传图片</el-button>
                        <div class="imgBox" v-show="showImg">
                            <img :src="ruleForm.url" alt="">
                        </div>
                    </el-form-item>
                </div>

                <el-form-item label="书名" prop="name">
                    <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input v-model="ruleForm.author" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="类别" prop="sort">
                    <el-input v-model="ruleForm.sort" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="描述" prop="describe">
                    <el-input v-model="ruleForm.describe" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="出版社" prop="publisher">
                    <el-input v-model="ruleForm.publisher" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="数量" prop="stock">
                    <el-input v-model="ruleForm.stock" min="1" type="number" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
                    <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { customAlphabet } from 'nanoid'
import { addBook } from '@/utils/getbooks'
const imgChoice = ref('null')
const ruleFormRef = ref(null)
const onlineImg = ref(null)
const localImg = ref(null)
const showImg = ref(false)
const file = ref(null)
const nanoid = customAlphabet('1234567890', 6)
// const imgUrl =ref(null)
// const localImgChild = ref(null)
onMounted(async () => {
    // console.log(onlineImg.value);
    await nextTick(() => {
        // console.log(onlineImg.value.children[0].children[1].children[0].children[0].children[0]);
        const onlineFocus = onlineImg.value.children[0].children[1].children[0].children[0].children[0]
        onlineFocus.addEventListener('focus', () => {
            // console.log('1111111');
            imgChoice.value = 'true'; // 当onlineImg元素获取焦点时，将imgChoice设置为true  
            // console.log(imgChoice.value)
        });
        // console.log(localImg.value.children[0].children[0]);
        const localImgLabel = localImg.value.children[0].children[0]
        localImgLabel.addEventListener('click', () => {
            imgChoice.value = 'false'; // 当localImg元素获取焦点时，将imgChoice设置为true  
            // console.log(imgChoice.value)
        });
    })
});

const uploadImg = () => {
    imgChoice.value = 'false'
    // 只是单纯的 选取图片然后渲染 并不会 上传
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // 只接受图片文件  
    input.click();
    input.onchange = function (event) {
        file.value = event.target.files[0];
        if (file.value.size / 1024 / 1024 > 2) {
            ElMessage.error('Avatar picture size can not exceed 2MB!');
            return false;
        }
        console.log(file.value);
        const reader = new FileReader();
        reader.onload = function (event) {
            ruleForm.url = event.target.result
            showImg.value =true
        };
        reader.readAsDataURL(file.value);
    };
}
const ruleForm = reactive({
    url: '',
    name: '',
    author: '',
    sort:'',
    describe:'',
    publisher:'',
    stock:1
})

const submitForm =async (formEl) => {
    if (!formEl) return
    formEl.validate(async(valid) => {
        if (valid) {
            console.log('submit!')
            const bookValue = JSON.parse(JSON.stringify(ruleForm)) 
            // console.log(bookValue);
            bookValue.nameid = Number(nanoid());
            // console.log(bookValue);
            const res = await addBook(bookValue)
            console.log(res.status)
            showImg.value =false
            imgChoice.value = 'null'
            formEl.resetFields()
           
            // console.log(ruleForm);
           
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl) => {
    showImg.value =false
    imgChoice.value = 'null'
    // console.log(imgChoice.value)
    // console.log(ruleForm);
    if (!formEl) return
    formEl.resetFields()
    // console.log(ruleForm);
}
</script>

<style lang="less" scoped>
.Content {
    background-color: WhiteSmoke;
    width: 100%;
    height: 100%;

    h1 {
        text-align: center;
    }

    .addBook {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 50px;
    }
}

:deep(.el-form-item) {
    width: 700px;
    font-size: 24px;
    height: 70px;
    align-items: center;

    .imgBox {
        margin-left: 30px;
        width: 100px;
        height: 100px;
        background: white;
        img{
            width: 100%;
            height: 100%;
        }
    }
}

:deep(.el-form-item__label) {
    align-items: center;
    font-size: 24px;
}

:deep(.el-input__inner) {
    height: 60px;
    font-size: 20px;
}
</style>