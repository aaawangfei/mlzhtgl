<template>
	<div class="app-container">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-row>
				<el-col :span="24">
					<el-form-item label="栏目名称：" prop="name">
						{{formInline.lmname}}
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="栏目描述：">
						{{formInline.lmdescription}}
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="栏目排序：">
						{{formInline.lmsorting}}
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="栏目图片：">
						<img style="width:100px;height:100px;border-radius: 4px;" :src="photo" alt="" />
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<hr style="background: gainsboro;height: 1px;border: 0;">
		<div class="info-container" style="margin-top:20px;margin-bottom:10px;">
				关联商品数量：<span style="color: red;">1506</span>
			</div>
		<el-table v-loading="listLoading" :data="list" fit highlight-current-row class="tableWidth">
			<el-table-column label="序号" prop="key" align="center">
			</el-table-column>
			<el-table-column prop="goodscoding" label="商品编码" align="center">
			</el-table-column>
			<el-table-column prop="goodsname" label="商品名称" align="center" width="180">
			</el-table-column>
			<el-table-column prop="goodsimg" label="商品图片" align="center">
						  <template slot-scope="scope">
						  	<img style="width:100px;height:100px;border-radius: 4px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559262470783&di=516462a284445cc1ef78d513e9a4080c&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2F5rfWhY25CmOABR4oeyH11Q%3D%3D%2F2830512365819902260.jpg" alt="" />
						  </template>
			</el-table-column>
			<el-table-column prop="specifications" label="规格" align="center" width="120">
			</el-table-column>
			<el-table-column prop="price" label="价格（元）" align="center">
			</el-table-column>
			<el-table-column prop="inventory" label="库存" align="center">
			</el-table-column>
			<el-table-column prop="manufacturer" label="生产厂家" show-overflow-tooltip align="center">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formInline: {
					name: "",
				},
				cardType:false,
				listLoading:false,
				list:[],
				photo:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559262470783&di=516462a284445cc1ef78d513e9a4080c&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2F5rfWhY25CmOABR4oeyH11Q%3D%3D%2F2830512365819902260.jpg',				
			}
		},
		created() {
			console.log(sessionStorage.viewCardType);
			this.cardType=sessionStorage.viewCardType;
				this.formInline = {
				lmname: "现货商城",
				lmdescription:'我只是一段简单的栏目描述信息，没有的话显示为空',
				lmsorting:"2",
			}
			
			this.list=[
			  {
				key:'1',  
			  	goodscoding: '347887544',
			  	goodsname:'花键轴  CON0328-020A',
			  	goodsimg:'',
			  	specifications:'CON0328-020A',
			  	price:'2010',
			  	inventory:'200',
			  	manufacturer:'西安重装配套技术服务有限公司'
			  },
			  {
			  	key:'2',  
			  	goodscoding: '347887544',
			  	goodsname:'花键轴  CON0328-020A',
			  	goodsimg:'',
			  	specifications:'CON0328-020A',
			  	price:'2010',
			  	inventory:'200',
			  	manufacturer:'西安重装配套技术服务有限公司'
			  },
			 ]
		},
		methods:{
			payList(){
				this.$router.push({
					path: '/cardManage/pay'
				})
			},
			rechargeList(){
				this.$router.push({
					path: '/topupManage/look'
				})
			}
		}
	}
</script>

<style scoped>
	.info-container{
		font-size:18px;
		color:#222;
		font-weight: 500;
		line-height:25px;
	}
.el-form-item{
	margin-bottom: 0;
}
.cursor{
	cursor: pointer;
}
.cursor:hover{
	color:#3399FF;
}
</style>