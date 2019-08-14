<template>
	<div class="app-container">
		<el-form :model="organForm" :rules="rules" ref="organForm" label-width="100px">
			<el-row>
				<el-col :span="24">
				<el-form-item style="margin-bottom: 10px;" label="信息类型" prop="style">
					<el-radio-group v-model="organForm.style">
						<el-radio :label="0">求租</el-radio>
						<el-radio :label="1">求购</el-radio>
					</el-radio-group>
				</el-form-item>
				</el-col>
				<div style="background-color: #F2F6FC;width: 900px;height: auto;display: inline-block;padding-top: 25px;">
				<el-col :span="10">
				<el-form-item label="型号" prop="name">
					<el-input v-model="organForm.name" placeholder='请输入型号'></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="设备名称" prop="desc">
					<el-input v-model="organForm.name" placeholder='请输入设备名称'></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="10">
				<el-form-item label="数量" prop="name">
					<el-input v-model="organForm.name" placeholder='请输入数量'></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="技术要求" prop="desc">
					<el-input v-model="organForm.name" placeholder='请输入技术要求'></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="10">
				<el-form-item label="分类" prop="name">
					<el-input v-model="organForm.name" placeholder='请输入分类'></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="生产厂家" prop="desc">
					<el-input v-model="organForm.name" placeholder='请输入生产厂家'></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="10">
				<el-form-item label="设备需求地" prop="name">
					<el-input v-model="organForm.name" placeholder='请输入设备需求地'></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="24">
				<el-form-item label="详细说明" prop="desc">
					<el-input type="textarea" v-model="organForm.desc" placeholder='请输入详细说明'></el-input>
				</el-form-item>
				</el-col>
				</div>
				<el-col :span="24">
				<div class="info-container">
					您的联系方式
				</div>
				</el-col>
				<div style="background-color: #F2F6FC;width: 900px;height: auto;display: inline-block;padding-top: 25px;">
				<el-col :span="10">
				<el-form-item label="联系人" prop="name">
					<el-input v-model="organForm.name" placeholder='请输入联系人'></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="手机号码" prop="desc">
					<el-input v-model="organForm.name" placeholder='请输入手机号码'></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="10">
				<el-form-item label="公司名称" prop="name">
					<el-input v-model="organForm.name" placeholder='请输入公司名称'></el-input>
				</el-form-item>
				</el-col>
				</div>
				<el-col :span="24">
			    <el-form-item style="margin-top: 20px;">
				<el-button type="primary" @click="submitForm('organForm')">确认</el-button>
				<el-button @click="backForm()">取消</el-button>
			    </el-form-item>
			   </el-col>
			</el-row>
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
					coverImage: '',
					desc: '',
					superior: '',
					style:0,
					displayMode: 0,
				},
				organType: [],
				rules: organRules,
				data: [],
				currentSequence: '',
				pid: '',
				parentId: '',
				dialogVisible:false,
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
					label: '一级栏目名称1'
				}, {
					value: '2',
					label: '一级栏目名称2'
				}, {
					value: '3',
					label: '一级栏目名称3'
				}],
				value: '',
			}
		},
		methods: {
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
	.info-container {
		margin: 20px 0px 20px;
		font-size: 16px;
		color: #606266;
		font-weight: bold;
	}
	.el-radio-group .el-radio {
		margin-right: 30px;
		margin-left: 0;
		margin-top: 3px;
	}
	
	.app-container {
		padding: 20px 150px;
	}
	
	.el-form {
		width: 900px;
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