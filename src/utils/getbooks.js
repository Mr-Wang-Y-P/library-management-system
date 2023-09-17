import axios from 'axios'

// export const getBooksList = async() =>await axios.get('http://127.0.0.1:8800/books/getAll')
export const getBooksList = async() =>await axios.get('http://121.199.6.69:8800/books/getAll')

// export const getSelectedBook = async(nameid) =>await axios.get('http://127.0.0.1:8800/books/get',{
    export const getSelectedBook = async(nameid) =>await axios.get('http://121.199.6.69:8800/books/get',{
    params:{
        nameid:(nameid)
    }
})
// export const getBook = async(nameid) =>await axios.get('http://127.0.0.1:8800/books/getBook',{
    export const getBook = async(nameid) =>await axios.get('http://121.199.6.69:8800/books/getBook',{
    params:{
        nameid:Number(nameid)
    }
})
// export const addBook =async (obj) =>await axios.post('http://127.0.0.1:8800/books/add', {
    export const addBook =async (obj) =>await axios.post('http://121.199.6.69:8800/books/add', {
    params: {
        nameid: Number(obj.nameid),
        name: obj.name,
        author: obj.author,
        sort: obj.sort,
        describe: obj.describe,
        publisher: obj.publisher,
        url: obj.url,
        stock:Number(obj.stock)
    }
})
// export const deletedBook = async(nameid) =>await axios.post('http://127.0.0.1:8800/books/delete',{
    export const deletedBook = async(nameid) =>await axios.post('http://121.199.6.69:8800/books/delete',{
    params:{
        nameid:Number(nameid)
    }
})
// export const updateBook =async (obj) =>await axios.post('http://127.0.0.1:8800/books/update', {
    export const updateBook =async (obj) =>await axios.post('http://121.199.6.69:8800/books/update', {
    params: {
        nameid: Number(obj.nameid),
        name: obj.name,
        author: obj.author,
        sort: obj.sort,
        describe: obj.describe,
        publisher: obj.publisher,
        url: obj.url,
        stock:Number(obj.stock)
    }
})

