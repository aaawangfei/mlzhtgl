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
			<span>添加banner</span>
		</el-button>
		</div>
		<el-table v-loading="listLoading" :data="list" fit highlight-current-row class="tableWidth">
			<el-table-column label="序号" prop="key" align="center">
			</el-table-column>
			<el-table-column label="banner名称" prop="bannername" align="center">
			</el-table-column>
			<el-table-column label="位置描述" prop="Podescription" align="center">
			</el-table-column>
			<el-table-column label="轮播间隔时间（秒）" prop="banners" width="150" align="center">
			</el-table-column>
			<el-table-column label="关联位置" prop="Relatedposition" align="center">
			</el-table-column>
			<el-table-column label="栏目图片" prop="img" align="center">
				<template slot-scope="scope">
					<img style="width:100px;height:100px;border-radius: 4px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559262470783&di=516462a284445cc1ef78d513e9a4080c&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2F5rfWhY25CmOABR4oeyH11Q%3D%3D%2F2830512365819902260.jpg" alt="" />
				</template>
			</el-table-column>
			<el-table-column label="状态" prop="status" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" align="center" width="218">
				<template slot-scope="scope">
					<span @click="handleUpdate(scope.row)" class="pointer">
			          		<el-tag>编辑</el-tag>
			          	</span>
					<span @click="dialogVisible = true" class="pointer">
					  		<el-tag type="success">禁用</el-tag>
					  	</span>
					<span @click="handleModifyStatus(scope.row)" class="pointer">
					  		<el-tag>设置</el-tag>
					  	</span>		
					<span @click="handleDelete(scope.row)" class="pointer">
			                <el-tag type="danger">删除</el-tag>
				       </span>
				</template>

			</el-table-column>
		</el-table>

		<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
				<el-form-item label="banner名称" prop="bannername">
					<el-input v-model="temp.bannername" placeholder="请输入banner名称" />
				</el-form-item>
				<el-form-item label="位置描述" prop="Podescription">
					<el-input type="textarea" v-model="temp.Podescription" placeholder='请输入位置描述'></el-input>
				</el-form-item>
				<el-form-item label="轮播间隔时间" prop="banners" width="100">
					<el-input style="width:30%" v-model="temp.banners" placeholder='请输入'></el-input><span style="margin-left: 5px;">秒</span>
				</el-form-item>
				<el-form-item label="关联" prop="Brand">
					<el-radio-group v-model="temp.Brand">
						<el-radio :label="0">首页</el-radio>
						<el-radio :label="1">栏目</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
			</div>
		</el-dialog>
		<!-- 禁用提示框 -->
		<el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
			<span>确定要删除吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="forbiddenDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteBtn">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="禁用" :visible.sync="dialogVisible" width="30%">
			<span>是否禁用banner?</span>
			<span slot="footer" class="dialog-footer">
		   <el-button @click="dialogVisible = false">取 消</el-button>
		   <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import Pagination from '@/components/Pagination'
	export default {
		components: {
			Pagination
		},
		data() {
			return {
				search: "",
				list: null,
				total: 0,
				listQuery: {
					page: 1,
					limit: 10
				},
				textMap: {
					update: '修改',
					create: '添加'
				},
				dialogStatus: "",
				dialogVisible: false,
				dialogFormVisible: false,
				deleteDialogVisible: false,
				listLoading: true,
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
				temp: {
					Brand:0,
				},
				rules:{
					bannername: [{
							required: true,
							message: 'banner名称是必填项',
							trigger: 'blur'
							}],		
				},
			}
		},
		created() {
			this.getList();
		},
		methods: {
			searchClick() {

			},
			getList() {
				this.listLoading = false;
				this.list = [];
				this.list = [{
					    key:'1',
						bannername: '首页轮播图',
						Podescription: '轮播图位置',
						banners: '1',
						Relatedposition:'栏目名称',
						img:'',
						status:'启用中'
					},
					{
						    key:'2',
							bannername: '首页轮播图',
							Podescription: '轮播图位置',
							banners: '2',
							Relatedposition:'栏目名称',
							img:'',
							status:'禁用中'
					}];
				this.total = 2;
			},
			handleCreate() {
				this.temp = {};
				this.dialogStatus = 'create'
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			createData() {
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {

					}
				});
			},
			handleUpdate(row) {
				this.temp = Object.assign({}, row)
				this.dialogStatus = 'update';
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			updateData() {
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {

					}
				});
			},
			//设置
			handleModifyStatus(row) {
				sessionStorage.formInit = row.id;
				this.$router.push({
					id: sessionStorage.formInit,
					path: '/columnManage/setting'
				});
			},
			handleDelete(row) {
				this.deleteDialogVisible = true;
			},
			deleteBtn() {
				this.deleteDialogVisible = false;
			}
		}
	}
</script>

<style>
.pagination-container {
		text-align: center;
		margin-top: 0px;
		display: block;
	}
</style>