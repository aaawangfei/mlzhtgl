<template>
	<div class="app-container">
		<el-row>
			<el-col :span="2">
				<span>商品分类</span>
			</el-col>
			<el-col :span="22">
				 <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入关键内容" v-model="value" :data="data"></el-transfer>
			</el-col>
		</el-row>
  </div>
</template>
<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value: [1, 4]
      };
    }
  };
</script>