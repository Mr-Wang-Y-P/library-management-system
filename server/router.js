let express = require('express')
let router = express.Router()
let manage = require('./API/manage')
let user = require('./API/user')
let books = require('./API/books')
let userlogin = require('./API/userlogin')
let managelogin = require('./API/managelogin')
let borrow = require('./API/borrow')
let announce=require('./API/announce')

router.get('/books/getAll', books.getAll)
router.get('/books/get', books.get)
router.get('/books/getBook', books.getBook)
router.post('/books/add', books.add)
router.post('/books/delete', books.delete)
router.post('/books/update', books.update)


router.get('/manage/get', manage.get)


router.get('/user/getAll', user.getAll)
router.get('/user/getUser', user.getUser)
router.get('/user/get', user.get)
router.post('/user/add', user.add)
router.post('/user/delete', user.delete)
router.post('/user/update', user.update)



router.get('/userlogin/get', userlogin.get)

router.get('/managelogin/get', managelogin.get)

router.get('/borrow/getAll', borrow.getAll)
router.get('/borrow/get', borrow.get)
router.get('/borrow/getSelected', borrow.getSelected)
router.post('/borrow/add', borrow.add)
router.post('/borrow/delete', borrow.delete)
router.post('/borrow/update', borrow.update)

router.get('/announce/getAll', announce.getAll)
router.get('/announce/getDetail', announce.getDetail)
// router.get('/user/get', user.get)
router.post('/announce/add', announce.add)
router.post('/announce/delete', announce.delete)
router.post('/announce/update', announce.update)

module.exports = router
