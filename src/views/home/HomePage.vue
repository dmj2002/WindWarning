<script setup>
import { ref } from 'vue'
import StepOne from '@/components/StepOne.vue'
const activeStep = ref(0)
// action-1
const StepRef1 = ref('')
// action-2
const StepRef2 = ref('')
// action-3
const pointdata = ref([
  {
    name: '高厂变压器测电流1',
    upperLimit: 10,
    lowerLimit: -10,
    guidance: '100-200',
    unit: 'A',
    participate: true,
    category: '普通测点'
  }
])

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

    <!-- Step 1: Basic Information -->
    <StepOne ref="StepRef1" v-show="activeStep === 0" />

    <!-- Step 2: Point Selection -->
    <StepTwo ref="StepRef2" v-show="activeStep === 1" />

    <!-- Step 3: Point Parameter Configuration -->
    <template v-if="activeStep === 2">
      <div style="width: 100%">
        <!-- 批量编辑按钮 -->
        <el-button type="primary" style="margin-bottom: 20px">批量编辑</el-button>

        <!-- 表格部分 -->
        <el-table :data="pointdata" border style="width: 100%">
          <!-- 表格列 -->
          <el-table-column type="selection"> </el-table-column>

          <el-table-column prop="name" label="测点名称">
            <template #default="scope">
              <el-input v-model="scope.row.name" :disabled="true"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="upperLimit" label="残差上限">
            <template #default="scope">
              <el-input v-model="scope.row.upperLimit"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="lowerLimit" label="残差下限">
            <template #default="scope">
              <el-input v-model="scope.row.lowerLimit"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="guidance" label="指导值">
            <template #default="scope">
              <el-input v-model="scope.row.guidance"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="unit" label="工程单位">
            <template #default="scope">
              <el-input v-model="scope.row.unit"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="participate" label="是否参与计算">
            <template #default="scope">
              <el-radio-group v-model="scope.row.participate">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>

          <el-table-column prop="category" label="测点类别">
            <template #default="scope">
              <el-input v-model="scope.row.category" :disabled="true"></el-input>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-container">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="20"
            :total="1"
            style="margin-top: 20px; text-align: right"
          >
          </el-pagination>
        </div>
      </div>
    </template>

    <!-- Step 4: Operating Mode Configuration -->
    <template v-if="activeStep === 3"> </template>

    <!-- Step 5: Training Sample Selection -->
    <template v-if="activeStep === 4"> </template>

    <!-- Step 6: Model Training -->
    <template v-if="activeStep === 5"> </template>

    <!-- Actions -->
    <div class="span-container"></div>
    <div class="button-container">
      <el-button v-if="activeStep > 0" type="primary" @click="prevStep">上一步</el-button>
      <el-button v-if="activeStep < 5" type="primary" @click="nextStep">下一步</el-button>
      <el-button v-if="activeStep === 5" type="primary" @click="confirm">确定</el-button>
      <el-button type="primary" @click="save">暂存</el-button>
      <el-button type="primary" @click="close">关闭</el-button>
    </div>
  </div>
</template>

<style scoped>
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
.button-container {
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中对齐按钮 */
  gap: 10px; /* 按钮之间的间距 */
}
</style>
