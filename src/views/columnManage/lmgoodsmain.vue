<template>
	<div class="app-container">
		<div class="filter-container">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<label style="color:#303133;margin-right: 30px;">筛选搜索</label>
				<label style="color:#606266;">商品编码:</label>
				<div class="filter-item el-input el-input--medium" style="width: 150px;margin-bottom: 20px;margin-top: 20px;">
					<el-input type="text" clearable v-model="content" autocomplete="off" placeholder="请输入商品编码"></el-input>
				</div>
				<label style="color:#606266;margin-left: 30px;">商品名称:</label>
				<div class="filter-item el-input el-input--medium" style="width: 150px;margin-bottom: 20px;margin-top: 20px;">
					<el-input type="text" clearable v-model="content" autocomplete="off" placeholder="请输入商品名称"></el-input>
				</div>
				<label style="color:#606266;margin-left: 30px;">商品规格:</label>
				<div class="filter-item el-input el-input--medium" style="width: 150px;margin-bottom: 20px;margin-top: 20px;">
					<el-input type="text" clearable v-model="content" autocomplete="off" placeholder="请输入商品规格"></el-input>
				</div>
				<el-button type="primary" icon="el-icon-search" @click="searchContent()">
					搜索
				</el-button>
				<br />
				<el-button style="float: left;margin-bottom: 20px;" type="primary" icon="el-icon-delete" @click="dialogVisible = true">
					批量移除
				</el-button>
				<el-button style="float: left;margin-bottom: 20px;" type="primary" icon="el-icon-bell" @click="searchContent()">
					批量置顶
				</el-button>
			</el-form>
		</div>
		<!-- 表格 -->
		<el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
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
		  <el-table-column fixed="right" label="操作" align="center" width='120'>
		  	<template slot-scope="scope">
		  		<el-dropdown>
		  			<el-button type="primary" plain>
		  				操作菜单
		  			</el-button>
					<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>
						<span @click="deleteOrganList(scope.row)">移除</span>
					</el-dropdown-item>
		  				<el-dropdown-item>
		  					<span>置顶</span>
		  				</el-dropdown-item>
						</el-dropdown-menu>
		  		</el-dropdown>
		  	</template>
		  </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
		<!--删除确认框-->
		<el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
			<span>确认要移除吗？</span>
			<span slot="footer" class="dialog-footer">
						<el-button @click="deleteDialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="deleteBtn()">确 定</el-button>
					</span>
		</el-dialog>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>是否批量移除?</span>
			<span slot="footer" class="dialog-footer">
		   <el-button @click="dialogVisible = false">取 消</el-button>
		   <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import treeTable from '@/components/TreeTable'
	import Pagination from '@/components/Pagination'
	const tableHeader = [{
			label: '栏目名称',
			key: 'columnname',
			expand: true,
			align: 'center'
		},
		{
			label: '栏目描述',
			key: 'columndescribe',
		},
		{
			label: '栏目图片',
			key: 'columnimg',
		},
		{
			label: '关联商品数量',
			key: 'goodsnum',
		},
		{
			label: '当前排序',
			key: 'currentorder',
		},
		{
			label: '状态',
			key: 'status'
		},
	];
	export default {
		name: 'organizationList',
		components: {
			treeTable,
			Pagination
		},
		data() {
			return {
				data: [],
				loading:false,
				columns: tableHeader,
				//删除确认
				deleteDialogVisible: false,
				dialogVisible:false,
				//树图 是否全部打开
				defaultExpandAll: false,
				deleteRow: {},
				organName: '',
				multipleSelection: [],
				options: [{
                  value: '状态',
                  label: '状态'
                  }, {
                  value: '选项2',
                  label: '启用中'
                  }, {
                  value: '选项3',
                  label: '禁用中'
                  }],
                  value: '状态',
				  total: 0,
				  list: null,
				  listQuery: {
				  	page: 1,
				  	limit: 10
				  },
			      }
		}, 
		created() {
			this.getList()
		},

		methods: {
			handleCreate() {
				this.$router.push({
					path: '/columnManage/newcolumn'
				})
			},
			handleSelectionChange(val) {
                this.multipleSelection = val;
            },
			getList() {
				this.listLoading = false;
				this.list = [];
					this.list=[{
						goodscoding: '347887544',
						goodsname:'花键轴  CON0328-020A',
						goodsimg:'',
						specifications:'CON0328-020A',
						price:'2010',
						inventory:'200',
						manufacturer:'西安重装配套技术服务有限公司'
					},{
						goodscoding: '347887544',
						goodsname:'花键轴  CON0328-020A',
						goodsimg:'',
						specifications:'CON0328-020A',
						price:'2010',
						inventory:'200',
						manufacturer:'西安重装配套技术服务有限公司'
					},{
						goodscoding: '347887544',
						goodsname:'花键轴  CON0328-020A',
						goodsimg:'',
						specifications:'CON0328-020A',
						price:'2010',
						inventory:'200',
						manufacturer:'西安重装配套技术服务有限公司'
					},{
						goodscoding: '347887544',
						goodsname:'花键轴  CON0328-020A',
						goodsimg:'',
						specifications:'CON0328-020A',
						price:'2010',
						inventory:'200',
						manufacturer:'西安重装配套技术服务有限公司'
					},{
						goodscoding: '347887544',
						goodsname:'花键轴  CON0328-020A',
						goodsimg:'',
						specifications:'CON0328-020A',
						price:'2010',
						inventory:'200',
						manufacturer:'西安重装配套技术服务有限公司'
					}];
				this.total = 6;
			},
			//修改
			handleModifyStatus(row) {
				sessionStorage.formInit = row.id;
				this.$router.push({
					id: sessionStorage.formInit,
					path: '/columnManage/updatecolumnList'
				});
			},
			//删除确认
			deleteOrganList(row) {
				this.deleteDialogVisible = true;
				this.deleteRow = row;
			},
			//删除确定
			deleteBtn() {
				var param = {
					id: this.deleteRow.id,
				}
				postAjax('/api/organizationService/organization/delete', param).then(data => {
					if(data.code == "0") {
						this.$message('删除成功');
						this.deleteDialogVisible = false;
						this.getList();
					} else {
						this.$message('删除失败');
						this.deleteDialogVisible = false;
					}
				});
			},
		}
	}
</script>
<style scoped>
	.el-form-item {
		float: left;
		margin-right: 10px;
	}
	
	.addType {
		color: #606266;
		float: right;
	}
	.pagination-container {
		text-align: center;
		margin-top: 0px;
	}
</style>