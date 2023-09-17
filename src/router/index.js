import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '首页'
      },
      component: HomeView,
      children:[
        {
          path: '/home',
          name: 'home',
          meta: {
            title: '首页'
          },
          component: () => import('@/pages/IndexView.vue'),
        },
        {
          path: '/lookBooks',
          name: 'lookBooks',
          meta: {
            title: '借阅书籍'
          },
          component: () => import('@/pages/lookBooks.vue'),
        },
        {
          path: '/personal',
          name: 'personal',
          meta: {
            title: '个人信息'
          },
          component: () => import('@/pages/personalView.vue')
        },
        {
          path: '/borrowBooks',
          name: 'borrowBooks',
          meta: {
            title: '借书记录'
          },
          component: () => import('@/pages/borrowBooks.vue')
        },
        {
          path: '/addBooks',
          name: 'addBooks',
          meta: {
            title: '录入新书'
          },
          component: () => import('@/pages/addBooks.vue')
        },
        {
          path: '/searchBooks',
          name: 'searchBooks',
          meta: {
            title: '查询书籍'
          },
          component: () => import('@/pages/searchBooks.vue')
        },
        {
          path: '/searchBooks/:id',
          name: 'updateBooks',
          meta: {
            title: '编辑书籍'
          },
          component: () => import('@/pages/updateBooks.vue')
        },
        {
          path: '/searchUser',
          name: 'searchUser',
          meta: {
            title: '查询用户'
          },
          component: () => import('@/pages/searchUser.vue')
        },
        {
          path: '/searchUser/:id',
          name: 'updateUser',
          meta: {
            title: '编辑用户'
          },
          component: () => import('@/pages/updateUser.vue')
        },
        {
          path: '/addUser',
          name: 'addUser',
          meta: {
            title: '新增用户'
          },
          component: () => import('@/pages/addUser.vue')
        },
        {
          path: '/allRecords',
          name: 'allRecords',
          meta: {
            title: '所有记录'
          },
          component: () => import('@/pages/allRecords.vue')
        },
        {
          path: '/lookBooks/:id',
          name: 'Book',
          meta: {
            title: '书籍详情'
          },
          component: () => import('@/pages/seeBook.vue')
        },
        {
          path: '/announce',
          name: 'announce',
          meta: {
            title: '公告信息'
          },
          component: () => import('@/pages/announceView.vue')
        },
        {
          path: '/announce/:id',
          name: 'announceDetail',
          meta: {
            title: '公告详情'
          },
          component: () => import('@/pages/announceDetail.vue')
        }
      ]
    },
    {
      path: '/sign',
      name: 'sign',
      meta: {
        title: '登录-注册'
      },
      component: () => import('@/views/SignView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      meta: {
        title: 'NotFound'
      },
      component: () => import('@/views/404View.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('@/views/AboutView.vue')
    // }
  ]
})
router.beforeEach((to, form, next) => {
  if (to.meta.title) {
    document.title = `图书管理系统 | ${to.meta.title}`
    if (to.path == '/sign') next()
    else if (sessionStorage.getItem('userInfo')) {
      next()
    } else {
      next('/sign')
    }
  }
})
export default router
