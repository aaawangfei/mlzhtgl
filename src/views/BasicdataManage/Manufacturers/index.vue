<template>
	<div class="app-container">
		<div class="filter-container">
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
		<el-table v-loading="listLoading" :data="list" fit highlight-current-row class="tableWidth">
			<el-table-column label="序号" prop="key" align="center">
			</el-table-column>
			<el-table-column label="生产厂商名称" prop="Manufacturername" align="center">
			</el-table-column>
			<el-table-column label="联系人" prop="people" align="center">
			</el-table-column>
			<el-table-column label="联系电话" prop="phone" width="150" align="center">
			</el-table-column>
			<el-table-column label="创建时间" prop="Creationtime" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" align="center" width="218">
				<template slot-scope="scope">
					<span @click="handleUpdate(scope.row)" class="pointer">
			          		<el-tag>编辑</el-tag>
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
				<el-form-item label="生产厂商名称" prop="name">
					<el-input v-model="temp.name" placeholder="请输入生产厂商名称" />
				</el-form-item>
				<el-form-item label="联系人" prop="desc">
					<el-input v-model="temp.desc" placeholder='请输入联系人'/>
				</el-form-item>
				<el-form-item label="联系电话" prop="name" width="100">
					<el-input v-model="temp.name" placeholder='请输入联系电话'/>
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
				temp: {
					
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
						Manufacturername: '阿迪',
						people: '王大难',
						phone: '135698745632',
						Creationtime:'20190725 10:20:00',
					},
					{
						key:'2',
						Manufacturername: 'PUMA',
						people: '王大难',
						phone: '135698745632',
						Creationtime:'20190725 10:20:00',
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