import axios from 'axios'

// export const getUserList = async() =>await axios.get('http://127.0.0.1:8800/user/getAll')

export const getUserList = async() =>await axios.get('http://121.199.6.69:8800/user/getAll')

// export const getUserInfo = async(phone) =>await axios.get('http://127.0.0.1:8800/user/get',{
export const getUserInfo = async(phone) =>await axios.get('http://121.199.6.69:8800/user/get',{
    params:{
        phone:phone
    }
})
export const getUser = async(userId) =>await axios.get('http://121.199.6.69:8800/user/getUser',{
// export const getUser = async(userId) =>await axios.get('http://127.0.0.1:8800/user/getUser',{
    params:{
        userId:Number(userId)
    }
})
// export const addUser =async (obj) =>await axios.post('http://127.0.0.1:8800/user/add', {
export const addUser =async (obj) =>await axios.post('http://121.199.6.69:8800/user/add', { 
    params: {
        userId: Number(obj.userId),
        name: obj.name,
        phone: Number(obj.phone),
        email: obj.email,
        password: obj.password,
        image: 'https://img47.photophoto.cn/20180426/0470063083396323_s.jpg',
        type: 'read'
    },
})
// export const deletedUser = async(userId) =>await axios.post('http://127.0.0.1:8800/user/delete',{
    export const deletedUser = async(userId) =>await axios.post('http://121.199.6.69:8800/user/delete',{
    params:{
        userId:Number(userId)
    }
})
// export const updateUser =async (obj) =>await axios.post('http://127.0.0.1:8800/user/update', {
    export const updateUser =async (obj) =>await axios.post('http://121.199.6.69:8800/user/update', {
    params: {
        userId: obj.userId,
        name: obj.name,
        phone: obj.phone,
        email: obj.email,
        password: obj.password,
        image: obj.image,
        type: 'read'
    }
})



