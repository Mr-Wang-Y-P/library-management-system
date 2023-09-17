import axios from 'axios'

// export const getAnnounce = async() =>await axios.get('http://127.0.0.1:8800/announce/getAll')
export const getAnnounce = async() =>await axios.get('http://121.199.6.69:8800/announce/getAll')

// export const getDetail =async (announceId) =>await axios.get('http://127.0.0.1:8800/announce/getDetail', {
    export const getDetail =async (announceId) =>await axios.get('http://121.199.6.69:8800/announce/getDetail', {
    params: {
        announceId: Number(announceId),
    }
})

// export const addAnnounce =async (obj) =>await axios.post('http://127.0.0.1:8800/announce/add', {
    export const addAnnounce =async (obj) =>await axios.post('http://121.199.6.69:8800/announce/add', {
    params: {
        content: obj.content,
        time: obj.time,
        title: obj.title,
        announceId: Number(obj.announceId),
    }
})
// export const deletedAnnounce = async(announceId) =>await axios.post('http://127.0.0.1:8800/announce/delete',{
    export const deletedAnnounce = async(announceId) =>await axios.post('http://121.199.6.69:8800/announce/delete',{
    params:{
        announceId:Number(announceId)
    }
})
// export const updateAnnounce =async (obj) =>await axios.post('http://127.0.0.1:8800/announce/update', {
    export const updateAnnounce =async (obj) =>await axios.post('http://121.199.6.69:8800/announce/update', {
    params: {
        content: '<pre>' + obj.content + '</pre>',
        time: obj.time,
        title: obj.title,
        announceId: Number(obj.announceId),
    }
})