<template>
	<div class="app-container">
		<div class="filter-container">
			<div class="filter-item el-input el-input--medium" style="width: 200px;">
				<el-input style="width:100%" type="text" v-model="search" autocomplete="off" placeholder="请输入搜索内容" clearable></el-input>
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
			<el-table-column label="品牌名称" prop="name" align="center">
			</el-table-column>
			<el-table-column label="品牌logo" prop="img" align="center">
				<template slot-scope="scope">
					<img style="width:100px;height:100px;border-radius: 4px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559262470783&di=516462a284445cc1ef78d513e9a4080c&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2F5rfWhY25CmOABR4oeyH11Q%3D%3D%2F2830512365819902260.jpg" alt="" />
				</template>
			</el-table-column>
			<el-table-column label="生产厂商" prop="Manufacturers" width="150" align="center">
			</el-table-column>
			<el-table-column label="创建时间" prop="Creatime" align="center">
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
			<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="97px" style="width: 600px;">
				<el-form-item label="品牌名称" prop="name">
					<el-input v-model="temp.name" placeholder="请输入品牌名称" />
				</el-form-item>
				<el-form-item label="品牌LOGO" prop="coverImage" ref="uploadElement">
					<div style="margin-top: 2px;" class="el-upload__tip">建议上传图片尺寸:220*140px或者按图片比例上传</div>
					<el-upload accept=".jpg,.png,pdf" action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList" list-type="picture-card" :on-success="handleResp" :on-exceed="exceed" :on-change="handlechange" :beforeUpload="beforeAvatarUpload" name="articleImage" style="width: 508px;" :limit="1" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="30%" :src="temp.coverImage" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item style="width:600px" label="生产厂商列表" prop="desc">
				<el-transfer filterable filter-placeholder="请输入生产厂商名称" v-model="value" :data="data"></el-transfer>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
			</div>
		</el-dialog>
		<!-- 禁用提示框 -->
		<el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
			<span>确定要删除该品牌吗？</span>
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
			const generateData = _ => {
			  const data = [];
			  for (let i = 1; i <= 15; i++) {
			    data.push({
			      key: i,
			      label: `国中生产 ${ i }`,
			    });
			  }
			  return data;
			};
			return {
				search: "",
				list: null,
				data: generateData(),
				value: [1, 4],
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
				fileList: [],
				coverImage:'',
				dialogFormVisible: false,
				deleteDialogVisible: false,
				listLoading: true,
				temp: {
					photourl: [],
				},
				rules:{
					name: [{
							required: true,
							message: '品牌名称是必填项',
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
			getList() {
				this.listLoading = false;
				this.list = [];
				this.list = [{
					    key:'1',
						name: '阿迪',
						img:'',
						Manufacturers: '宜家生产、哀家生产',
						Creatime: '20190725  10:20:00',
					},
					{
						key:'2',
						name: '阿迪',
						img:'',
						Manufacturers: '宜家生产、哀家生产',
						Creatime: '20190725  10:20:00',
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
<style scoped>
    .pagination-container {
		text-align: center;
		margin-top: 0px;
		display: block;
	}
	img {
	vertical-align: middle;
	}
	.el-input,
	.el-radio-group,
	.el-select,
	.el-dropdown,
	.el-textarea,
	.el-cascader {
		width: 400px;
	}
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