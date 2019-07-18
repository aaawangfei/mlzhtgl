<template>
  <div class="icons-container">
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
import icons from './requireIcons'
import clipboard from '@/utils/clipboard'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  name: 'Icons',
  data() {
    return {
	  currentPage4: 1,
      iconsMap: icons,
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
			  multipleSelection: []
    }
  },
  methods: {
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
