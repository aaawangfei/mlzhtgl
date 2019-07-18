<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.title')" v-model="listQuery.title" style="width: 200px;" class="filter-item el-input--mini" @keyup.enter.native="handleFilter"/>
    <!--  <el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"/>
      </el-select> -->
      <el-button v-waves class="filter-item el-button--mini" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
			<el-button style="float: right" v-waves :loading="downloadLoading" class="filter-item el-button--mini" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
      <el-button class="filter-item el-button--mini" style="margin-left: 10px;float: right;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      </div>
<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column label="日期" width="200" style="text-align: center;">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="200">
    </el-table-column>
    <el-table-column prop="address" label="地址" show-overflow-tooltip>
    </el-table-column>
	<el-table-column label="操作">
      <template slot-scope="scope">
		<el-button size="mini" @click="handleLook(scope.$index, scope.row)">查看</el-button>				
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button  size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div> -->
  <div class="block" style="margin-top: 20px;">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="40">
    </el-pagination>
   </div>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import icons from './requireIcons'
import clipboard from '@/utils/clipboard'
const calendarTypeOptions = [
  { key: 'CN', display_name: '中国' },
  { key: 'US', display_name: '美国' },
  { key: 'JP', display_name: '日本' },
  { key: 'EU', display_name: '欧洲' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
			currentPage4: 1,
			iconsMap: icons,
			tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
				tableData3: [{
					    date: '2019-05-03',
					    name: '苟凯凯',
					    address: '咸阳市苟家镇苟家村001号'
					  },{
					    date: '2019-03-18',
					    name: '王小明',
					    address: '西安市雁塔区含光路34号'
					  },{
					    date: '2016-05-08',
					    name: '王小虎',
					    address: '上海市普陀区金沙江路 1518 弄'
					  },{
					    date: '2017-09-02',
					    name: '白海瑞',
					    address: '榆林市榆阳区白家村24号'
					  },{
					    date: '2018-12-25',
					    name: '范栋栋',
					    address: '渭南市澄城县韦庄镇樊家村1号'
					  },{
					    date: '2018-12-12',
					    name: '刘冯易',
					    address: '渭南市大荔县石槽镇实操街道5号'
					  },{
					    date: '2016-05-08',
					    name: '王小虎',
					    address: '上海市普陀区金沙江路 1518 弄'
					  },{
					    date: '2016-05-06',
					    name: '王小虎',
					    address: '上海市普陀区金沙江路 1518 弄'
					  },{
					    date: '2016-05-08',
					    name: '王小虎',
					    address: '上海市普陀区金沙江路 1518 弄'
					  },{
					    date: '2016-05-06',
					    name: '王小虎',
					    address: '上海市普陀区金沙江路 1518 弄'
					  },{
					    date: '2016-05-06',
					    name: '王小虎',
					    address: '上海市普陀区金沙江路 1518 弄'
					  },{
					    date: '2016-05-08',
					    name: '王小虎',
					    address: '上海市普陀区金沙江路 1518 弄'
					  },{
					    date: '2016-05-06',
					    name: '王小虎',
					    address: '上海市普陀区金沙江路 1518 弄'
					  }],
					  multipleSelection: [],
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
		 generateIconCode(symbol) {
		    return `<svg-icon icon-class="${symbol}" />`
		  },
		handleSizeChange(val) {
		      console.log(`每页 ${val} 条`);
		  },
		    handleCurrentChange(val) {
		      console.log(`当前页: ${val}`);
		  },
		  handleClipboard(text, event) {
		    clipboard(text, event)
		  },
		handleLook(index, row) {
		      console.log(index, row);
		  },
		handleEdit(index, row) {
		      console.log(index, row);
		  },
		  handleDelete(index, row) {
		      console.log(index, row);
		  },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;
  .icons-wrapper {
    margin: 0 auto;
  }
  .icon-item {
    margin: 20px;
    height: 110px;
    text-align: center;
    width: 110px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }
  span {
    display: block;
    font-size: 24px;
    margin-top: 10px;
  }
  .disabled{
    pointer-events: none;
  }
}
</style>