<template>
  <div class="play-list-view">
    <h1 class="page-title">剧目百科</h1>
    <p class="page-desc">按生旦净丑分类浏览皮影戏经典剧目</p>

    <el-tabs v-model="activeTab" class="category-tabs">
      <el-tab-pane label="全部" name="all" />
      <el-tab-pane
        v-for="cat in categories"
        :key="cat"
        :label="cat"
        :name="cat"
      />
    </el-tabs>

    <div class="play-grid">
      <PlayCard
        v-for="play in filteredPlays"
        :key="play.id"
        :play="play"
      />
    </div>

    <el-empty
      v-if="filteredPlays.length === 0"
      description="暂无剧目"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PlayCard from '@/components/PlayCard.vue'
import { CATEGORIES } from '@/stores/shadowPuppet'
import { usePlayStore } from '@/stores/play'
import type { RoleCategory } from '@/types/shadowPuppet'

const store = usePlayStore()
const categories = CATEGORIES
const activeTab = ref<RoleCategory | 'all'>('all')

const filteredPlays = computed(() =>
  store.getPlaysByCategory(activeTab.value),
)
</script>

<style scoped>
.play-list-view {
  width: 100%;
}

.page-title {
  margin: 0 0 8px;
  font-size: 1.75rem;
  color: #5c3d2e;
  letter-spacing: 4px;
}

.page-desc {
  margin: 0 0 24px;
  color: #8b7355;
  font-size: 0.95rem;
}

.category-tabs {
  margin-bottom: 24px;
}

.category-tabs :deep(.el-tabs__item) {
  font-size: 1rem;
}

.play-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
</style>
