import axios from 'axios'
// const baseUrl = 'http://127.0.0.1'
const baseUrl = 'http://121.199.6.69'
export const getManage = async(val) =>await axios.get(`${baseUrl}:8800/managelogin/get`,{
    params: val
})