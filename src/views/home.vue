<template>
  <div></div>

  <p :class="$style">主页</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "view-home",
});
</script>

<style lang="scss" scoped module>
.red {
  color: red;
}
</style>
