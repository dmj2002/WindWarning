<script setup>
import { ref } from 'vue'
const activeStep = ref(0)
const form = ref({
  modelName: '',
  version: 'V1.0',
  device: '',
  trainingInterval: 10,
  alarmDuration: 300,
  singlePointWarning: 5,
  dataGovernance: true,
  creationDate: new Date(),
  lastModifiedDate: new Date()
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
      <el-step title="1. 基本信息配置"></el-step>
      <el-step title="2. 测点选择"></el-step>
      <el-step title="3. 测点参数配置"></el-step>
      <el-step title="4. 工况模式配置"></el-step>
      <el-step title="5. 训练样本选择"></el-step>
      <el-step title="6. 模型训练"></el-step>
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

        <el-form-item label="最后修改日期">
          <el-date-picker
            v-model="form.lastModifiedDate"
            type="datetime"
            placeholder="选择最后修改日期"
            disabled
          ></el-date-picker>
        </el-form-item>
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
.button-container {
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中对齐按钮 */
  gap: 10px; /* 按钮之间的间距 */
}
</style>
