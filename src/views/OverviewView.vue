<template>
  <section class="overview-view">
    <header class="page-header">
      <h1 class="page-title">行当统计概览</h1>
      <p class="page-desc">一览皮影戏四大行当角色分布与代表人物</p>
    </header>

    <section class="stats-summary">
      <div
        v-for="cat in categories"
        :key="cat"
        class="summary-card"
        :class="`summary-card--${catClassMap[cat]}`"
      >
        <div class="summary-card__cat">{{ cat }}</div>
        <div class="summary-card__num">
          <span class="num">{{ store.categoryCount.get(cat) ?? 0 }}</span>
          <span class="unit">人</span>
        </div>
        <div class="summary-card__bar">
          <div
            class="summary-card__bar-fill"
            :style="{ width: getBarWidth(cat) }"
          />
        </div>
      </div>
    </section>

    <section class="rep-section">
      <h2 class="section-title">代表角色</h2>
      <p class="section-desc">点击卡片可查看角色详情</p>
      <div class="rep-grid">
        <CategoryStatCard
          v-for="cat in categories"
          :key="cat"
          :category="cat"
          :representative="reps[cat]"
        />
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import CategoryStatCard from '@/components/CategoryStatCard.vue'
import { CATEGORIES, useShadowPuppetStore } from '@/stores/shadowPuppet'
import type { RoleCategory, ShadowPuppet } from '@/types/shadowPuppet'

const store = useShadowPuppetStore()
const categories = CATEGORIES

const catClassMap: Record<RoleCategory, string> = {
  '生': 'sheng',
  '旦': 'dan',
  '净': 'jing',
  '丑': 'chou',
}

const reps = reactive<Record<RoleCategory, ShadowPuppet | undefined>>({
  '生': undefined,
  '旦': undefined,
  '净': undefined,
  '丑': undefined,
})

function refreshRandom() {
  for (const cat of categories) {
    reps[cat] = store.getRandomRoleByCategory(cat)
  }
}

function getBarWidth(cat: RoleCategory): string {
  const count = store.categoryCount.get(cat) ?? 0
  const total = store.roles.length
  if (total === 0) return '0%'
  return `${(count / total) * 100}%`
}

onMounted(() => {
  refreshRandom()
})
</script>

<style scoped>
.overview-view {
  width: 100%;
}

.page-header {
  margin-bottom: 28px;
}

.page-title {
  margin: 0 0 8px;
  font-size: 1.75rem;
  color: #5c3d2e;
  letter-spacing: 4px;
}

.page-desc {
  margin: 0;
  color: #8b7355;
  font-size: 0.95rem;
}

.stats-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 36px;
}

.summary-card {
  background: #fffef9;
  border: 1px solid #e8d5c4;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(139, 69, 19, 0.1);
}

.summary-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
}

.summary-card--sheng::before { background: #409eff; }
.summary-card--dan::before { background: #67c23a; }
.summary-card--jing::before { background: #e6a23c; }
.summary-card--chou::before { background: #f56c6c; }

.summary-card__cat {
  font-size: 0.9rem;
  color: #8b7355;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.summary-card__num {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
}

.summary-card__num .num {
  font-size: 2.25rem;
  font-weight: 700;
  color: #5c3d2e;
  line-height: 1;
}

.summary-card__num .unit {
  font-size: 0.85rem;
  color: #8b7355;
}

.summary-card__bar {
  margin-top: 14px;
  height: 4px;
  background: #f5e6d3;
  border-radius: 2px;
  overflow: hidden;
}

.summary-card__bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.4s ease;
}

.summary-card--sheng .summary-card__bar-fill { background: #409eff; }
.summary-card--dan .summary-card__bar-fill { background: #67c23a; }
.summary-card--jing .summary-card__bar-fill { background: #e6a23c; }
.summary-card--chou .summary-card__bar-fill { background: #f56c6c; }

.rep-section {
  width: 100%;
}

.section-title {
  margin: 0 0 4px;
  font-size: 1.25rem;
  color: #5c3d2e;
  letter-spacing: 3px;
  border-left: 4px solid #ffd700;
  padding-left: 12px;
}

.section-desc {
  margin: 0 0 20px;
  color: #8b7355;
  font-size: 0.85rem;
  padding-left: 16px;
}

.rep-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 960px) {
  .stats-summary {
    grid-template-columns: repeat(2, 1fr);
  }

  .rep-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .stats-summary {
    grid-template-columns: 1fr;
  }

  .summary-card__num .num {
    font-size: 1.75rem;
  }
}
</style>
