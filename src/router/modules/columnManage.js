import Layout from '@/views/layout/Layout'

const columnRouter = {
  path: '/columnManage',
  component: Layout,
  redirect: '/columnManage/index',
  name:'column',
  meta:{
    title:'栏目管理',
    icon:'tree'
  },
  children: [
    {
      path: 'index',
      name:'columnList',
      component: () => import('@/views/columnManage/index'),
      meta: { title: '栏目管理', noCache: true}
    },
    {
      path: 'newcolumn',
      name: 'column',
      hidden: true ,
      meta: { title: '栏目添加',noCache: true },
      component: () => import('@/views/columnManage/newcolumn'),
    },
    {
      path: 'updatecolumnList',
      name: 'updatecolumnList',
      hidden: true ,
      meta: { title: '修改栏目',noCache: true },
      component: () => import('@/views/columnManage/updatecolumnList'),
    },
    {
      path: 'floor',
      name:'floor',
      component: () => import('@/views/columnManage/floor'),
      meta: { title: '楼层管理',noCache: true }
    },
		{
		  path: 'addfloor',
		  name:'addfloor',
			hidden: true ,
			meta: { title: '楼层添加',noCache: true },
		  component: () => import('@/views/columnManage/addfloor'),
		},
		{
		  path: 'banner',
		  name:'banner',
		  component: () => import('@/views/columnManage/banner'),
		  meta: { title: 'banner管理',noCache: true }
		},
  ]
}
export default columnRouter
