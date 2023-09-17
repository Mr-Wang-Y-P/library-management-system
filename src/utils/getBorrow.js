import axios from 'axios'
// const baseUrl = 'http://127.0.0.1'
const baseUrl = 'http://121.199.6.69'
export const getBorrowList = async() =>await axios.get(`${baseUrl}:8800/borrow/getAll`)

export const getBorrowBook = async(nameid) =>await axios.get(`${baseUrl}:8800/borrow/get`,{
    params:{
        nameid:Number(nameid)
    }
})
export const getSelectedBorrowBook = async(nameid) =>await axios.get(`${baseUrl}:8800/borrow/getSelected`,{
    params:{
        nameid:nameid
    }
})
export const addBorrow =async (obj) =>await axios.post(`${baseUrl}:8800/borrow/add`, {
    params: {
        bookname: obj.bookname,
        borrowtime: obj.borrowtime,
        reallyrepaytime: obj.reallyrepaytime,
        repaytime: obj.repaytime,
        borrowers: obj.borrowers,
        userId: Number(obj.userId),
        nameid: Number(obj.nameid),
        borrowId: Number(obj.borrowId),
    }
})
export const deletedBorrow = async(borrowId) =>await axios.post(`${baseUrl}:8800/borrow/delete`,{
    params:{
        borrowId:Number(borrowId)
    }
})
export const updateBorrow =async (obj) =>await axios.post(`${baseUrl}:8800/borrow/update`, {
    params: {
        bookname: obj.bookname,
        borrowtime: obj.borrowtime,
        reallyrepaytime: obj.reallyrepaytime,
        repaytime: obj.repaytime,
        borrowers: obj.borrowers,
        userId: Number(obj.userId),
        nameid:Number(obj.nameid),
        borrowId: Number(obj.borrowId),
    }
})

