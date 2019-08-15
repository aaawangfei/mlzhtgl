import Layout from '@/views/layout/Layout'

const informRouter = {
  path: '/informManage',
  component: Layout,
  redirect: '/informManage/sale/index',
  name:'informManage',
  meta:{
    title:'信息管理',
    icon:'clipboard'
  },
  children: [
    {
      path: '/informManage/sale/index',
      name:'/informManage/sale/index',
      component: () => import('@/views/informManage/sale/index'),
      meta: { title: '求组求售', noCache: true}
    },
		{
		  path: '/informManage/sale/add',
		  name:'/informManage/sale/add',
			hidden: true ,
		  component: () => import('@/views/informManage/sale/add'),
		  meta: { title: '添加', noCache: true}
		},
		{
		  path: '/informManage/sale/edit',
		  name:'/informManage/sale/edit',
			hidden: true ,
		  component: () => import('@/views/informManage/sale/edit'),
		  meta: { title: '编辑', noCache: true}
		},
    {
      path: '/informManage/Rentout/index',
      name: '/informManage/Rentout/index',
			component: () => import('@/views/informManage/Rentout/index'),
      meta: { title: '出租出售',noCache: true },
    },
  ]
}
export default informRouter
