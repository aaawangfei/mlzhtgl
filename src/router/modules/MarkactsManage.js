import Layout from '@/views/layout/Layout'

const MarkactsRouter = {
  path: '/MarkactsManage',
  component: Layout,
  redirect: '/MarkactsManage/Discount',
  name:'Markacts',
  meta:{
    title:'营销活动',
    icon:'money'
  },
  children: [
    {
      path: 'Discount',
      name:'Discount',
      component: () => import('@/views/MarkactsManage/Discount'),
      meta: { title: '折扣活动', noCache: true}
    },
    {
      path: 'newact',
      name: 'newact',
      hidden: true ,
      meta: { title: '活动添加',noCache: true },
      component: () => import('@/views/MarkactsManage/newact'),
    },
    {
      path: 'updateact',
      name: 'updateact',
      hidden: true ,
      meta: { title: '修改活动',noCache: true },
      component: () => import('@/views/MarkactsManage/updateact'),
    },
		{
		  path: 'actview',
		  name:'actview',
			hidden: true ,
			meta: { title: '查看详情',noCache: true },
		  component: () => import('@/views/MarkactsManage/actview'),
		},
		{
		  path: 'Associatedgoods',
		  name:'Associatedgoods',
			hidden: true ,
			meta: { title: '关联商品',noCache: true },
		  component: () => import('@/views/MarkactsManage/Associatedgoods'),
		},
  ]
}
export default MarkactsRouter
