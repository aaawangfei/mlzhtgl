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
		  path: 'lmview',
		  name:'lmview',
			hidden: true ,
			meta: { title: '查看详情',noCache: true },
		  component: () => import('@/views/columnManage/lmview'),
		},
		{
		  path: 'floorgoodsmain',
		  name:'floorgoodsmain',
			hidden: true ,
			meta: { title: '商品维护',noCache: true },
		  component: () => import('@/views/columnManage/floorgoodsmain'),
		},
    {
      path: 'floor',
      name:'floor',
      component: () => import('@/views/columnManage/floor'),
      meta: { title: '楼层管理',noCache: true }
    },
		{
		  path: 'lmgoodsmain',
		  name:'lmgoodsmain',
			hidden: true ,
			meta: { title: '商品维护',noCache: true },
		  component: () => import('@/views/columnManage/lmgoodsmain'),
		},
		{
		  path: 'addfloor',
		  name:'addfloor',
			hidden: true ,
			meta: { title: '楼层添加',noCache: true },
		  component: () => import('@/views/columnManage/addfloor'),
		},
		{
		  path: 'Associatedgoods',
		  name:'Associatedgoods',
			hidden: true ,
			meta: { title: '关联商品',noCache: true },
		  component: () => import('@/views/columnManage/Associatedgoods'),
		},
		{
		  path: 'floorview',
		  name:'floorview',
			hidden: true ,
			meta: { title: '查看详情',noCache: true },
		  component: () => import('@/views/columnManage/floorview'),
		},
		{
		  path: 'banner',
		  name:'banner',
		  component: () => import('@/views/columnManage/banner'),
		  meta: { title: 'banner管理',noCache: true }
		},
		{
		  path: 'setting',
		  name:'setting',
			hidden: true ,
			meta: { title: '设置',noCache: true },
		  component: () => import('@/views/columnManage/setting'),
		},
		{
		  path: 'imgsetting',
		  name:'imgsetting',
			hidden: true ,
			meta: { title: '图片设置',noCache: true },
		  component: () => import('@/views/columnManage/imgsetting'),
		},
  ]
}
export default columnRouter
