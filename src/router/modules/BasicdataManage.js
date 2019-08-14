import Layout from '@/views/layout/Layout'

const BasicdataRouter = {
  path: '/BasicdataManage',
  component: Layout,
  redirect: '/BasicdataManage/brand/index',
  name:'BasicdataManage',
  meta:{
    title:'基础资料',
    icon:'tree'
  },
  children: [
    {
      path: '/BasicdataManage/brand/index',
      name:'/BasicdataManage/brand/index',
      component: () => import('@/views/BasicdataManage/brand/index'),
      meta: { title: '品牌管理', noCache: true}
    },
    {
      path: '/BasicdataManage/supplier/index',
      name: '/BasicdataManage/supplier/index',
			component: () => import('@/views/BasicdataManage/supplier/index'),
      meta: { title: '供货商管理',noCache: true },
    },
    {
      path: '/BasicdataManage/Manufacturers/index',
      name: '/BasicdataManage/Manufacturers/index',
			component: () => import('@/views/BasicdataManage/Manufacturers/index'),
      meta: { title: '生产厂商管理',noCache: true },
    },
  ]
}
export default BasicdataRouter
