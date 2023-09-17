<template>
  <div class="body">
    <div class="box">
      <div class="head">
        <span class="span1">公告</span>
        <el-button type="primary" @click="dialog = true">新增</el-button>
      </div>
      <div class="color"></div>
      <div class="body">
        <ul>
          <li v-for="(item, index) in announceList" :key="index" @click="toDetail(item.announceId)">
            <i class="i"></i>
            <a href="#"
              ><span class="span2">{{ item.title }} </span></a
            >
            <span class="span3">{{ item.time }} <ElButton type="danger" @click.stop="toDetel(item.announceId)">删除</ElButton></span>
          </li>
        </ul>
      </div>
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
        <el-button type="primary" :loading="loading" @click="newAnnounce">{{
          loading ? 'Submitting ...' : 'Submit'
        }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { addAnnounce, getAnnounce, deletedAnnounce } from '../../server/data/getAnnounce'
import router from '../router';
import { customAlphabet } from 'nanoid'
import { format } from '@/assets/js/format';
import { ElDrawer, ElMessageBox, ElMessage, ElButton } from 'element-plus'

const nanoid = customAlphabet('1234567890', 5)
const formLabelWidth = '80px'
let timer
const dialog = ref(false)
const loading = ref(false)

const form = reactive({
  title: '',
  content: '',
  time: ''
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

const announceList = ref({})
/**跳转公告详情页面 */
function toDetail(id) {
  router.push(`/announce/${id}`)
}

/**新增公告 */
async function newAnnounce() {
  form.announceId = Number(nanoid())
  form.content = '<pre>' + form.content + '</pre>'
  form.time = format(form.time)
  console.log(form);
  try {
    await addAnnounce(form).then(async (res) => {
    if (res.status === 200) {
      const res = await getAnnounce()
      announceList.value = res.data
      ElMessage.success("添加公告成功")
      drawerRef.value.close() // 关闭Drawer抽屉
    }
  })
  } catch (error) {
    ElMessage.error(error.response.data)
  }
}
/**删除公告 */
const toDetel = (announceId) => {
  ElMessageBox.confirm(
    '你确定要删除该条公告吗?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      await deletedAnnounce(announceId)
      const res = await getAnnounce()
      announceList.value = res.data
      ElMessage({
        type: 'success',
        message: '删除完成',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}


onMounted(async () => {
  const res = await getAnnounce()
  announceList.value = res.data
  // console.log(res.data)
  // console.log(announceList)
})
</script>

<style lang="less" scoped>
.body {
  background-color: WhiteSmoke;
  width: 100%;
  height: 100%;

  .box {
    margin: 5%;
    width: 90%;
    height: 80%;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.12),
      0 0 6px rgba(0, 0, 0, 0.04);
    background-color: white;
    border-radius: 30px;
  }
  .head {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    padding: 20px 100px 10px 35px;
    .span1 {
      font-size: 20px;
      font-weight: 400;
      color: #666666;
      line-height: 1;
    }
  }
  .color {
    background-color: WhiteSmoke;
    width: 100%;
    height: 8px;
  }
  .body {
    background-color: white;
    height: 500px;
    overflow-y: scroll;
  }
  ul {
    margin: 35px 70px;
    text-align: center;
    line-height: 1.5;
    font-size: 17px;
    color: #666;
    font-family: 'SimSun', Arial, 'Microsoft Yahei', 'SimHei';
    list-style-type: none;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
    height: 30px;
    padding: 20px;
    overflow: hidden;
    &:hover {
      background-color: #aeeeee;
      border-radius: 10px;
    }
    border-bottom: 1px dashed #ebebeb;
  }
  .i {
    float: left;
    display: block;
    width: 6px;
    height: 6px;
    background: #666666;
    border-radius: 50%;
    margin: 10px 10px 0 0;
  }
  .span2 {
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    color: #666;
  }
  .span3 {
    float: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    color: #666;
  }
}

.demo-drawer__footer {
  text-align: right;
}

</style>
