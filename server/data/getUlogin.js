import axios from 'axios'
// export const getUser = async(val) =>await axios.get('http://127.0.0.1:8800/userlogin/get',{
export const getUser = async(val) =>await axios.get('http://121.199.6.69:8800/userlogin/get',{
    params: val
})