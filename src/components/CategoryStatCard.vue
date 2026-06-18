<template>
  <el-card
    class="stat-card"
    shadow="hover"
  >
    <div class="stat-card__cat-label">
      <span class="stat-card__cat-name">{{ category }}</span>
    </div>

    <router-link
      v-if="representative"
      :to="{
        name: 'role-detail',
        params: { id: representative.id },
        query: { from: 'overview' },
      }"
      class="stat-card__rep-link"
    >
      <div class="stat-card__silhouette">
        <SilhouetteSvg :path="representative.silhouettePath" />
      </div>
      <div class="stat-card__rep-info">
        <div class="stat-card__rep-header">
          <h3 class="stat-card__rep-name">{{ representative.name }}</h3>
          <el-icon class="arrow-icon"><ArrowRight /></el-icon>
        </div>
        <p class="stat-card__rep-summary">
          {{ representative.representativePlay.summary }}
        </p>
      </div>
    </router-link>

    <el-empty v-else description="暂无角色" :image-size="60" />
  </el-card>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import SilhouetteSvg from './SilhouetteSvg.vue'
import type { RoleCategory, ShadowPuppet } from '@/types/shadowPuppet'

defineProps<{
  category: RoleCategory
  representative?: ShadowPuppet
}>()
</script>

<style scoped>
.stat-card {
  border: 1px solid #e8d5c4;
  background: #fffef9;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  --el-card-border-radius: 12px;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(139, 69, 19, 0.12);
}

.stat-card :deep(.el-card__body) {
  padding: 20px;
}

.stat-card__cat-label {
  margin-bottom: 14px;
}

.stat-card__cat-name {
  display: inline-block;
  font-size: 1rem;
  color: #8b4513;
  letter-spacing: 4px;
  font-weight: 600;
  padding: 4px 12px;
  background: #fdf6ec;
  border-radius: 4px;
  border-left: 3px solid #ffd700;
}

.stat-card__rep-link {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 20px;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.2s ease;
  align-items: center;
  text-decoration: none;
  outline: none;
  color: inherit;
}

.stat-card__rep-link:hover {
  background: #fdf6ec;
}

.stat-card__rep-link:focus-visible {
  box-shadow: 0 0 0 2px #ffd700;
  background: #fdf6ec;
}

.stat-card__silhouette {
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #fff8e7 0%, #f5e6d3 100%);
  border-radius: 8px;
  padding: 8px;
  border: 2px solid #e8d5c4;
}

.stat-card__rep-info {
  min-width: 0;
}

.stat-card__rep-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.stat-card__rep-name {
  margin: 0;
  font-size: 1.2rem;
  color: #5c3d2e;
  font-weight: 600;
  letter-spacing: 2px;
}

.arrow-icon {
  color: #8b4513;
  font-size: 1rem;
  transition: transform 0.2s ease;
}

.stat-card__rep-link:hover .arrow-icon {
  transform: translateX(4px);
}

.stat-card__rep-summary {
  margin: 0;
  font-size: 0.9rem;
  color: #8b7355;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
