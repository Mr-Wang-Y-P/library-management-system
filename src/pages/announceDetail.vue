<template>
  <div class="common-content wrap-1280">
      <div class="contents tree-bg common__detail-content">
          <div class="common__detail-head JS-detail-head">
                  <h2 class="title">
                      {{ announceList.title }}
                  </h2>
                  <p>时间：<span>{{ announceList.time }}</span></p>
                  <p v-if="userType == 'manage'" ><a @click="dialog = true" href="#">编辑</a></p>
              </div>
          <div class="common__detail-rich" v-html="announceList.content"></div>
          <p style="text-align: right;padding-right: 40px;">{{ announceList.deployer }}</p>
          <p style="text-align: right;padding-right: 40px;">{{ dateFormat(announceList.time) }}</p>
      </div>
  </div>

  <el-drawer
  ref="drawerRef"
  v-model="dialog"
  title="新增公告"
  :before-close="handleClose"
  direction="ltr"
  class="demo-drawer"
  size="40%"
>
  <div class="demo-drawer__content">
    <el-form :model="form">
      <el-form-item label="公告标题" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="公告内容" :label-width="formLabelWidth">
        <el-input v-model="form.content" type="textarea" :rows="24" resize="none" autocomplete="off" />
      </el-form-item>
      <el-form-item label="发布日期" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.time"
          type="date"
          :disabled-date="disabledDate"
          placeholder="Pick a date"
          style="width: 100%"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <div class="demo-drawer__footer">
      <el-button @click="cancelForm">Cancel</el-button>
      <el-button type="primary" :loading="loading" @click="toUpdate">{{
        loading ? 'Submitting ...' : 'Submit'
      }}</el-button>
    </div>
  </div>
</el-drawer>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { getDetail, updateAnnounce } from '../../server/data/getAnnounce'
import { useRoute } from 'vue-router';
import { format } from '@/assets/js/format';
import { ElDrawer, ElMessageBox, ElMessage, ElButton } from 'element-plus'

const route = useRoute()
const announceList = ref({})
const userType = ref('')
const formLabelWidth = '80px'
let timer
const dialog = ref(false)
const loading = ref(false)

const form = reactive({
title: '',
content: '',
time: '',
announceId: 0
})
const drawerRef = ref()
const handleClose = (done) => {
if (loading.value) {
  return
}
ElMessageBox.confirm('是否关闭')
  .then(() => {
    loading.value = true
    timer = setTimeout(() => {
      done()
      // 动画关闭需要一定的时间
      setTimeout(() => {
        loading.value = false
      }, 400)
    }, 0)
  })
  .catch(() => {
    // catch error
  })
}
const cancelForm = () => {
loading.value = false
dialog.value = false
clearTimeout(timer)
}
const disabledDate = (time) => {
return time.getTime() > Date.now()
}

onMounted(async () => {
  const res = await getDetail(route.params.id)
  announceList.value = res.data[0]
  form.announceId = announceList.value.announceId
  form.title = announceList.value.title
  form.time = announceList.value.time
  form.content = announceList.value.content.replace(/<pre[^>]*>/gi, '').replace(/<\/pre>/gi, '')
  const result = JSON.parse(sessionStorage.getItem('userInfo'))
  if(result){
    userType.value = result.type
  }
})
/**日期转化 2023-09-12--》2023年9月12日*/
function dateFormat(date) {
  const dateObj = new Date(date)
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // JavaScript的月份是从0开始的，所以要加1
  const day = dateObj.getDate();
  // 格式化日期为所需的格式
  const formattedDate = year + "年" + month + "月" + day + "日";
  return formattedDate;
}
/**编辑公告详情 */
const toUpdate = () => {
  form.time = format(form.time)
  try {
      updateAnnounce(form).then(async (res) => {
          if (res.status === 200) {
              const res = await getDetail(form.announceId)
              announceList.value = res.data[0]
              ElMessage.success("修改公告成功")
              drawerRef.value.close() // 关闭Drawer抽屉
          }
      })
  } catch (error) {
      ElMessage.error(error.response.data)
  }
}
</script>

<style lang="less" scoped>
.common-content {
  background: #fff;
  max-height: calc(100vh - 20px);
  border-radius: 20px;
  overflow-y: scroll;
  z-index: 10;
  position: relative;
  padding: 30px 0 0 0;
  box-sizing: border-box;
}

.wrap-1280 {
  flex: 1;
  // width: 1280px;
  margin-left: auto;
  margin-right: auto;
}
.common-content .common__detail-content {
  padding-top: 10px;
  .common__detail-head {
      text-align: center;
      .title {
          font-size: 20px;
          color: #333333;
          line-height: 28px;
          font-weight: bold;
          padding-bottom: 8px;
      }
  }
}
.common-content .contents {
  padding: 30px;
  text-align: justify;
  line-height: 2;
  font-size: 14px;
  color: #666;
  font-family: 'SimSun', Arial, "Microsoft Yahei", 'SimHei';
}
.tree-bg {
  background: url(@/assets/images/tree-bg.png) right bottom no-repeat;
  background-size: 484px auto;
  min-height: 692px;
  margin-bottom: 26px;
}
.tree-bg {
  background: url(@/assets/images/tree-bg.png) right bottom no-repeat;
  background-size: 484px auto;
  min-height: 692px;
  margin-bottom: 26px;
}
.common__detail-rich {
  padding: 20px 60px 0 60px;
  font-size: 14px;
  text-align: justify;
  line-height: 2;
  color: #666;
  font-family: 'SimSun', Arial, "Microsoft Yahei", 'SimHei';
  :deep(pre) {
      white-space: pre-wrap;
  }
}
</style>