<template>
  <svg
    class="silhouette-svg"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path :d="path" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
/**
 * 皮影剪影 SVG 组件
 * 使用简单 path 绘制角色轮廓
 */
withDefaults(
  defineProps<{
    /** SVG path 的 d 属性 */
    path: string
    /** SVG viewBox，默认 0 0 100 100 */
    viewBox?: string
  }>(),
  {
    viewBox: '0 0 100 100',
  },
)
</script>

<style scoped>
.silhouette-svg {
  width: 100%;
  height: 100%;
  color: #2c1810;
}
</style>
