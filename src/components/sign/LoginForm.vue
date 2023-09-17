<template>
  <ElForm ref="loginForm" :rules="rules" class="login-form" :model="loginData" status-icon>
    <h1>登录</h1>
    <ElFormItem prop="phone">
      <ElInput
        placeholder="请输入账号"
        :prefix-icon="User"
        clearable
        v-model="loginData.phone"
      ></ElInput>
    </ElFormItem>
    <ElFormItem prop="password">
      <ElInput
        placeholder="请输入密码"
        :prefix-icon="Lock"
        clearable
        show-password
        v-model="loginData.password"
      ></ElInput>
    </ElFormItem>
    <el-form-item prop="type">
      <el-radio-group v-model="loginData.type">
        <el-radio label="manage" />
        <el-radio label="read" />
      </el-radio-group>
    </el-form-item>
    <ElFormItem>
      <ElButton type="primary" @click="submitForm(loginForm)">登录</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { getUser } from "../../utils/getUlogin"
import { getUserInfo } from "../../utils/getUser"
import { getManage } from "../../utils/getMlogin"
import { getManageInfo } from "../../utils/getManage"
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

const router = useRouter()

const loginForm = ref(null)
const loginData = reactive({
  phone: '',
  password: '',
  type: 'read'
})
/**登录功能 */
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        if (loginData.type == "read") {
          const res = await getUser(loginData)
          if (res.status == 200) {
              const res1 = await getUserInfo(loginData.phone)
              console.log(res1.data[0]);
              sessionStorage.setItem('userInfo', JSON.stringify(res1.data[0]))
              resetForm(loginForm.value)
              ElMessage.success('登录成功!')
              router.replace('/')
          } else {
            ElMessage.error('登陆失败')
          }
        } else {
          const res = await getManage(loginData)
          if (res.status == 200) {
              const res1 =  await getManageInfo(loginData.phone)
              console.log(res1.data[0]);
              sessionStorage.setItem('userInfo', JSON.stringify(res1.data[0]))
              resetForm(loginForm.value)
              ElMessage.success('登陆成功!')
              router.replace('/')
          } else {
            ElMessage.error('登陆失败')
          }
        }
      } catch (error) {
        ElMessage.error(error.response.data)
      }
      console.log('submit!')
    } else {
      ElMessage.error('请填写正确信息')
      console.log('error submit!', fields)
    }
  })
}


/**清空表单 */
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

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
  ],
  type: [{ required: true, message: '请选择用户类型', trigger: 'change' }]
})
</script>

<style lang="less" scoped>
.login-form {
  grid-column: 1;
  grid-row: 1;
  padding: 1% 25%;
  pointer-events: all;
  visibility: visible;
  // opacity: 1;
  transition-delay: 5s;
}
.login-form.sign-up-model {
  visibility: hidden;
  // opacity: 0;
  transition-delay: 5s;
  pointer-events: none;
}

:deep(.el-input__wrapper) {
  cursor: pointer;
}
</style>
