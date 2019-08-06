<template>
	<div class="app-container">
		<div class="filter-container">
			<el-select class="filter-item" v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
			<div class="filter-item el-input el-input--medium" style="width: 200px;">
				<el-input type="text" v-model="search" autocomplete="off" placeholder="请输入搜索内容" clearable></el-input>
			</div>
			<button type="button" @click="searchClick()" class="el-button filter-item el-button--primary el-button--medium">
			<i class="el-icon-search"></i>
			<span>搜索</span>
		</button>
			<el-button type="text" style="margin-left: 10px;float: right;color:#606266" @click="handleCreate">	
			<i class="el-icon-plus"></i>
			<span>添加</span>
		</el-button>
		</div>
		<!-- 表格 -->
		<el-table :data="list" fit highlight-current-row style="width: 100%;">
			<el-table-column label="栏目名称" prop="columnname" align="center">
			</el-table-column>
			<el-table-column label="栏目描述" prop="columndescribe" align="center" width="270">
			</el-table-column>
			<el-table-column label="栏目图片" prop="columnimg" align="center">
				<template slot-scope="scope">
					<img style="width:100px;height:100px;border-radius: 4px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559262470783&di=516462a284445cc1ef78d513e9a4080c&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2F5rfWhY25CmOABR4oeyH11Q%3D%3D%2F2830512365819902260.jpg" alt="" />
				</template>
			</el-table-column>
			<el-table-column label="关联商品数量" prop="goodsnum" align="center" width="160">
			</el-table-column>
			<el-table-column label="当前排序" prop="currentorder" align="center">
			</el-table-column>
			<el-table-column label="状态" prop="status" align="center" width='150'>
			</el-table-column>
			<el-table-column fixed="right" label="操作" align="center" width='120'>
				<template slot-scope="scope">
					<el-dropdown>
						<el-button type="primary" plain>
							操作菜单
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<span @click="viewCardList(scope.row)">关联商品</span>
							</el-dropdown-item>
							<el-dropdown-item>
								<span @click="handleModifyStatus(scope.row)">编辑栏目</span>
							</el-dropdown-item>
							<el-dropdown-item>
								<span @click="handleModifyStatus(scope.row)">商品维护</span>
							</el-dropdown-item>
							<el-dropdown-item>
								<span @click="dialogVisible = true">禁用</span>
							</el-dropdown-item>
							<el-dropdown-item>
								<span @click="viewCardList(scope.row)">详情</span>
							</el-dropdown-item>
							<el-dropdown-item>
								<span @click="handleDeleteStatus(scope.row)">删除</span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
		<!--删除确认框-->
		<el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
			<span>确认要删除吗？</span>
			<span slot="footer" class="dialog-footer">
						<el-button @click="deleteDialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="deleteBtn()">确 定</el-button>
					</span>
		</el-dialog>
		<el-dialog title="卡片挂失" :visible.sync="dialogVisible" width="30%">
			<span>是否挂失该卡?</span>
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
				//树图 是否全部打开
				defaultExpandAll: false,
				deleteRow: {},
				organName: '',
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
			getList() {
				this.listLoading = false;
				this.list = [];
					this.list=[{
						key:1,
						columnname: '就是名称',
						columndescribe:'商城默认页面展示栏目',
						columnimg:'',
						goodsnum:'0',
						currentorder:'1',
						status:'启用中'
					},{
						key:2,
						columnname: '现货商城',
						columndescribe:'存放在监管仓的商品展示栏目',
						columnimg:'',
						goodsnum:'56',
						currentorder:'2',
						status:'启用中'
					},{
						key:3,
						columnname: '物资商城',
						columndescribe:'普通仓库商品展示栏目',
						columnimg:'',
						goodsnum:'103',
						currentorder:'3',
						status:'禁用中'
					},{
						key:4,
						columnname: '就是名称',
						columndescribe:'商城默认页面展示栏目',
						columnimg:'',
						goodsnum:'0',
						currentorder:'1',
						status:'禁用中'
					},{
						key:5,
						columnname: '就是名称',
						columndescribe:'存放在监管仓的商品展示栏目',
						columnimg:'',
						goodsnum:'56',
						currentorder:'2',
						status:'禁用中'
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