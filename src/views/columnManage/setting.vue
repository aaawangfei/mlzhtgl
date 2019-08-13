<template>
	<div class="app-container">
		<div class="filter-container">
		</button>
			<el-button type="text" style="margin-left: 10px;float: right;color:#606266" @click="handleCreate">	
			<i class="el-icon-plus"></i>
			<span>添加</span>
		</el-button>
		</div>
		<el-table v-loading="listLoading" :data="list" fit highlight-current-row class="tableWidth">
			<el-table-column label="序号" prop="key" align="center">
			</el-table-column>
			<el-table-column label="图片" prop="img" align="center">
				<template slot-scope="scope">
					<img style="width:100px;height:100px;border-radius: 4px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559262470783&di=516462a284445cc1ef78d513e9a4080c&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2F5rfWhY25CmOABR4oeyH11Q%3D%3D%2F2830512365819902260.jpg" alt="" />
				</template>
			</el-table-column>
			<el-table-column label="链接方式" prop="Linkway" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" align="center" width="218">
				<template slot-scope="scope">
					<span @click="handleUpdate(scope.row)" class="pointer">
			          		<el-tag>编辑</el-tag>
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
				<el-form-item label="图片" prop="coverImage" ref="uploadElement">
					<div style="margin-top: 2px;" class="el-upload__tip">建议上传图片尺寸:220*140px或者按图片比例上传</div>
					<el-upload accept=".jpg,.png,pdf" action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList" list-type="picture-card" :on-success="handleResp" :on-exceed="exceed" :on-change="handlechange" :beforeUpload="beforeAvatarUpload" name="articleImage" style="width: 306px;" :limit="3" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="30%" :src="coverImage" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="链接类型" prop="type">
					<el-select filterable v-model="temp.type" placeholder="请选择链接类型">
						<el-option v-for="item in optionsa" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="链接对象" prop="name">
					<el-input v-model="temp.name" placeholder='请输入链接对象'></el-input>
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
				dialogFormVisible: false,
				coverImage:'',
				dialogVisible: false,
				deleteDialogVisible: false,
				listLoading: true,
				fileList: [],
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
				optionsa: [{
				  value: '请选择商品类型',
				  label: '请选择商品类型'
				  }, {
				  value: '商品',
				  label: '商品'
				  }, {
				  value: '链接',
				  label: '链接'
				  }],
				temp: {
					Brand:0,
					photourl: [],
				},
				rules:{
					name: [{
							required: true,
							message: '链接对象是必填项',
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
						img:'',
						Linkway: '轮播图位置',
					},
					{
					   key:'2',
					   img:'',
					   Linkway: '轮播图位置',
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
					path: '/columnManage/imgsetting'
				});
			},
			handleResp(res) {
			       this.temp.photourl.push(res.data);
			   
			},
			    handlechange(file, fileList) {
			       this.coverImage = fileList;
			         if(fileList) {
			       this.$refs['uploadElement'].clearValidate();
			}
			},
			    beforeAvatarUpload(file) {
			    	var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
			    	const extension = testmsg === 'jpg'
			    	const extension2 = testmsg === 'png'
			    	const isLt2M = file.size / 1024 / 1024 < 10
			    	if(!extension && !extension2) {
			    		this.$message({
			    			message: '上传文件只能是 jpg、png格式!',
			    			type: 'warning'
			    		});
			    	}
			    	if(!isLt2M) {
			    		this.$message({
			    			message: '上传文件大小不能超过 10MB!',
			    			type: 'warning'
			    		});
			    	}
			    	return extension || extension2 && isLt2M
			},
			    handleRemove(file, fileList) {
			       this.temp.photourl = _.without(this.temp.photourl, file.response.data);
			},
			    exceed(files, fileList) {
			       this.$message("图片上传已超出限制个数!");
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
	.el-upload-list--picture-card .el-upload-list__item,
	.el-upload--picture-card {
		width: 31.33%;
		height: auto;
		margin: 0 2% 2% 0;
	}
	img {
    vertical-align: middle;
    }
</style>
<style scoped>
	.el-input,
	.el-radio-group,
	.el-select,
	.el-dropdown,
	.el-textarea,
	.el-cascader {
		width: 300px;
	}
	.pagination-container {
		text-align: center;
		margin-top: 0px;
		display: block;
	}
</style>