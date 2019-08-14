import Layout from '@/views/layout/Layout'

const accountRouter = {
  path: '/accountManage',
  component: Layout,
  redirect: '/accountManage/accountlist/index',
  name:'accountManage',
  meta:{
    title:'账户管理',
    icon:'documentation'
  },
  children: [
    {
      path: '/accountManage/accountlist/index',
      name:'/accountManage/accountlist/index',
      component: () => import('@/views/accountManage/accountlist/index'),
      meta: { title: '账户列表', noCache: true}
    },
    {
      path: '/accountManage/Enterpris/index',
      name: '/accountManage/Enterpris/index',
			component: () => import('@/views/accountManage/Enterpris/index'),
      meta: { title: '企业审核',noCache: true },
    },
  ]
}
export default accountRouter
