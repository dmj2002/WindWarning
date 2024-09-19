<script setup>
import { ref, computed } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
const activeStep = ref(0)
// action-1
const form = ref({
  modelName: '',
  version: 'V1.0',
  device: '',
  trainingInterval: 10,
  alarmDuration: 300,
  singlePointWarning: 5,
  dataGovernance: true,
  creationDate: new Date(),
  lastModifiedDate: new Date(),
  creatBy: 'admin',
  lastModifiedBy: 'admin'
})

// action-2
const searchQuery = ref('') // 搜索框输入的值
const radioGroup = ref('本设备') // 单选按钮组的值
const currentPage = ref(1) // 当前页码
const pageSize = ref(10) // 每页显示的行数
const selectedRows = ref([]) // 表格中选中的行
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

const prevStep = () => {
  activeStep.value--
  console.log('Previous step clicked:')
}
const nextStep = () => {
  activeStep.value++
  console.log('Next step clicked:')
}
const save = () => {
  console.log('Save clicked:')
}
const close = () => {
  console.log('Close clicked')
}
const confirm = () => {
  console.log('Conform clicked:')
}
</script>

<template>
  <div class="form-container">
    <!-- Steps -->
    <el-steps :active="activeStep" align-center finish-status="success">
      <el-step title="基本信息配置"></el-step>
      <el-step title="测点选择"></el-step>
      <el-step title="测点参数配置"></el-step>
      <el-step title="工况模式配置"></el-step>
      <el-step title="训练样本选择"></el-step>
      <el-step title="模型训练"></el-step>
    </el-steps>

    <!-- Form -->
    <el-form :model="form" label-width="120px" class="form-content">
      <!-- Step 1: Basic Information -->
      <template v-if="activeStep === 0">
        <div class="span-container">
          <span>基本信息</span>
        </div>
        <el-form-item label="模型名称" required>
          <el-input v-model="form.modelName" placeholder="请输入模型名称"></el-input>
        </el-form-item>

        <el-form-item label="版本" required>
          <el-input v-model="form.version" placeholder="请输入版本" readonly></el-input>
        </el-form-item>

        <el-form-item label="设备">
          <el-select v-model="form.device" placeholder="请选择设备">
            <el-option label="电力输出与厂用电(B)" value="电力输出与厂用电(B)"></el-option>
            <!-- 添加更多选项 -->
          </el-select>
        </el-form-item>

        <!-- Additional Configuration -->
        <el-form-item label="训练采样间隔" required>
          <el-input-number v-model="form.trainingInterval" :min="1" placeholder="请输入训练采样间隔"></el-input-number>
        </el-form-item>

        <el-form-item label="告警持续时间">
          <el-input-number v-model="form.alarmDuration" :min="1" placeholder="请输入告警持续时间"></el-input-number>
        </el-form-item>

        <el-form-item label="单测点预警">
          <el-input-number v-model="form.singlePointWarning" :min="1" placeholder="请输入单测点预警"></el-input-number>
        </el-form-item>

        <el-form-item label="是否数据治理" required>
          <el-radio-group v-model="form.dataGovernance">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="span-container">
          <span>维护信息</span>
        </div>
        <!-- Maintenance Information -->
        <el-form-item label="创建日期">
          <el-date-picker
            v-model="form.creationDate"
            type="datetime"
            placeholder="选择创建日期"
            disabled
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="创建人">
          <el-input v-model="form.creatBy" placeholder="请输入版本" disabled></el-input>
        </el-form-item>

        <el-form-item label="最后修改日期">
          <el-date-picker
            v-model="form.lastModifiedDate"
            type="datetime"
            placeholder="选择最后修改日期"
            disabled
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="修改人">
          <el-input v-model="form.lastModifiedBy" placeholder="请输入版本" disabled></el-input>
        </el-form-item>
      </template>

      <!-- Step 2: Point Selection -->
      <template v-if="activeStep === 1">
        <div class="point-selection">
          <div class="table-container">
            <!-- 左侧可选测点 -->
            <el-input v-model="searchQuery" placeholder="请输入测点编码或名称"></el-input>
            <el-radio-group v-model="radioGroup">
              <el-radio label="本设备">本设备</el-radio>
              <el-radio label="本机组">本机组</el-radio>
              <el-radio label="主参数">主参数</el-radio>
              <el-radio label="机组公用">机组公用</el-radio>
            </el-radio-group>

            <el-table
              stripe
              v-model:selected-rows="selectedRows"
              :data="paginatedTableData"
              style="width: 100%"
              :header-cell-style="{ backgroundColor: '#f5f7fa', color: '#333', fontWeight: 'bold' }"
            >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column prop="code" label="测点编码" width="180"></el-table-column>
              <el-table-column prop="name" label="测点名称" width="250"></el-table-column>
              <el-table-column prop="sisCode" label="SIS测点编码" width="180"></el-table-column>
              <el-table-column prop="sisName" label="SIS测点名称" width="250"></el-table-column>
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
            <el-button
              @click="moveSelectedRowsToSelectedTable"
              type="primary"
              :icon="ArrowRight"
              style="margin: 10px 15px"
            >
            </el-button>
            <el-button @click="moveSelectedRowsBack" type="primary" :icon="ArrowLeft" style="margin: 10px 15px">
            </el-button>
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
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column prop="code" label="测点编码" width="180"></el-table-column>
              <el-table-column prop="name" label="测点名称" width="250"></el-table-column>
              <el-table-column prop="sisCode" label="SIS测点编码" width="180"></el-table-column>
              <el-table-column prop="sisName" label="SIS测点名称" width="250"></el-table-column>
            </el-table>
          </div>
        </div>
      </template>

      <!-- Actions -->
      <div class="span-container"></div>
      <div class="button-container">
        <el-button v-if="activeStep > 0" type="primary" @click="prevStep">上一步</el-button>
        <el-button v-if="activeStep < 5" type="primary" @click="nextStep">下一步</el-button>
        <el-button v-if="activeStep === 5" type="primary" @click="confirm">确定</el-button>
        <el-button type="primary" @click="save">暂存</el-button>
        <el-button type="primary" @click="close">关闭</el-button>
      </div>
    </el-form>
  </div>
</template>

<style>
.span-container {
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 100%;
}
.form-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 10px;
  background-color: white;
  height: 100%;
}

.form-content {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.el-form-item {
  flex: 1 1 calc(50% - 10px); /* 每行两个表单项 */
  box-sizing: border-box;
}
.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 8%;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中对齐按钮 */
  gap: 10px; /* 按钮之间的间距 */
}
.point-selection {
  display: flex;
  flex-direction: row;
}
.table-container {
  width: 45%;
}
.pagination-container {
  display: flex;
  justify-content: center; /* 水平居中对齐 */
  margin-top: 20px; /* 可以根据需要调整与表格的间距 */
}
</style>
