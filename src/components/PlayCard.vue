<template>
  <el-card
    class="play-card"
    shadow="hover"
    @click="goDetail"
  >
    <div class="play-card__content">
      <h3 class="play-card__title">{{ play.title }}</h3>
      <el-tag size="small" type="warning">{{ play.category }}</el-tag>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Play } from '@/types/play'

const props = defineProps<{
  play: Play
}>()

const router = useRouter()

function goDetail() {
  router.push({ name: 'play-detail', params: { id: props.play.id } })
}
</script>

<style scoped>
.play-card {
  cursor: pointer;
  transition: transform 0.2s ease;
  border: 1px solid #e8d5c4;
  background: #fffef9;
}

.play-card:hover {
  transform: translateY(-4px);
}

.play-card :deep(.el-card__body) {
  padding: 20px 16px;
}

.play-card__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.play-card__title {
  margin: 0;
  font-size: 1.1rem;
  color: #5c3d2e;
  flex: 1;
}
</style>
