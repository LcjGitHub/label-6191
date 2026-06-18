<template>
  <el-card
    class="role-card"
    shadow="hover"
    @click="goDetail"
  >
    <div class="role-card__silhouette">
      <SilhouetteSvg :path="role.silhouettePath" />
    </div>
    <div class="role-card__info">
      <h3 class="role-card__name">{{ role.name }}</h3>
      <el-tag size="small" type="warning">{{ role.category }}</el-tag>
      <p class="role-card__play">{{ role.representativePlay.title }}</p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import SilhouetteSvg from './SilhouetteSvg.vue'
import type { ShadowPuppet } from '@/types/shadowPuppet'

const props = defineProps<{
  role: ShadowPuppet
}>()

const router = useRouter()

/** 跳转角色详情页 */
function goDetail() {
  router.push({ name: 'role-detail', params: { id: props.role.id } })
}
</script>

<style scoped>
.role-card {
  cursor: pointer;
  transition: transform 0.2s ease;
  border: 1px solid #e8d5c4;
  background: #fffef9;
}

.role-card:hover {
  transform: translateY(-4px);
}

.role-card :deep(.el-card__body) {
  padding: 16px;
}

.role-card__silhouette {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #fff8e7 0%, #f5e6d3 100%);
  border-radius: 4px;
  margin-bottom: 12px;
  padding: 8px;
}

.role-card__info {
  text-align: center;
}

.role-card__name {
  margin: 0 0 8px;
  font-size: 1.1rem;
  color: #5c3d2e;
}

.role-card__play {
  margin: 8px 0 0;
  font-size: 0.85rem;
  color: #8b7355;
}
</style>
