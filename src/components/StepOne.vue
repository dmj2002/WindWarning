<script setup>
import { ref, defineExpose } from 'vue'
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
defineExpose({ form })
</script>

<template>
  <!-- Basic Information -->
  <el-form :model="form" label-width="120px" class="form-content">
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
        <el-radio :value="true">是</el-radio>
        <el-radio :value="false">否</el-radio>
      </el-radio-group>
    </el-form-item>

    <div class="span-container">
      <span>维护信息</span>
    </div>
    <!-- Maintenance Information -->
    <el-form-item label="创建日期">
      <el-date-picker v-model="form.creationDate" type="datetime" placeholder="选择创建日期" disabled></el-date-picker>
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
  </el-form>
</template>
<style scoped>
.span-container {
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 100%;
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
</style>
