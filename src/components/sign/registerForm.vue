<template>
    <ElForm ref="registerForm" :model="registerData" :rules="rules" class="register-form" status-icon>
        <h1>注册</h1>
        <ElFormItem prop="name">
            <ElInput placeholder="请输入昵称" :prefix-icon="User" clearable v-model="registerData.name"></ElInput>
        </ElFormItem>
        <ElFormItem prop="phone">
            <ElInput placeholder="请输入账号" :prefix-icon="User" clearable v-model="registerData.phone"></ElInput>
        </ElFormItem>
        <ElFormItem prop="password">
            <ElInput placeholder="请输入密码" :prefix-icon="Lock" clearable show-password v-model="registerData.password"></ElInput>
        </ElFormItem>
        <ElFormItem prop="email">
            <ElInput placeholder="请输入邮箱" :prefix-icon="Message" clearable v-model="registerData.email"></ElInput>
        </ElFormItem>
        <ElFormItem>
            <ElButton type="primary" @click="submitForm(registerForm)">注册</ElButton>
        </ElFormItem>
    </ElForm>
</template>

<script setup>
import { User, Lock, Message } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { addUser } from '@/utils/getUser'
import { customAlphabet } from 'nanoid'
import { useFormStore } from '@/stores/changeForm'
import { ElMessage } from 'element-plus'

const nanoid = customAlphabet('1234567890', 10)
const useForm = useFormStore()

const registerForm = ref(null)
const registerData = reactive({
    name: "",
    phone: "",
    password: "",
    email: "",
    userId: 0
})
/**注册功能 */
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        registerData.userId = Number(nanoid());
        const res = await addUser(registerData);
        if (res.status === 200) {
            resetForm(registerForm.value)
            useForm.changeForm()
            ElMessage.success('注册成功!')
        } else {
            ElMessage.success('注册手机号已存在')
        }
        console.log(registerData);
        console.log('submit!')
      } catch (error) {
        ElMessage.error(error.response.data)
      }
    } else {
      console.log('error submit!', fields)
      ElMessage.error('请填写正确信息')
    }
  })
}

/**清空表单 */
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
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
.register-form {
    grid-column: 1;
    grid-row: 1;
    padding: 1% 25%;
    visibility: hidden;
    // opacity: 0;
    transition-delay: 5s;
    pointer-events: none;
}
.register-form.sign-up-model {
    visibility: visible;
    // opacity: 1;
    transition-delay: 5s;
    pointer-events: all;
}

:deep(.el-input__wrapper) {
  cursor: pointer;
}
</style>