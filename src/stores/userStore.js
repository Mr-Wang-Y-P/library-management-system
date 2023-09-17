import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '../utils/getUser'
import { getManageInfo } from '../utils/getManage'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})
    const getUserPersonInfo = async (phone) => {
        const res = await getUserInfo(phone)
        userInfo.value = res.data
    }

    return { userInfo, getUserPersonInfo }
})

export const useManageStore = defineStore('manage', () => {
    const manageInfo = ref({})
    const getManagePersonInfo = async (phone) => {
        const res = await getManageInfo(phone)
        manageInfo.value = res.data
    }

    return { manageInfo, getManagePersonInfo }
})
