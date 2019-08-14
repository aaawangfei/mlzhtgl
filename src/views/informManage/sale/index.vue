<template>
	<div class="app-container">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<div class="filter-container">
				<el-select class="filter-item" v-model="value" placeholder="请选择信息类型">
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
            <el-tab-pane label="全部" name="first">
				<el-table v-loading="listLoading" :data="lista" fit highlight-current-row class="tableWidth">
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
					<el-table-column label="状态" prop="status" align="center">
					</el-table-column>
					<el-table-column fixed="right" label="操作" align="center" width="218">
						<template slot-scope="scope">
							<span @click="dialogFormVisibleb = true" class="pointer">
					          		<el-tag>审核</el-tag>
					          	</span>	
							<span @click="dialogFormVisiblea = true" class="pointer">
					            <el-tag type="danger">详情</el-tag>
						       </span>
							<span @click="dialogFormVisiblea = true" class="pointer">
							    <el-tag>编辑</el-tag>
							   </span>   
						</template>
				
					</el-table-column>
				</el-table>
			    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getLista" />
			</el-tab-pane>
            <el-tab-pane label="待审核" name="second">
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
					<el-table-column label="申请时间" prop="time" width="150" align="center">
					</el-table-column>
					<el-table-column label="状态" prop="status" align="center">
					</el-table-column>
					<el-table-column fixed="right" label="操作" align="center" width="218">
						<template slot-scope="scope">
							<span @click="dialogFormVisibleb = true" class="pointer">
							  		<el-tag>审核</el-tag>
							  	</span>
							<span @click="dialogFormVisibleb = true" class="pointer">
							  		<el-tag>编辑</el-tag>
							  	</span>	
						</template>
				
					</el-table-column>
				</el-table>
				<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListb" />				
			</el-tab-pane>
            <el-tab-pane label="已通过" name="third">
                <el-table v-loading="listLoading" :data="listc" fit highlight-current-row class="tableWidth">
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
                			<el-table-column label="拒绝时间" prop="time" width="150" align="center">
                			</el-table-column>
                			<el-table-column label="状态" prop="status" align="center">
                			</el-table-column>
                			<el-table-column fixed="right" label="操作" align="center" width="218">
                				<template slot-scope="scope">
                					<span @click="dialogFormVisiblea = true" class="pointer">
                					    <el-tag type="danger">详情</el-tag>
                					   </span>
									<span @click="dialogFormVisiblea = true" class="pointer">
									    <el-tag type="success">置顶</el-tag>
									   </span>
									<span @click="deleteOrganList(scope.row)" class="pointer">
									    <el-tag type="danger">删除</el-tag>
									   </span>	  
                				</template>
                		
                			</el-table-column>
                		</el-table>
                <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListc" />				
            </el-tab-pane>
			<el-tab-pane label="已拒绝" name="fourth">
            	<el-table v-loading="listLoading" :data="listd" fit highlight-current-row class="tableWidth">
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
            			<el-table-column label="拒绝时间" prop="time" width="150" align="center">
            			</el-table-column>
            			<el-table-column label="状态" prop="status" align="center">
            			</el-table-column>
            			<el-table-column fixed="right" label="操作" align="center" width="218">
            				<template slot-scope="scope">
            					<span @click="dialogFormVisiblea = true" class="pointer">
            					    <el-tag type="danger">详情</el-tag>
            					   </span>
            				</template>
            		
            			</el-table-column>
            		</el-table>
            	<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getListd" />				
            </el-tab-pane>
		</el-tabs>
		<!-- 详情 -->
		<el-dialog title="详情" :visible.sync="dialogFormVisiblea">
          <el-form ref="dataForm" :model="formInline" label-position="left" label-width="100px" style="margin-left:50px;">
          	<el-row>
          		<el-col :span="10">
          			<el-form-item label="拒绝原因：">
          				{{formInline.floorname}}
          			</el-form-item>
          		</el-col>
          		<el-col :span="12">
          			<el-form-item label="拒绝时间：">
          				{{formInline.floorstyle}}
          			</el-form-item>
          		</el-col>
          		<el-col :span="10">
          			<el-form-item label="企业账号：">
          				{{formInline.floordescription}}
          			</el-form-item>
          		</el-col>
          		<el-col :span="12">
          			<el-form-item label="审核人：">
          				{{formInline.roll}}
          			</el-form-item>
          		</el-col>
          		<el-col :span="24">
          			<el-form-item label="企业名称：">
          				{{formInline.sorting}}
          			</el-form-item>
          		</el-col>
          		<el-col :span="24">
          			<el-form-item label="营业范围：" style="width:100%;word-wrap:break-word;height: auto;">
          				{{formInline.Brand}}
          			</el-form-item>
          		</el-col>
          		<el-col :span="24">
          			<el-form-item label="营业执照：">
          				<img style="width:100px;height:100px;border-radius: 4px;" :src="photo" alt="" />
          			</el-form-item>
          		</el-col>
          	</el-row>
          </el-form>
        </el-dialog>
		<!-- 审核 -->
		<el-dialog title="审核" :visible.sync="dialogFormVisibleb">
		    <el-form ref="dataForm" :model="formInline" label-position="left" label-width="100px" style="margin-left:50px;">
		         <el-row>	
		         	<el-col :span="10">
		         		<el-form-item label="企业账号：">
		         			{{formInline.floordescription}}
		         		</el-form-item>
		         	</el-col>
					<el-col :span="12">
						<el-form-item label="申请时间：">
							{{formInline.floorstyle}}
						</el-form-item>
					</el-col>
		         	<el-col :span="24">
		         		<el-form-item label="企业名称：">
		         			{{formInline.sorting}}
		         		</el-form-item>
		         	</el-col>
		         	<el-col :span="24">
		         		<el-form-item label="营业范围：" style="width:100%;word-wrap:break-word;height: auto;">
		         			{{formInline.Brand}}
		         		</el-form-item>
		         	</el-col>
		         	<el-col :span="24">
		         		<el-form-item label="营业执照：">
		         			<img style="width:100px;height:100px;border-radius: 4px;" :src="photo" alt="" />
		         		</el-form-item>
		         	</el-col>
		         </el-row>
		    </el-form>
		        <div slot="footer" class="dialog-footer">
		          <el-button type="primary" @click="dialogVisible = true">通过</el-button>
		          <el-button @click="dialogFormVisible = true">拒绝</el-button>
		  </div>
		</el-dialog>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
				<span>企业申请信息是否完整正确，确认通过审核吗?</span>
				<span slot="footer" class="dialog-footer">
			   <el-button @click="dialogVisible = false">取 消</el-button>
			   <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			  </span>
		</el-dialog>
		<!--删除确认框-->
		<el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
			<span>确认要删除吗？</span>
			<span slot="footer" class="dialog-footer">
						<el-button @click="deleteDialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="deleteBtn()">确 定</el-button>
					</span>
		</el-dialog>
		<el-dialog title="提示" :visible.sync="dialogFormVisible">
			<el-form ref="dataForm" :rules="rules" :model="formInline" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
				<el-form-item label="拒绝原因" prop="reason">
					<el-input type="textarea" v-model="formInline.reason" placeholder='请输入拒绝原因'></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
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
				listc: null,
				listd: null,
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
				options: [{
				  value: '请选择信息类型',
				  label: '请选择信息类型'
				  }, {
				  value: '求租',
				  label: '求租'
				  }, {
				  value: '求购',
				  label: '求购'
				  }],
				  value: '请选择信息类型',
				dialogFormVisiblea: false,
				dialogFormVisible: false,
				//删除确认
				deleteDialogVisible: false,
				dialogVisible: false,
				dialogFormVisibleb: false,
				listLoading: true,
				photo:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559262470783&di=516462a284445cc1ef78d513e9a4080c&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2F5rfWhY25CmOABR4oeyH11Q%3D%3D%2F2830512365819902260.jpg',				
				formInline: {
					floorname:'',
					reason:''
				},
				rules:{
					reason: [{
							required: true,
							message: '拒绝原因是必填项',
							trigger: 'blur'
							}]
				},
			}
		},
		created() {
			this.getLista();
			this.getListb();
			this.getListc();
			this.getListd();
			this.formInline = {
				floorname: "XXXXXX",
				floorstyle:'2017-10-10 10:20:00',
				floordescription:'13213542321543',
				roll:"黎明",
				sorting:"西安有限公司",
				Brand:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
			}
		},
		methods: {
			searchClick() {

			},
			handleCreate() {
				this.$router.push({
					path: '/informManage/sale/add'
				})
			},
			handleClick(tab, event) {
             console.log(tab, event);
            },
			getLista() {
				this.listLoading = false;
				this.lista = [];
				this.lista = [{
					    key:'1',
					    Corpaccount: '13659756423',
					    Corpname:'有小雨',
					    businessscope: '营业范围介绍',
					    businesslicense: '',
					    status:'待审核'
					},
					{
						key:'2',
						Corpaccount: '13659756423',
						Corpname:'小白',
						businessscope: '营业范围介绍',
						businesslicense: '',
						status:'已拒绝'
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
						time:'20190725 10:20:00',
						status:'待审核'
					},
					{
						key:'1',
						Corpaccount: '13659756423',
						Corpname:'有小雨',
						businessscope: '营业范围介绍',
						businesslicense: '',
						time:'20190725 10:20:00',
						status:'待审核'
					}];
				this.total = 2;
			},
			getListc() {
				this.listLoading = false;
				this.listc = [];
				this.listc = [{
					    key:'1',
						Corpaccount: '13659756423',
						Corpname:'有小雨',
						businessscope: '营业范围介绍',
						businesslicense: '',
						reviewer:'有小雨',
						time:'20190725 10:20:00',
						status:'已拒绝'
					},
					{
						key:'2',
						Corpaccount: '13659756423',
						Corpname:'小白',
						businessscope: '营业范围介绍',
						businesslicense: '',
						reviewer:'小白',
						time:'20190725 10:20:00',
						status:'已拒绝'
					}];
				this.total = 2;
			},
			getListd() {
				this.listLoading = false;
				this.listd = [];
				this.listd = [{
					    key:'1',
						Corpaccount: '13659756423',
						Corpname:'有小雨',
						businessscope: '营业范围介绍',
						businesslicense: '',
						reviewer:'有小雨',
						time:'20190725 10:20:00',
						status:'已拒绝'
					},
					{
						key:'2',
						Corpaccount: '13659756423',
						Corpname:'小白',
						businessscope: '营业范围介绍',
						businesslicense: '',
						reviewer:'小白',
						time:'20190725 10:20:00',
						status:'已拒绝'
					}];
				this.total = 2;
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
			
		},
		
		
	}
</script>
<style scoped>
    .pagination-container {
		text-align: center;
		margin-top: 0px;
		display: block;
	}
</style>