<template>
  <el-card class="chapter-card" shadow="hover">
    <div class="chapter-card__header">
      <div class="chapter-card__icon">
        <el-icon :size="28">
          <component :is="iconComponent" />
        </el-icon>
      </div>
      <div class="chapter-card__title-wrap">
        <h3 class="chapter-card__title">{{ chapter.title }}</h3>
        <span class="chapter-card__subtitle">{{ chapter.subtitle }}</span>
      </div>
    </div>
    <div class="chapter-card__content">
      <p v-for="(para, idx) in chapter.content" :key="idx" class="chapter-card__para">
        {{ para }}
      </p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Document, Tools, VideoCamera, Medal } from '@element-plus/icons-vue'
import type { CultureChapter } from '@/types/culture'

const props = defineProps<{
  chapter: CultureChapter
}>()

const iconMap: Record<string, unknown> = {
  Document,
  Tools,
  VideoCamera,
  Medal,
}

const iconComponent = computed(() => iconMap[props.chapter.icon] || Document)
</script>

<style scoped>
.chapter-card {
  border: 1px solid #e8d5c4;
  background: #fffef9;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.chapter-card:hover {
  transform: translateY(-4px);
}

.chapter-card :deep(.el-card__body) {
  padding: 24px;
}

.chapter-card__header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8d5c4;
}

.chapter-card__icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%);
  border-radius: 8px;
  color: #8b4513;
}

.chapter-card__title-wrap {
  flex: 1;
}

.chapter-card__title {
  margin: 0 0 4px;
  font-size: 1.35rem;
  color: #5c3d2e;
  letter-spacing: 2px;
}

.chapter-card__subtitle {
  font-size: 0.9rem;
  color: #8b7355;
}

.chapter-card__content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chapter-card__para {
  margin: 0;
  line-height: 1.9;
  color: #4a3728;
  font-size: 0.95rem;
  text-indent: 2em;
}
</style>
