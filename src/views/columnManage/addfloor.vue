<template>
	<div class="app-container">
		<el-form :model="organForm" :rules="rules" ref="organForm" label-width="100px">
			<el-form-item label="栏目类型" prop="displayMode">
			 <el-radio-group v-model="organForm.displayMode">
                <el-radio-button :label="0">一级楼层</el-radio-button>
                <el-radio-button :label="1">二级楼层</el-radio-button>
            </el-radio-group>
			</el-form-item>
			<div v-if="organForm.displayMode===0">
				<el-form-item label="楼层名称" prop="name">
					<el-input v-model="organForm.name" placeholder='请输入栏目名称'></el-input>
				</el-form-item>
				<el-form-item label="楼层描述" prop="desc">
					<el-input type="textarea" v-model="organForm.desc" placeholder='请输入栏目描述'></el-input>
				</el-form-item>
				<el-form-item label="楼层排序" prop="type">
					<el-select filterable v-model="organForm.type" placeholder="请选择栏目排序" @change="typeChange">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="楼层图片" prop="coverImage" ref="uploadElement">
					<div style="margin-top: 2px;" class="el-upload__tip">建议上传图片尺寸:220*140px或者按图片比例上传</div>
					<el-upload :headers="handleHeader" accept=".jpg,.png,pdf" action="http://39.97.232.120:9090/organizationService/image/uploadImg" :on-error="handleError" :file-list="fileList" list-type="picture-card" :on-success="handleResp" :on-exceed="exceed" :on-change="handlechange" :beforeUpload="beforeAvatarUpload" name="articleImage" style="width: 81.5%;" :limit="3" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="30%" :src="organForm.coverImage" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="展示风格" prop="style">
					<el-radio-group v-model="organForm.style">
						<el-radio :label="0">单行</el-radio>
						<el-radio :label="1">多行</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="" prop="pay">
					<el-radio-group v-model="organForm.pay">
						<el-radio :label="0">组合</el-radio>
						<el-radio :label="1">简单</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="是否滚动" prop="rolling">
					<el-radio-group v-model="organForm.rolling">
						<el-radio :label="0">是</el-radio>
						<el-radio :label="1">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="品牌推荐" prop="Brand">
					<el-radio-group v-model="organForm.Brand">
						<el-radio :label="0">要</el-radio>
						<el-radio :label="1">不要</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="热门产品推荐" prop="Popular">
					<el-radio-group v-model="organForm.Popular">
						<el-radio :label="0">要</el-radio>
						<el-radio :label="1">不要</el-radio>
					</el-radio-group>
				</el-form-item>
			</div>
			<div v-if="organForm.displayMode===1">
				<el-form-item label="上级楼层" prop="type">
					<el-select filterable v-model="organForm.type" placeholder="请选择上级栏目" @change="typeChange">
						<el-option v-for="item in optionsa" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="楼层名称" prop="name">
					<el-input v-model="organForm.name" placeholder='请输入栏目名称'></el-input>
				</el-form-item>
				<el-form-item label="楼层描述" prop="desc">
					<el-input type="textarea" v-model="organForm.desc" placeholder='请输入栏目描述'></el-input>
				</el-form-item>
				<el-form-item label="楼层排序" prop="type">
					<el-select filterable v-model="organForm.type" placeholder="请选择栏目排序" @change="typeChange">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="楼层图片" prop="coverImage" ref="uploadElement">
					<div style="margin-top: 2px;" class="el-upload__tip">建议上传图片尺寸:220*140px或者按图片比例上传</div>
					<el-upload :headers="handleHeader" accept=".jpg,.png,pdf" action="http://39.97.232.120:9090/organizationService/image/uploadImg" :on-error="handleError" :file-list="fileList" list-type="picture-card" :on-success="handleResp" :on-exceed="exceed" :on-change="handlechange" :beforeUpload="beforeAvatarUpload" name="articleImage" style="width: 81.5%;" :limit="3" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="30%" :src="organForm.coverImage" alt="">
					</el-dialog>
				</el-form-item>
			</div>
			<el-form-item>
				<el-button type="primary" @click="submitForm('organForm')">确认</el-button>
				<el-button @click="backForm()">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	var validateInput = (rule, value, callback) => {
		if(!checkSpecialKey(value)) {
			callback(new Error("不能含有特殊字符！！"));
		} else {
			callback();
		}
	};
	const organRules = {
		name: [{
			required: true,
			message: '请填写组织名称',
			trigger: 'blur'
		}, {
			min: 2,
			max: 20,
			message: '长度在 2 到 20 个字符',
			trigger: 'blur'
		}, {
			validator: validateInput,
			trigger: 'blur'
		}],
		typeId: [{
			required: true,
			message: '请选择组织类型',
			trigger: 'change'
		}],
		desc: [{
			required: true,
			message: '请填写职责描述',
			trigger: 'blur'
		}, {
			min: 2,
			max: 300,
			message: '长度在 2 到 300 个字符',
			trigger: 'blur'
		}],
		superior: [{
			required: true,
			message: '请选择上级组织',
			trigger: 'change'
		}],
	}
	export default {
		name: 'organ',
		data() {
			return {
				organForm: {
					name: '',
					typeId: '',
					desc: '',
					superior: '',
					displayMode: 0,
					style:0,
					pay:0,
				},
				organType: [],
				rules: organRules,
				data: [],
				currentSequence: '',
				pid: '',
				parentId: '',
				fileList: [],
				photourl: [],
				treeArrKey: '',
				defaultProps: {
					children: 'children',
					label: 'organizationName'
				},
				checkOragn: '',
				options: [{
					value: '1',
					label: '1'
				}, {
					value: '2',
					label: '2'
				}, {
					value: '3',
					label: '3'
				}, {
					value: '4',
					label: '4'
				}],
				optionsa: [{
					value: '1',
					label: '一级名称1'
				}, {
					value: '2',
					label: '一级名称2'
				}, {
					value: '3',
					label: '一级名称3'
				}],
				value: '',
			}
		},
		methods: {
			handleResp(res) {
				this.ruleForm.photourl.push(res.data);
			
			},
			handlechange(file, fileList) {
				this.ruleForm.coverImage = fileList;
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
			exceed(files, fileList) {
				this.$message("图片上传已超出限制个数!");
			},
			handleRemove(file, fileList) {
				this.ruleForm.photourl = _.without(this.ruleForm.photourl, file.response.data);
			
			},
			formInit() {
				//组织类型初始化
				this.organType = [];
				getAjax('/api/organizationService/organizationtype/list').then(data => {
					if(data.code == '0') {
						data.data.forEach(val => {
							this.organType.push({
								key: val.typeName,
								typeId: val.id
							})

						})
					}
				});

				var param = {
					type: '2',
					id: '0'
				}
				//上级组织初始化
				getAjax('/api/organizationService/organization/list', param).then(data => {
					if(data.code == '0') {
						this.data = covert(data.data, "0");
					} else {
						console.log('数据异常')
					}
				});
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var param = {
							type: '2',
							organizationName: this.organForm.name,
							organizationType: this.organForm.typeId,
							remarks: this.organForm.desc,
							hierarchy: this.organForm.superior,
							sequence: this.currentSequence,
							organizationId: this.pid,
							founder: sessionStorage.getterName,
						};
						postAjax('/api/organizationService/organization/insert', param).then(data => {
							if(data.code == '0') {
								this.$message('添加成功')
								this.$router.push({
									path: '/organizationManage/index',
								});
							} else {
								this.$message.error('添加失败');
							}
						});
					} else {
						console.log('请正确填写表单');
						return false;
					}
				});
			},
			backForm() {
				this.$router.go(-1)
			},
			handleNodeClick(data) {
				this.currentSequence = data.sequence;
				this.parentId = data.sequence.split('.');
				var len = this.parentId.length;
				if(this.parentId.length == 1) {
					this.pid = data.sequence;
				} else {
					this.pid = this.parentId[len - 1];
				}

				this.$refs.messageDrop.hide();
				this.organForm.superior = data.hierarchy;
				this.checkOragn = data.hierarchy;
			}
		},
		created() {
			this.formInit();
		}
	}
</script>
<style>
	.leaderOrgan .el-form-item__content {
		position: relative;
		margin-top: -35px!important;
	}
</style>
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
	.el-radio-group .el-radio {
		margin-right: 30px;
		margin-left: 0;
		margin-top: 3px;
	}
	
	.app-container {
		padding: 20px 150px;
	}
	
	.el-form {
		width: 640px;
		padding-top: 20px;
		margin: 0 auto;
	}
	
	.el-input,
	.el-radio-group,
	.el-select,
	.el-dropdown,
	.el-textarea,
	.el-cascader {
		width: 80%;
	}
	
	.selectBox {
		-webkit-appearance: none;
		background-color: #fff;
		background-image: none;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		color: #606266;
		display: inline-block;
		font-size: inherit;
		min-height: 40px;
		line-height: 40px;
		outline: 0;
		padding: 0 15px;
		-webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		width: 100%;
	}
	
	.selectBox>i {
		float: right;
		color: #c0c4cc;
		font-size: 14px;
		margin-top: 12px;
	}
</style>