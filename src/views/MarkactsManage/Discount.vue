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
			<span>添加活动</span>
		</el-button>
		</div>
		<!-- 表格 -->
		<el-table :data="list" fit highlight-current-row style="width: 100%;">
			<el-table-column label="序号" prop="key" align="center">
			</el-table-column>
			<el-table-column label="活动庙城" prop="columnname" align="center">
			</el-table-column>
			<el-table-column label="活动描述" prop="columndescribe" align="center" width="150">
			</el-table-column>
			<el-table-column label="活动商品数量" prop="columnimg" align="center" width="120">
			</el-table-column>
			<el-table-column label="活动时间" prop="goodsnum" align="center" width="168">
			</el-table-column>
			<el-table-column label="创建时间" prop="currentorder" align="center" width="160">
			</el-table-column>
			<el-table-column label="活动状态" prop="status" align="center" width='150'>
			</el-table-column>
			<el-table-column fixed="right" label="操作" align="center" width='120'>
				<template slot-scope="scope">
					<el-dropdown>
						<el-button type="primary" plain>
							操作菜单
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
							<span @click="handleRelatedStatus(scope.row)">关联商品</span>
							</el-dropdown-item>
							<el-dropdown-item>
								<span @click="handleModifyStatus(scope.row)">修改活动</span>
							</el-dropdown-item>
							<el-dropdown-item>
								<span @click="dialogVisible = true">停止</span>
							</el-dropdown-item>
							<el-dropdown-item>
								<span @click="viewCardList(scope.row)">查看</span>
							</el-dropdown-item>
							<el-dropdown-item>
								<span @click="deleteOrganList(scope.row)">删除</span>
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
		<el-dialog title="停止活动" :visible.sync="dialogVisible" width="30%">
			<span>活动正在进行中，停止可能造成用户疑问，确定停止吗?</span>
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
				search: "",
				columns: tableHeader,
				//删除确认
				deleteDialogVisible: false,
				//树图 是否全部打开
				defaultExpandAll: false,
				dialogVisible:false,
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
					path: '/MarkactsManage/newact'
				})
			},
			handleRelatedStatus() {
				this.$router.push({
					path: '/MarkactsManage/Associatedgoods'
				})
			},
			getList() {
				this.listLoading = false;
				this.list = [];
					this.list=[{
						key:1,
						columnname: '全场8折',
						columndescribe:'这是一段活动描述',
						columnimg:'10',
						goodsnum:'20190726 — 20190727 活动持续24小时',
						currentorder:'20190725  10:20:00',
						status:'未开始'
					},{
						key:2,
						columnname: '全场8折',
						columndescribe:'这是一段活动描述',
						columnimg:'10',
						goodsnum:'20190726 — 20190727 活动持续24小时',
						currentorder:'20190725  10:20:00',
						status:'未开始'
					},{
						key:3,
						columnname: '全场8折',
						columndescribe:'这是一段活动描述',
						columnimg:'10',
						goodsnum:'20190726 — 20190727 活动持续24小时',
						currentorder:'20190725  10:20:00',
						status:'未开始'
					},{
						key:4,
						columnname: '全场8折',
						columndescribe:'这是一段活动描述',
						columnimg:'10',
						goodsnum:'20190726 — 20190727 活动持续24小时',
						currentorder:'20190725  10:20:00',
						status:'未开始'
					},{
						key:5,
						columnname: '全场8折',
						columndescribe:'这是一段活动描述',
						columnimg:'10',
						goodsnum:'20190726 — 20190727 活动持续24小时',
						currentorder:'20190725  10:20:00',
						status:'未开始'
					}];
				this.total = 6;
			},
			//修改
			handleModifyStatus(row) {
				sessionStorage.formInit = row.id;
				this.$router.push({
					id: sessionStorage.formInit,
					path: '/MarkactsManage/updateact'
				});
			},
			//查看
			viewCardList(row) {
				sessionStorage.viewCardType=row.type=="外部"
				this.$router.push({
					path: '/MarkactsManage/actview'
				})
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