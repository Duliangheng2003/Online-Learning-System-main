import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/stu/reg',
    component: () => import('@/views/stu/reg'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

]
/**
 * UserRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
 export const userRoutes = [
  {
    path: '/stu',
    component: Layout,
    redirect: '/stu/edit',
    name: 'stu',
    meta: { title: '个人中心', icon: 'el-icon-s-help', roles: ['student'] },
    children: [

      {
        // 跳转时,需要传入id
        path: 'edit',
        name: '修改资料',
        component: () => import('@/views/stu/edit'),
        meta: { title: '修改资料', icon: 'tree'},
      },
      {
        path: 'mycollection',
        name: '我的收藏',
        component: () => import('@/views/stu/mycollection'),
        meta: { title: '我的收藏', icon: 'tree' }
      },
      {
        path: 'todolist',
        name: '待办事项',
        component: () => import('@/views/stu/todolist'),
        meta: { title: '待办事项', icon: 'tree' }
      },
      {
        path: 'submit/:id',
        name: '作业提交',
        component: () => import('@/views/stu/submit'),
        meta: { title: '作业提交', icon: 'tree' },
        hidden:true
      },
      {
        path: 'myquestions',
        name: '我的提问',
        component: () => import('@/views/stu/myquestions'),
        meta: { title: '我的提问', icon: 'tree' }
      },
      {
        path: 'myanswers',
        name: '我的回答',
        component: () => import('@/views/stu/myanswers'),
        meta: { title: '我的回答', icon: 'tree' }
      }
    ]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/index',
    name: '课程查看页面',
    meta: { title: '课程页面', icon: 'el-icon-s-help', roles: ['student']},
    children: [
      {
        path: 'index',
        name: '课程',
        component: () => import('@/views/course/index'),
        meta: { title: '课程', icon: 'table' }
      },

      {
        path: 'detail/:id',
        name: '课程详情',
        component: () => import('@/views/course/detail'),
        meta: { title: '课程详情', icon: 'table'},
        hidden:true
      }
    ]
  },
  {
    path: '/study',
    component: Layout,
    redirect: '/study/mycourse',
    name: '我的学习',
    meta: { title: '我的学习', icon: 'el-icon-s-help', roles: ['student']},
    children: [

      {
        path: 'detail/:id',
        name: '课程详情',
        component: () => import('@/views/course/detail'),
        meta: { title: '课程详情', icon: 'table'},
        hidden:true
      },
      {
        path: 'mycourse',
        name: '我的课程',
        component: () => import('@/views/study/mycourse'),
        meta: { title: '我的课程', icon: 'tree' }
      },
      {
        path: 'studytask',
        name: '学习任务',
        component: () => import('@/views/study/studytask'),
        meta: { title: '学习任务', icon: 'tree' }
      }
    ]
  },

  // {
  //   path: '/article',
  //   component: Layout,
  //   redirect: '/article/index',
  //   name: '文章',
  //   meta: { title: '文章页面', icon: 'el-icon-s-help' , roles: ['student']},
  //   children: [
  //     {
  //       path: 'index',
  //       name: '文章主页',
  //       component: () => import('@/views/article/index'),
  //       meta: { title: '文章', icon: 'table' }
  //     },
  //     {
  //       path: 'new',
  //       name: '发布',
  //       component: () => import('@/views/article/new'),
  //       meta: { title: '发布', icon: 'tree' }
  //     },
  //   ]
  // },
  {
    path: '/question',
    component: Layout,
    redirect: '/question/index',
    name: '问答',
    meta: { title: '讨论区', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: '问题',
        component: () => import('@/views/question/index'),
        meta: { title: '问题', icon: 'table' }
      },
      {
        path: 'detail/:id',
        name: '问题详情',
        component: () => import('@/views/question/detail'),
        meta: { title: '问题详情', icon: 'table' },
        hidden:true
      },
      {
        path: 'new',
        name: '提问',
        component: () => import('@/views/question/new'),
        meta: { title: '提问', icon: 'tree' }
      },
      {
        path: 'myquestions',
        name: '我的提问',
        component: () => import('@/views/question/myquestions'),
        meta: { title: '我的提问', icon: 'tree' }
      },
      {
        path: 'myanswers',
        name: '我的回答',
        component: () => import('@/views/question/myanswers'),
        meta: { title: '我的回答', icon: 'tree' }
      },
      {
        // 跳转时,需要传入id
        path: 'new/:id',
        name: '修改提问',
        component: () => import('@/views/question/new'),
        meta: { title: '修改提问', icon: 'tree' },
        hidden:true
      }
    ]
  },
  {
    path: '/answer',
    component: Layout,
    redirect: '/answer',
    name: '回答',
    meta: { title: '回答页面', icon: 'el-icon-s-help' , roles: ['student']},
    hidden:true,
    children: [
      {
        // 跳转时,需要传入id
        path: 'new/:id',
        name: '修改回答',
        component: () => import('@/views/answer/new'),
        meta: { title: '修改回答', icon: 'tree' },
        hidden:true
      }
    ]
  },

  /**
   * 教师页面部分
   */
  {
    path: '/stu',
    component: Layout,
    redirect: '/stu/list',
    name: 'stu',
    meta: { title: '学生管理', icon: 'el-icon-s-help',roles: ['teacher'] },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/stu/list'),
        meta: { title: '学生列表', icon: 'user' }
      },
      {
        // 跳转时,需要传入id
        path: 'save/:id',
        name: '修改学生',
        component: () => import('@/views/stu/save'),
        meta: { title: '修改学生', icon: 'tree' },
        hidden:true
      }
    ]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'el-icon-s-help' ,roles: ['teacher']},
    children: [
      // {
      //   path: 'list',
      //   name: '讲师列表',
      //   component: () => import('@/views/teacher/list'),
      //   meta: { title: '讲师列表', icon: 'table' },
      //   children: [
      //     {
      //       path: 'index',
      //       name: '老师',
      //       component: () => import('@/views/teacher/index'),
      //       meta: { title: '老师', icon: 'table' }
      //     },

      //     {
      //       path: 'detail/:id',
      //       name: '老师首页',
      //       component: () => import('@/views/teacher/detail'),
      //       meta: { title: '老师首页', icon: 'table' },
      //       hidden:true
      //     }
      //   ]
      // },
      // {
      //   path:'save',
      //   name: '添加讲师',
      //   component: () => import('@/views/teacher/save'),
      //   meta: { title: '添加讲师', icon: 'tree' }
      // },
      // {
      //   // 跳转时,需要传入id
      //   path:'save/:id',
      //   name: '修改讲师',
      //   component: () => import('@/views/teacher/save'),
      //   meta: { title: '修改讲师', icon: 'tree' },
      //   hidden:true
      // },
      /**
       * 课程列表页
       */
      {
        path: 'list',
        name: '课程列表',
        component: () => import('@/views/course/list'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path:'save',
        name: '创建课程',
        component: () => import('@/views/course/save'),
        meta: { title: '创建课程', icon: 'tree' },
      },
      {
        path:'save/:id',
        name: '修改课程',
        component: () => import('@/views/course/save'),
        meta: { title: '修改课程', icon: 'tree' },
        hidden:true,
      },
      {
        path: 'students/:id',
        name: '查看名单',
        component: () => import('@/views/course/students'),
        meta: { title: '查看名单', icon: 'tree' },
        hidden:true
      },
      {
        path: 'collections/:id',
        name: '查看收藏学生',
        component: () => import('@/views/course/collections'),
        meta: { title: '查看收藏学生', icon: 'tree' },
        hidden:true
      },
      {
        path: 'materials/:id',
        name: '删除课程课件',
        component: () => import('@/views/course/materials'),
        meta: { title: '删除课程课件', icon: 'tree' },
        hidden:true
      },
      {
        path: 'courseware/:id',
        name: '添加课程课件',
        component: () => import('@/views/course/courseware'),
        meta: { title: '添加课程课件', icon: 'tree' },
        hidden:true
      },
      {
        path:'assignment/:id',
        name: '布置作业',
        component: () => import('@/views/course/assignment'),
        meta: { title: '布置作业', icon: 'tree' },
        hidden:true
      }
    ]
  },
  {
    path: '/courseware',
    component: Layout,
    redirect: '/courseware/list',
    name: '课件管理',
    meta: { title: '课件管理', icon: 'el-icon-s-help',roles: ['teacher'] },
    children: [
      {
        path: 'list',
        name: '课件列表',
        component: () => import('@/views/courseware/list'),
        meta: { title: '课件列表', icon: 'star' }
      },
      {
        path: 'save',
        name: '添加课件',
        component: () => import('@/views/courseware/save'),
        meta: { title: '添加课件', icon: 'tree' }
      },
      // 修改讲师的路由,因为修改讲师也是跳转到save页面因此不让其显示
      {
        // 跳转时,需要传入id
        path: 'save/:id',
        name: '修改课件',
        component: () => import('@/views/courseware/save'),
        meta: { title: '修改课件', icon: 'tree' },
        hidden:true
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on admin roles
 */
export const asyncRoutes = [
  // {
  //   path: '/teacher',
  //   component: Layout,
  //   redirect: '/teacher/list',
  //   name: '讲师管理',
  //   meta: { title: '讲师管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '讲师列表',
  //       component: () => import('@/views/teacher/list'),
  //       meta: { title: '讲师列表', icon: 'table' }
  //     },
  //     {
  //       path: 'save',
  //       name: '添加讲师',
  //       component: () => import('@/views/teacher/save'),
  //       meta: { title: '添加讲师', icon: 'tree' }
  //     },
  //     // 修改讲师的路由,因为修改讲师也是跳转到save页面因此不让其显示
  //     {
  //       // 跳转时,需要传入id
  //       path: 'save/:id',
  //       name: '修改讲师',
  //       component: () => import('@/views/teacher/save'),
  //       meta: { title: '修改讲师', icon: 'tree' },
  //       hidden:true
  //     }
  //   ]
  // },

  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/courselist',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'el-icon-s-help' ,roles: ['admin']},
    children: [
      // {
      //   path: 'list',
      //   name: '讲师列表',
      //   component: () => import('@/views/teacher/list'),
      //   meta: { title: '讲师列表', icon: 'table' },
      //   children: [
      //     {
      //       path: 'index',
      //       name: '老师',
      //       component: () => import('@/views/teacher/index'),
      //       meta: { title: '老师', icon: 'table' }
      //     },

      //     {
      //       path: 'detail/:id',
      //       name: '老师首页',
      //       component: () => import('@/views/teacher/detail'),
      //       meta: { title: '老师首页', icon: 'table' },
      //       hidden:true
      //     }
      //   ]
      // },
      // {
      //   path:'save',
      //   name: '添加讲师',
      //   component: () => import('@/views/teacher/save'),
      //   meta: { title: '添加讲师', icon: 'tree' }
      // },
      // {
      //   // 跳转时,需要传入id
      //   path:'save/:id',
      //   name: '修改讲师',
      //   component: () => import('@/views/teacher/save'),
      //   meta: { title: '修改讲师', icon: 'tree' },
      //   hidden:true
      // },
      /**
       * 课程列表页
       */
      {
        path: 'courselist',
        name: '课程列表',
        component: () => import('@/views/admin/courselist'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path:'save',
        name: '创建课程',
        component: () => import('@/views/course/save'),
        meta: { title: '创建课程', icon: 'tree' },
      },
      {
        path:'save/:id',
        name: '修改课程',
        component: () => import('@/views/course/save'),
        meta: { title: '修改课程', icon: 'tree' },
        hidden:true,
      },
      {
        path: 'students/:id',
        name: '查看名单',
        component: () => import('@/views/course/students'),
        meta: { title: '查看名单', icon: 'tree' },
        hidden:true
      },
      {
        path: 'collections/:id',
        name: '查看收藏学生',
        component: () => import('@/views/course/collections'),
        meta: { title: '查看收藏学生', icon: 'tree' },
        hidden:true
      },
      {
        path: 'materials/:id',
        name: '删除课程课件',
        component: () => import('@/views/course/materials'),
        meta: { title: '删除课程课件', icon: 'tree' },
        hidden:true
      },
      {
        path: 'courseware/:id',
        name: '添加课程课件',
        component: () => import('@/views/course/courseware'),
        meta: { title: '添加课程课件', icon: 'tree' },
        hidden:true
      },
      {
        path:'assignment/:id',
        name: '布置作业',
        component: () => import('@/views/course/assignment'),
        meta: { title: '布置作业', icon: 'tree' },
        hidden:true
      }
    ]
  },
  // -----课程分类路由
  // 课程问答路由
  {
    path: '/question',
    component: Layout,
    redirect: '/question/list',
    name: '提问页面管理',
    meta: { title: '提问页面管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '提问展示列表',
        component: () => import('@/views/question/list'),
        meta: { title: '提问展示列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '提问上传',
        component: () => import('@/views/question/save'),
        meta: { title: '提问上传', icon: 'tree' }
      },
      {
        // 跳转时,需要传入id
        path: 'save/:id',
        name: '修改提问',
        component: () => import('@/views/question/save'),
        meta: { title: '修改提问', icon: 'tree' },
        hidden:true
      }
    ]
  },
  {
    path: '/answer',
    component: Layout,
    redirect: '/answer/list',
    name: '回答页面管理',
    meta: { title: '回答页面管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '回答展示列表',
        component: () => import('@/views/answer/list'),
        meta: { title: '回答展示列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '回答上传',
        component: () => import('@/views/answer/save'),
        meta: { title: '问答上传', icon: 'tree' }
      },
      {
        // 跳转时,需要传入id
        path: 'save/:id',
        name: '修改回答',
        component: () => import('@/views/answer/save'),
        meta: { title: '修改回答', icon: 'tree' },
        hidden:true
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/list',
    name: 'stu',
    meta: { title: '用户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/admin/list'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加用户',
        component: () => import('@/views/admin/save'),
        meta: { title: '添加用户', icon: 'tree' }
      },
      {
        // 跳转时,需要传入id
        path: 'save/:id',
        name: '修改学生',
        component: () => import('@/views/admin/save'),
        meta: { title: '修改学生', icon: 'tree' },
        hidden:true
      }
    ]
  },

  // {
  //   path: '/article',
  //   component: Layout,
  //   redirect: '/article/list',
  //   name: 'article',
  //   meta: { title: '文章管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '文章列表',
  //       component: () => import('@/views/article/list'),
  //       meta: { title: '文章列表', icon: 'table' }
  //     },
  //     {
  //       path: 'save',
  //       name: '添加文章',
  //       component: () => import('@/views/article/save'),
  //       meta: { title: '添加文章', icon: 'tree' }
  //     },
  //     {
  //       // 跳转时,需要传入id
  //       path: 'save/:id',
  //       name: '修改文章',
  //       component: () => import('@/views/article/save'),
  //       meta: { title: '修改文章', icon: 'tree' },
  //       hidden:true
  //     }
  //   ]
  // },


  // {
  //   path: '/emp',
  //   component: Layout,
  //   redirect: '/emp/list',
  //   name: 'emp',
  //   meta: { title: '员工管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '员工列表',
  //       component: () => import('@/views/emp/list'),
  //       meta: { title: '员工列表', icon: 'table' }
  //     },
  //     {
  //       path: 'save',
  //       name: '添加员工',
  //       component: () => import('@/views/emp/save'),
  //       meta: { title: '添加员工', icon: 'tree' }
  //     },
  //     {
  //       // 跳转时,需要传入id
  //       path: 'save/:id',
  //       name: '修改员工',
  //       component: () => import('@/views/emp/save'),
  //       meta: { title: '修改员工', icon: 'tree' },
  //       hidden:true
  //     }
  //   ]
  // },


  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
