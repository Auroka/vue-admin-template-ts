<!--
 * @Description: 
 * @Author: lxd
 * @Date: 2020-09-17 17:24:42
 * @LastEditTime: 2020-09-18 16:00:01
-->
<template>
  <div>
    11
    <count-item :count.sync="num"></count-item>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CountItem from '@/components/CountItem'
// export default {
//   data(){
//     return{
//       num:0
//     }
//   },
//   components: {
//     CountItem
//   }
// }
@Component({
  components: {
    CountItem
  }
})
export default class extends Vue {
  private num: number = 0
}
</script>
<style lang="scss" scoped></style>
