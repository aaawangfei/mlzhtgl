<template>
  <div class="app-container documentation-container">
		 <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
		     <div class="postInfo-container">
		  <el-row>
		   <el-col :span="8">
		      <el-form-item label-width="45px" label="作者:" class="postInfo-container-item">
		        <el-select v-model="postForm.author" :remote-method="getRemoteUserList" filterable remote placeholder="搜索用户">
		          <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item"/>
		        </el-select>
		      </el-form-item>
		    </el-col>
		   <el-col :span="8">
		      <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
		        <el-date-picker v-model="postForm.display_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
		      </el-form-item>
		    </el-col>
		     <el-col :span="8">
		      <el-form-item label-width="75px" label="重要性:" class="postInfo-container-item">
		        <el-rate v-model="postForm.importance" :max="3" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :low-threshold="1" :high-threshold="3" style="margin-top:8px;"/>
		      </el-form-item>
					
					
		    </el-col>			
		  </el-row>
			<div class="el-form-item is-required el-form-item--medium">
				<label for="title" class="el-form-item__label" style="width: 100px;">标题:</label>
				<div class="el-form-item__content" style="margin-left: 100px;">
					<div class="el-input el-input--medium">
						<input type="text" v-model="postForm.tit" autocomplete="off" class="el-input__inner">
						   </div>
						  </div>
						</div>
			<el-form-item style="margin-bottom: 40px;" label-width="100px" label="项目编码:">
			  <el-input :rows="1" v-model="postForm.content_short" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
			  <span v-show="contentShortLength" class="word-counter"></span>
			</el-form-item>
			<el-form-item style="margin-bottom: 40px;" label-width="100px" label="项目名称:">
			  <el-input :rows="1" v-model="postForm.content_shorta" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
			  <span v-show="contentShortLength" class="word-counter"></span>
			</el-form-item>
			<el-form-item style="margin-bottom: 40px;" label-width="100px" label="客户名称:">
			  <el-input :rows="1" v-model="postForm.content_shortb" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
			  <span v-show="contentShortLength" class="word-counter"></span>
			</el-form-item>
			<el-form-item style="margin-bottom: 40px;" label-width="100px" label="负责人:">
			  <el-input :rows="1" v-model="postForm.content_shortc" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
			  <span v-show="contentShortLength" class="word-counter"></span>
			</el-form-item>
			<el-form-item style="margin-bottom: 40px;" label-width="100px" label="开工验收日期:">
			  <el-date-picker v-model="postForm.display_timed" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
			</el-form-item>
			
  <el-form-item>
		<div class="el-form-item el-form-item--medium">
			<label class="el-form-item__label" style="width: 100px;">备注:</label>
			<div class="el-form-item__content" style="margin-left: 100px;">
				<div class="el-textarea el-input--medium">
					<textarea autocomplete="off" v-model="postForm.texta" placeholder="请输入内容" class="el-textarea__inner" style="min-height: 54px; height: 54px;"></textarea>
					  </div>
					 </div>
					</div>
	</el-form-item>				
		</div>
		<div class="el-dialog__footer">
			<div class="dialog-footer">
				<button type="button" class="el-button el-button--default el-button--medium">
					<span>取消</span>
					</button>
					<button type="button" @click="submitForm" class="el-button el-button--primary el-button--medium">		
						<span>确定</span>
						</button>
						</div>
						</div>	    
</el-form>
</div>
</template>
<script>
import DropdownMenu from '@/components/Share/dropdownMenu'
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { userSearch } from '@/api/remoteSearch'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from '@/views/example/components/Dropdown'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}
export default {
  name: 'Documentation',
  components: { 
		DropdownMenu,
		Tinymce,
	    MDinput, 
	    Upload, 
		Sticky, 
		CommentDropdown, 
		PlatformDropdown,
		SourceUrlDropdown		
	},
	props: {
	  isEdit: {
	    type: Boolean,
	    default: false
	  }
	},
  data() {
		const validateRequire = (rule, value, callback) => {
		  if (value === '') {
		    this.$message({
		      message: rule.field + '为必传项',
		      type: 'error'
		    })
		    callback(new Error(rule.field + '为必传项'))
		  } else {
		    callback()
		  }
		}
		const validateSourceUri = (rule, value, callback) => {
		  if (value) {
		    if (validURL(value)) {
		      callback()
		    } else {
		      this.$message({
		        message: '外链url填写不正确',
		        type: 'error'
		      })
		      callback(new Error('外链url填写不正确'))
		    }
		  } else {
		    callback()
		  }
		}
    return {
			postForm:{
				author: '',
				display_time: '',
				importance: '',
				tit: '',
				content_short: '',
				content_shorta: '',
				content_shortb: '',
				content_shortc: '',
				display_timed:'',
				texta:''
			},
      articleList: [
        { title: '基础篇', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
        { title: '登录权限篇', href: 'https://juejin.im/post/591aa14f570c35006961acac' },
        { title: '实战篇', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
        { title: 'vue-admin-template 篇', href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56' },
        { title: '自行封装 component', href: 'https://segmentfault.com/a/1190000009090836' },
        { title: '优雅的使用 icon', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
        { title: 'webpack4（上）', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
        { title: 'webpack4（下）', href: 'https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc' }
      ],
			postForm: Object.assign({}, defaultForm),
			loading: false,
			userListOptions: [],
			rules: {
			  image_uri: [{ validator: validateRequire }],
			  title: [{ validator: validateRequire }],
			  content: [{ validator: validateRequire }],
			  source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
			},
			tempRoute: {}
    }
  },
	computed: {
	  contentShortLength() {
	    return this.postForm.content_short.length
	  },
	  lang() {
	    return this.$store.getters.language
	  }
	},
	created() {
	  if (this.isEdit) {
	    const id = this.$route.params && this.$route.params.id
	    this.fetchData(id)
	  } else {
	    this.postForm = Object.assign({}, defaultForm)
	  }
	
	  // Why need to make a copy of this.$route here?
	  // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
	  // https://github.com/PanJiaChen/vue-element-admin/issues/1221
	  this.tempRoute = Object.assign({}, this.$route)
	},
methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data
        // Just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // Set tagsview title
        this.setTagsViewTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('updateVisitedView', route)
    },
    submitForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000)
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      userSearch(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.documentation-container {
  margin: 20px 150px;
  .document-btn {
    float: left;
    margin-left: 50px;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    width: 200px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
.app-container{
	padding: 0;
}
.el-date-editor{
	width: 100%;
}
.el-form-item__content{
	margin-left: 75px;
}
.el-row{
	margin-left: 55px;
}
.el-dialog__footer {
    padding: 10px 0px 20px;
    text-align: right;
    box-sizing: border-box;
}
</style>