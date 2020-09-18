<!--
 * @Description: 
 * @Author: lxd
 * @Date: 2020-09-18 11:01:59
 * @LastEditTime: 2020-09-18 13:50:52
-->
<template>
  <div>
    <div>{{ count }}</div>
    <el-button @click="onSubtract">减</el-button>
    <el-button @click="onAdd">加</el-button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  name: 'Count-Item'
})
export default class extends Vue {
  @Prop({ default: false }) private count: number

  private onSubtract() {
    this.$emit('update:count', this.count - 1)
  }

  private onAdd() {
    this.$emit('update:count', this.count + 1)
  }
}
</script>
<style lang="scss" scoped></style>
