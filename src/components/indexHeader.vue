<template>
    <div class="header">
        <div class="logo">
            东华理工大学图书管理系统
        </div>
        <div class="personInformation">
            <div class="avatar">
                <img v-if="form" :src="show.image" alt="">
            </div>
            <!-- <div class="userName">
                用户名测试
             
            </div> -->
            <el-dropdown>
                <span class="el-dropdown-link userName">
                    {{ show.name }}
                    <el-icon class="el-icon--right">
                        <arrow-down class="icon" />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="dialogFormVisible = true">信息修改</el-dropdown-item>
                        <el-dropdown-item @click="exitSign">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
        <!-- 个人修改信息 -->
        <el-dialog class="updatePerson" v-model="dialogFormVisible" title="修改信息" @close="closeDialog">


            <!-- <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload" :on-error="handleAvatarError">
                <div class="avatar">
                    <img v-if="imageUrl" :src="form.imageUrl" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </div>
            </el-upload> -->
            <div class="avatar" @click="openFilePicker">
                <img :src="form.image" alt="">
            </div>
            <el-form :model="form" :rules="rules">

                <el-form-item label="用户昵称修改" :label-width="formLabelWidth">
                    <el-input clearable v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="用户邮箱修改" :label-width="formLabelWidth">
                    <el-input clearable v-model="form.email" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="phone" label="用户电话修改" :label-width="formLabelWidth">
                    <el-input clearable v-model="form.phone" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="password" label="密码修改" :label-width="formLabelWidth">
                    <el-input type="password" show-password v-model="form.password" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDialog">Cancel</el-button>
                    <el-button type="primary" @click="summitPerson">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reactive, ref, onMounted } from 'vue'
import { updateUser } from '../../server/data/getUser'
import { useRouter } from 'vue-router';

const router = useRouter()
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
// const imageUrl = ref(null)
const form = ref({})
const file = ref(null)
const show = ref({})

// import { Plus } from '@element-plus/icons-vue'


const openFilePicker = () => {

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
        // console.log(imageUrl.value)
        reader.onload = function (event) {
            // const blob = b64toBlob(event.target.result.split(',')[1]);
            // 创建图片的URL  
            // const url = URL.createObjectURL(blob);
            // form.value.image = url;

            form.value.image = event.target.result
            // let str = base64toFile(event.target.result,'file')
            // let formData = new FormData();
            // formData.append("file", str);
            // console.log(formData);
            // console.log(str);
        };
        reader.readAsDataURL(file.value);
    };
}
// 将Base64格式的图片转换为Blob对象  
// const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
//     contentType = contentType || '';
//     sliceSize = sliceSize || 512;

//     const byteCharacters = atob(b64Data);
//     const byteArrays = [];

//     for (let i = 0; i < byteCharacters.length; i += sliceSize) {
//         const slice = byteCharacters.slice(i, i + sliceSize);
//         const byteNumbers = new Array(slice.length);
//         for (let j = 0; j < slice.length; j++) {
//             byteNumbers[j] = slice.charCodeAt(j);
//         }
//         const byteArray = new Uint8Array(byteNumbers);
//         byteArrays.push(byteArray);
//     }

//     const blob = new Blob(byteArrays, { type: contentType });
//     return blob;
// }

// const base64toFile = (data, fileName)=> {
//           const dataArr = data.split(",");
//           const byteString = atob(dataArr[1]);
//           const options = {
//             type: "image/jpeg",
//             endings: "native"
//           };
//           const u8Arr = new Uint8Array(byteString.length);
//           for (let i = 0; i < byteString.length; i++) {
//             u8Arr[i] = byteString.charCodeAt(i);
//           }
//           return new File([u8Arr], fileName + ".jpg", options);//返回文件流
//     }
// 表单校验规则
const rules = reactive({
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, max: 20, message: '密码长度应为8到20个字符', trigger: 'blur' },
        {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]+$/,
            message: '密码必须包含至少一个大写字母、小写字母、数字和特殊字符',
            trigger: 'blur'
        }
    ]
})
const closeDialog = () => {
    dialogFormVisible.value = false
    console.log(dialogFormVisible.value);
    form.value = JSON.parse(JSON.stringify(show.value))
}
const summitPerson = async () => {
    // console.log(form.value.image);
    // console.log(form);
    // if (!form.value) return
    if (!form.value.phone || !form.value.email || !form.value.name || !form.value.password) {
        ElMessage.error('数据不能为空')
        return
    }
    if (!(/^1[3-9]\d{9}$/).test(form.value.phone)) {
        ElMessage.error('请输入有效的手机号')
        return
    }
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,20}$/).test(form.value.password)) {
        ElMessage.error('请输入有效的密码，密码长度应为8到20个字符，且密码必须包含至少一个大写字母、小写字母、数字和特殊字符')
        return
    }
    // console.log(form.value.image);
    console.log(form.value);
    const res = await updateUser(form.value)
    if (res.data === 'success') {
        sessionStorage.setItem('userInfo', JSON.stringify(form.value))
        // 更新信息
        if (show.value.password != form.value.password) {
            router.replace('/sign');
            ElMessage({
                showClose: true,
                message: '密码已修改,请重新登录！',
                type: 'success',
            })
            return
        }
        show.value = JSON.parse(JSON.stringify(form.value))
        // console.log(show.value)
        ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success',
        })
        dialogFormVisible.value = false
        router.go(0)
    }
}

const exitSign = () => {
    sessionStorage.removeItem('userInfo');
    router.replace('/sign');
    ElMessage({
        showClose: true,
        message: '退出成功',
        type: 'success',
    })
}
onMounted(() => {
    form.value = JSON.parse(sessionStorage.getItem('userInfo'))
    console.log(form.value);
    show.value = JSON.parse(sessionStorage.getItem('userInfo'))
})
</script>

<style lang="less"  scoped>
.header {
    background: rgb(58, 149, 195);
    display: flex;
    justify-content: space-between;
    color: black;
    height: 80px;
    align-items: center;
    width: 100%;

    .logo {
        font-weight: 600;
        font-size: 24px;
        margin-left: 10px;
    }

    .personInformation {
        display: flex;
        align-items: center;
        font-size: 20px;
        margin-right: 10px;

        >div {
            margin: 10px;
        }

        .avatar {
            width: 70px;
            height: 70px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
            }
        }

        .userName {
            font-size: 20px;
            font-weight: 400;
            display: flex;
            color: black;
        }
    }
}



.updatePerson {
    .avatar {
        width: 100px;
        height: 100px;
        position: relative;
        left: 50%;
        transform: translate(-50%);
        margin-bottom: 20px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
    }
}

:deep(.el-upload) {
    position: relative;
    left: 50%;
    transform: translate(-50%);
}

:deep(.el-dialog) {
    max-width: 580px;
}

:deep(.el-dropdown-link:focus) {
    outline: none;
}

:deep(.el-button--text) {
    margin-right: 15px;
}

:deep(.el-select) {
    width: 300px;
}

:deep(.el-input) {
    width: 300px;
}

:deep(.el-input__wrapper) {
    padding-left: 0px;
    padding-right: 0;
}

:deep(.el-input__inner) {
    max-width: 300px;
}

:deep(.dialog-footer button:first-child) {
    margin-right: 10px;
}

:deep(.el-input .el-input__icon) {
    margin-right: 8px;
}

:deep(.el-form-item__label) {
    justify-content: center;
}

:deep(.el-form) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: column;
}
</style>

