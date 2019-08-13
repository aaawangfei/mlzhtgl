<template>
	<div class="app-container">
		<el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="个人账户" name="first">
				<div class="filter-container">
					<div class="filter-item el-input el-input--medium" style="width: 200px;">
						<el-input style="width:100%" type="text" v-model="search" autocomplete="off" placeholder="请输入搜索内容" clearable></el-input>
					</div>
					<button type="button" @click="searchClick()" class="el-button filter-item el-button--primary el-button--medium">
					<i class="el-icon-search"></i>
					<span>搜索</span>
				</button>
					<el-button type="text" style="margin-left: 10px;float: right;color:#606266" @click="dialogFormVisible = true">	
					<i class="el-icon-plus"></i>
					<span>添加</span>
				</el-button>
				</div>
				<el-table v-loading="listLoading" :data="lista" fit highlight-current-row class="tableWidth">
					<el-table-column label="序号" prop="key" align="center">
					</el-table-column>
					<el-table-column label="个人账号" prop="Personalacc" align="center">
					</el-table-column>
					<el-table-column label="个人账户名称" prop="Personname" align="center">
					</el-table-column>
					<el-table-column label="注册时间" prop="Regtime" width="150" align="center">
					</el-table-column>
					<el-table-column label="状态" prop="Perstatus" align="center">
					</el-table-column>
					<el-table-column fixed="right" label="操作" align="center" width="218">
						<template slot-scope="scope">
							<span @click="dialogFormVisibleb = true" class="pointer">
					          		<el-tag>重置密码</el-tag>
					          	</span>
							<span @click="dialogVisible = true" class="pointer">
							  		<el-tag type="success">禁用</el-tag>
							  	</span>		
							<span @click="handleDelete(scope.row)" class="pointer">
					            <el-tag type="danger">删除</el-tag>
						       </span>
						</template>
				
					</el-table-column>
				</el-table>
			    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getLista" />
			</el-tab-pane>
            <el-tab-pane label="企业账户" name="second">
				<div class="filter-container">
					<div class="filter-item el-input el-input--medium" style="width: 200px;">
						<el-input style="width:100%" type="text" v-model="search" autocomplete="off" placeholder="请输入搜索内容" clearable></el-input>
					</div>
					<button type="button" @click="searchClick()" class="el-button filter-item el-button--primary el-button--medium">
					<i class="el-icon-search"></i>
					<span>搜索</span>
				</button>
					<el-button type="text" style="margin-left: 10px;float: right;color:#606266" @click="dialogFormVisiblea = true">	
					<i class="el-icon-plus"></i>
					<span>添加</span>
				</el-button>
				</div>
				<el-table v-loading="listLoading" :data="listb" fit highlight-current-row class="tableWidth">
					<el-table-column label="序号" prop="key" align="center">
					</el-table-column>
					<el-table-column label="企业账户" prop="Corpaccount" align="center" width="120">
					</el-table-column>
					<el-table-column label="企业名称" prop="Corpname" align="center">
					</el-table-column>
					<el-table-column label="营业范围" prop="businessscope" width="150" align="center">
					</el-table-column>
					<el-table-column label="营业执照" prop="businesslicense" align="center" width="120">
						<template slot-scope="scope">
							<img style="width:100px;height:100px;border-radius: 4px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559262470783&di=516462a284445cc1ef78d513e9a4080c&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2F5rfWhY25CmOABR4oeyH11Q%3D%3D%2F2830512365819902260.jpg" alt="" />
						</template>
					</el-table-column>
					<el-table-column label="审核人" prop="reviewer" align="center">
					</el-table-column>
					<el-table-column label="时间" prop="time" width="150" align="center">
					</el-table-column>
					<el-table-column label="状态" prop="status" align="center">
					</el-table-column>
					<el-table-column fixed="right" label="操作" align="center" width="218">
						<template slot-scope="scope">
							<span @click="dialogFormVisiblec= true" class="pointer">
					          		<el-tag>重置密码</el-tag>
					          	</span>
							<span @click="dialogVisible = true" class="pointer">
							  		<el-tag type="success">禁用</el-tag>
							  	</span>		
							<span @click="handleDelete(scope.row)" class="pointer">
					            <el-tag type="danger">删除</el-tag>
						       </span>
						</template>
				
					</el-table-column>
				</el-table>
				<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListb" />				
			</el-tab-pane>
        </el-tabs>
		<!-- 禁用提示框 -->
		<el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
			<span>确定要删除吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="forbiddenDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteBtn">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="禁用" :visible.sync="dialogVisible" width="30%">
			<span>是否禁用?</span>
			<span slot="footer" class="dialog-footer">
		   <el-button @click="dialogVisible = false">取 消</el-button>
		   <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 添加个人账户 -->
		<el-dialog title="添加账户" :visible.sync="dialogFormVisible">
          <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
          <el-form-item label="个人账号" prop="Personalacc">
             <el-input v-model="temp.Personalacc" autocomplete="off" placeholder="请输入个人账号"></el-input>
          </el-form-item>
		  <el-form-item label="个人账户名称" prop="Personname">
		     <el-input v-model="temp.Personname" autocomplete="off" placeholder="请输入个人账户名称"></el-input>
		  </el-form-item>
		  <el-form-item label="账户密码" prop="password">
		     <el-input v-model="temp.password" autocomplete="off" placeholder="请输入账户密码"></el-input>
		  </el-form-item>
          </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
        </el-dialog>
		<!-- 添加企业账户 -->
        <el-dialog title="添加账户" :visible.sync="dialogFormVisiblea">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
                 <el-form-item label="企业账户" prop="name">
                 	<el-input v-model="temp.name" placeholder="请输入企业账户" />
                 </el-form-item>
				 <el-form-item label="企业名称" prop="name">
				 	<el-input v-model="temp.name" placeholder="请输入企业名称" />
				 </el-form-item>
				 <el-form-item label="账户密码" prop="password">
				 	<el-input v-model="temp.password" placeholder="请输入账户密码" />
				 </el-form-item>
				 <el-form-item label="营业范围" prop="name">
				 	<el-input type="textarea" v-model="temp.name" placeholder="请输入营业范围" />
				 </el-form-item>			 
                 <el-form-item label="营业执照" prop="coverImage" ref="uploadElement">
                 	<div style="margin-top: 2px;" class="el-upload__tip">建议上传图片尺寸:220*140px或者按图片比例上传</div>
                 	<el-upload accept=".jpg,.png,pdf" action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList" list-type="picture-card" :on-success="handleResp" :on-exceed="exceed" :on-change="handlechange" :beforeUpload="beforeAvatarUpload" name="articleImage" style="width: 508px;" :limit="1" :on-remove="handleRemove">
                 		<i class="el-icon-plus"></i>
                 	</el-upload>
                 	<el-dialog :visible.sync="dialogVisible">
                 		<img width="30%" :src="coverImage" alt="">
                 	</el-dialog>
                 </el-form-item>
            </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisiblea = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisiblea = false">确 定</el-button>
          </div>
        </el-dialog>
		<!-- 个人账户重置密码 -->
		<el-dialog title="重置密码" :visible.sync="dialogFormVisibleb">
		    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
		         <el-form-item label="新密码" prop="newpassword">
		         	<el-input v-model="temp.newpassword" placeholder="请输入新密码" />
		         </el-form-item>
		    </el-form>
		        <div slot="footer" class="dialog-footer">
		          <el-button @click="dialogFormVisibleb = false">取 消</el-button>
		          <el-button type="primary" @click="dialogFormVisibleb = false">确 定</el-button>
		  </div>
		</el-dialog>
		<!-- 企业账户重置密码 -->
		<el-dialog title="重置密码" :visible.sync="dialogFormVisiblec">
		    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
		         <el-form-item label="新密码" prop="newpassword">
		         	<el-input v-model="temp.newpassword" placeholder="请输入新密码" />
		         </el-form-item>
		    </el-form>
		        <div slot="footer" class="dialog-footer">
		          <el-button @click="dialogFormVisiblec = false">取 消</el-button>
		          <el-button type="primary" @click="dialogFormVisiblec = false">确 定</el-button>
		  </div>
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
				activeName: 'first',
				lista: null,
				listb: null,
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
				coverImage:'',
				fileList: [],
				dialogFormVisible: false,
				dialogFormVisiblea: false,
				dialogFormVisibleb: false,
				dialogFormVisiblec: false,
				deleteDialogVisible: false,
				listLoading: true,
				temp: {
					photourl: [],
				},
				rules:{
					newpassword: [{
							required: true,
							message: '新密码是必填项',
							trigger: 'blur'
							}],
					password: [{
							required: true,
							message: '账户密码是必填项',
							trigger: 'blur'
							}]		
				},
			}
		},
		created() {
			this.getLista();
			this.getListb();
		},
		methods: {
			searchClick() {

			},
			handleClick(tab, event) {
             console.log(tab, event);
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
			getLista() {
				this.listLoading = false;
				this.lista = [];
				this.lista = [{
					    key:'1',
						Personalacc: '13659756423',
						Personname:'有小雨',
						Regtime: '20190725 10:20:00',
						Perstatus: '启用中',
					},
					{
						key:'2',
						Personalacc: '13659756423',
						Personname:'小白',
						Regtime: '20190725 10:20:00',
						Perstatus: '启用中',
					}];
				this.total = 2;
			},
			getListb() {
				this.listLoading = false;
				this.listb = [];
				this.listb = [{
					    key:'1',
						Corpaccount: '13659756423',
						Corpname:'有小雨',
						businessscope: '营业范围介绍',
						businesslicense: '',
						reviewer:'有小雨',
						time:'20190725 10:20:00',
						status:'启用中'
					},
					{
						key:'2',
						Corpaccount: '13659756423',
						Corpname:'小白',
						businessscope: '营业范围介绍',
						businesslicense: '',
						reviewer:'小白',
						time:'20190725 10:20:00',
						status:'启用中'
					}];
				this.total = 2;
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