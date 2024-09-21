<script setup>
import { ref, computed } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
const searchQuery = ref('') // 搜索框输入的值
const radioGroup = ref('本设备') // 单选按钮组的值
const currentPage = ref(1) // 当前页码
const pageSize = ref(10) // 每页显示的行数
const selectedRows = ref([]) // 表格中选中的行
const tableRef = ref(null) // 表格的引用
const tableData = ref([
  { code: '10BAT10CE301', name: '主变高压侧电压UAB1', sisCode: '01:10BAT10CE200X', sisName: '主变高压侧线电压AB' },
  { code: '10BAT10CE701', name: '主变高压侧有功功率1', sisCode: '01:10BAT10CE300X', sisName: '主变高压侧无功功率' },
  { code: '10BAT10CT101', name: '主变A相绕组温度', sisCode: '01:10BAT10CT100X', sisName: '主变A相绕组温度' },
  { code: '10BAT10CT121', name: '主变B相绕组温度', sisCode: '01:10BAT10CT200X', sisName: '主变B相绕组温度' },
  { code: '10BAT10CT130', name: '主变C相绕组温度', sisCode: '01:10BAT10CT300X', sisName: '主变C相绕组温度' },
  { code: '10BAT10CE301', name: '主变高压侧电压UAB1', sisCode: '01:10BAT10CE200X', sisName: '主变高压侧线电压AB' },
  { code: '10BAT10CE701', name: '主变高压侧有功功率1', sisCode: '01:10BAT10CE300X', sisName: '主变高压侧无功功率' },
  { code: '10BAT10CT101', name: '主变A相绕组温度', sisCode: '01:10BAT10CT100X', sisName: '主变A相绕组温度' },
  { code: '10BAT10CT121', name: '主变B相绕组温度', sisCode: '01:10BAT10CT200X', sisName: '主变B相绕组温度' },
  { code: '10BAT10CT130', name: '主变C相绕组温度', sisCode: '01:10BAT10CT300X', sisName: '主变C相绕组温度' },
  { code: '10BAT10CE301', name: '主变高压侧电压UAB1', sisCode: '01:10BAT10CE200X', sisName: '主变高压侧线电压AB' },
  { code: '10BAT10CE701', name: '主变高压侧有功功率1', sisCode: '01:10BAT10CE300X', sisName: '主变高压侧无功功率' },
  { code: '10BAT10CT101', name: '主变A相绕组温度', sisCode: '01:10BAT10CT100X', sisName: '主变A相绕组温度' }
]) // 表格中的数据
const selectedTableData = ref([]) // 已选择的测点数据
// 处理多选
const handleSelectionChange = (val) => {
  selectedRows.value = val
  console.log('Selected rows:', selectedRows.value)
}
// 根据搜索框内容过滤表格数据
const filteredTableData = computed(() => {
  if (searchQuery.value) {
    return tableData.value.filter(
      (item) => item.code.includes(searchQuery.value) || item.name.includes(searchQuery.value)
    )
  }
  return tableData.value
})
// 分页后的数据
const paginatedTableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredTableData.value.slice(start, end)
})
// 将选中的行移动到右边
const moveSelectedRowsToSelectedTable = () => {
  selectedRows.value.forEach((row) => {
    if (!selectedTableData.value.some((item) => item.code === row.code)) {
      selectedTableData.value.push(row)
    }
  })
  selectedRows.value = []
  tableRef.value.clearSelection()
}
const moveSelectedRowsBack = () => {}
</script>
<template>
  <div class="point-selection">
    <div class="table-container">
      <!-- 左侧可选测点 -->
      <el-input v-model="searchQuery" placeholder="请输入测点编码或名称"></el-input>
      <el-radio-group v-model="radioGroup">
        <el-radio value="本设备">本设备</el-radio>
        <el-radio value="本机组">本机组</el-radio>
        <el-radio value="主参数">主参数</el-radio>
        <el-radio value="机组公用">机组公用</el-radio>
      </el-radio-group>

      <el-table
        stripe
        ref="tableRef"
        v-model:selected-rows="selectedRows"
        :data="paginatedTableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ backgroundColor: '#f5f7fa', color: '#333', fontWeight: 'bold' }"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="code" label="测点编码"></el-table-column>
        <el-table-column prop="name" label="测点名称"></el-table-column>
        <el-table-column prop="sisCode" label="SIS测点编码"></el-table-column>
        <el-table-column prop="sisName" label="SIS测点名称"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          background
          :page-size="pageSize"
          :total="tableData.length"
          layout="prev, pager, next, jumper"
        />
      </div>
    </div>

    <!-- 中间按钮 -->
    <div class="button">
      <el-button @click="moveSelectedRowsToSelectedTable" type="primary" :icon="ArrowRight" style="margin: 10px 15px">
      </el-button>
      <el-button @click="moveSelectedRowsBack" type="primary" :icon="ArrowLeft" style="margin: 10px 15px"> </el-button>
    </div>

    <!-- 右侧已选测点 -->
    <div class="table-container">
      <el-input v-model="searchQuery" placeholder="请输入测点编码或名称"></el-input>
      <el-button>批量上移</el-button>
      <el-button>批量下移</el-button>
      <el-button>清空列表</el-button>
      <el-table
        :data="selectedTableData"
        style="width: 100%"
        :header-cell-style="{ backgroundColor: '#f5f7fa', color: '#333', fontWeight: 'bold' }"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="code" label="测点编码"></el-table-column>
        <el-table-column prop="name" label="测点名称"></el-table-column>
        <el-table-column prop="sisCode" label="SIS测点编码"></el-table-column>
        <el-table-column prop="sisName" label="SIS测点名称"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped>
.point-selection {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.table-container {
  width: 45%;
}
.pagination-container {
  display: flex;
  justify-content: center; /* 水平居中对齐 */
  margin-top: 20px; /* 可以根据需要调整与表格的间距 */
}
.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 8%;
}
</style>
