<template>
  <el-card
    class="stat-card"
    shadow="hover"
    :category="category"
  >
    <div class="stat-card__header">
      <div class="stat-card__cat-info">
        <h2 class="stat-card__cat-name">{{ category }}</h2>
        <div class="stat-card__cat-count">
          <span class="count-num">{{ count }}</span>
          <span class="count-unit">人</span>
        </div>
      </div>
      <el-tag
        class="stat-card__cat-tag"
        size="large"
        effect="dark"
        :type="tagType"
      >
        {{ category }}行
      </el-tag>
    </div>

    <div
      v-if="representative"
      class="stat-card__rep"
      @click="goDetail"
    >
      <div class="stat-card__silhouette">
        <SilhouetteSvg :path="representative.silhouettePath" />
      </div>
      <div class="stat-card__rep-info">
        <div class="stat-card__rep-header">
          <h3 class="stat-card__rep-name">{{ representative.name }}</h3>
          <el-icon class="arrow-icon"><ArrowRight /></el-icon>
        </div>
        <p class="stat-card__rep-desc">
          代表剧目《{{ representative.representativePlay.title }}》
        </p>
        <p class="stat-card__rep-summary">
          {{ truncateSummary(representative.representativePlay.summary, 50) }}
        </p>
      </div>
    </div>

    <el-empty v-else description="暂无角色" :image-size="60" />
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import SilhouetteSvg from './SilhouetteSvg.vue'
import type { RoleCategory, ShadowPuppet } from '@/types/shadowPuppet'

const props = defineProps<{
  category: RoleCategory
  count: number
  representative?: ShadowPuppet
}>()

const router = useRouter()

const tagType = computed(() => {
  const map: Record<RoleCategory, 'primary' | 'success' | 'warning' | 'danger'> = {
    '生': 'primary',
    '旦': 'success',
    '净': 'warning',
    '丑': 'danger',
  }
  return map[props.category]
})

function truncateSummary(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text
  return text.slice(0, maxLen) + '…'
}

function goDetail() {
  if (props.representative) {
    router.push({
      name: 'role-detail',
      params: { id: props.representative.id },
      query: { from: 'overview' },
    })
  }
}
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
  padding: 24px;
}

.stat-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px dashed #e8d5c4;
}

.stat-card__cat-info {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.stat-card__cat-name {
  margin: 0;
  font-size: 1.5rem;
  color: #5c3d2e;
  letter-spacing: 4px;
  font-weight: 700;
}

.stat-card__cat-count {
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
}

.count-num {
  font-size: 2rem;
  font-weight: 700;
  color: #8b4513;
  line-height: 1;
}

.count-unit {
  font-size: 0.9rem;
  color: #8b7355;
}

.stat-card__cat-tag {
  --el-tag-font-size: 0.85rem;
  letter-spacing: 2px;
}

.stat-card__rep {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 20px;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.2s ease;
  align-items: center;
}

.stat-card__rep:hover {
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
  margin-bottom: 6px;
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

.stat-card__rep:hover .arrow-icon {
  transform: translateX(4px);
}

.stat-card__rep-desc {
  margin: 0 0 6px;
  font-size: 0.9rem;
  color: #8b4513;
  font-weight: 500;
}

.stat-card__rep-summary {
  margin: 0;
  font-size: 0.85rem;
  color: #8b7355;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
