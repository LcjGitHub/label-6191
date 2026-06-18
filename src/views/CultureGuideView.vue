<template>
  <div class="culture-guide-view">
    <h1 class="page-title">皮影文化导览</h1>
    <p class="page-desc">探索皮影戏的千年历史、精湛工艺与艺术魅力</p>

    <div class="chapter-list">
      <CultureChapterCard
        v-for="chapter in chapters"
        :key="chapter.id"
        :chapter="chapter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CultureChapterCard from '@/components/CultureChapterCard.vue'
import { useCultureStore } from '@/stores/culture'

const store = useCultureStore()

const chapters = computed(() => store.chapters)
</script>

<style scoped>
.culture-guide-view {
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

.chapter-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
