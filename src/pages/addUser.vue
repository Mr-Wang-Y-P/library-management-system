<template>
    <div class="Content">
        <h1>
            添加用户
        </h1>
        <div class="addBook">
            <el-form :rules="rules" ref="ruleFormRef" :model="ruleForm" status-icon  label-width="120px"
                class="demo-ruleForm">
                <!-- <div ref="onlineImg" v-show="imgChoice === 'true' || imgChoice === 'null'">
                    <el-form-item label="头像" prop="image">
                        <el-input v-model="ruleForm.image" type="text" autocomplete="off" />
                    </el-form-item>
                </div>
                <div ref="localImg" v-show="imgChoice === 'false' || imgChoice === 'null'">
                    <el-form-item label="本地图片" prop="image">
                        <el-button type="primary" @click="uploadImg">上传图片</el-button>
                        <div class="imgBox" v-show="showImg">
                            <img :src="ruleForm.image" alt="">
                        </div>
                    </el-form-item>
                </div> -->

                <el-form-item label="昵称" prop="name">
                    <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="ruleForm.phone" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email" type="text" autocomplete="off" />
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
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { customAlphabet } from 'nanoid'
import { addUser } from '@/utils/getUser'
// import { useFormStore } from '@/stores/changeForm'
// const imgChoice = ref('null')
const ruleFormRef = ref(null)
// const onlineImg = ref(null)
// const localImg = ref(null)
// const showImg = ref(false)
// const file = ref(null)
const nanoid = customAlphabet('1234567890', 10)
// const useForm = useFormStore()

onMounted(async () => {
    // await nextTick(() => {
    //     const onlineFocus = onlineImg.value.children[0].children[1].children[0].children[0].children[0]
    //     onlineFocus.addEventListener('focus', () => {
    //         // console.log('1111111');
    //         // imgChoice.value = 'true'; // 当onlineImg元素获取焦点时，将imgChoice设置为true  
    //         // console.log(imgChoice.value)
    //     });
    //     // console.log(localImg.value.children[0].children[0]);
    //     const localImgLabel = localImg.value.children[0].children[0]
    //     localImgLabel.addEventListener('click', () => {
    //         // imgChoice.value = 'false'; // 当localImg元素获取焦点时，将imgChoice设置为true  
    //         // console.log(imgChoice.value)
    //     });
    // })
});

// const uploadImg = () => {
//     imgChoice.value = 'false'
//     // 只是单纯的 选取图片然后渲染 并不会 上传
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'image/*'; // 只接受图片文件  
//     input.click();
//     input.onchange = function (event) {
//         file.value = event.target.files[0];
//         if (file.value.size / 1024 / 1024 > 2) {
//             ElMessage.error('Avatar picture size can not exceed 2MB!');
//             return false;
//         }
//         console.log(file.value);
//         const reader = new FileReader();
//         reader.onload = function (event) {
//             ruleForm.image = event.target.result
//             showImg.value =true
//         };
//         reader.readAsDataURL(file.value);
//     };
// }
const ruleForm = reactive({
    image:"",
    name: '',
    phone: '',
    password:'',
    email:'',
    // stock:1
})

const resetForm = (formEl) => {
    // showImg.value =false
    // imgChoice.value = 'null'
    // console.log(imgChoice.value)
    // console.log(ruleForm);
    if (!formEl) return
    formEl.resetFields()
    // console.log(ruleForm);
}
// const registerForm = ref(null)
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        let userValue = []
        ruleForm.userId = Number(nanoid());
        console.log(ruleForm.userId );
        userValue = JSON.parse(JSON.stringify(ruleForm))
        console.log(userValue);
        const res = await addUser(userValue);
        if (res.status === 200) {
            // resetForm(registerForm.value)
            // useForm.changeForm()
            ElMessage.success('注册成功!')
            // showImg.value =false
            // imgChoice.value = 'null'
        } else {
            ElMessage.success('注册手机号已存在')
        }
        // console.log(ruleForm);
        console.log('submit!')
        formEl.resetFields()
      } catch (error) {
        ElMessage.error(error.response.data)
      }
    } else {
      console.log('error submit!', fields)
      ElMessage.error('请填写正确信息')
    }
  })
}
// 表单验证规则
const rules = reactive({
    name: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        { min: 2, max: 20, message: '昵称长度应为2到20个字符', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, max: 20, message: '密码长度应为8到20个字符', trigger: 'blur' },
        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]+$/, message: '密码必须包含至少一个大写字母、小写字母、数字和特殊字符', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
    ]
})


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
        margin-top: 10%;
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