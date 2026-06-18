<template>
  <div class="role-display-card">
    <div class="role-display-card__header">
      <span class="role-display-card__label">{{ label }}</span>
    </div>

    <div class="role-display-card__body">
      <div class="role-display-card__silhouette">
        <SilhouetteSvg :path="role.silhouettePath" />
      </div>

      <div class="role-display-card__info">
        <h2 class="role-display-card__name">{{ role.name }}</h2>
        <el-tag
          type="warning"
          size="large"
          class="role-display-card__category"
        >
          {{ role.category }}
        </el-tag>
      </div>

      <section class="role-display-card__section">
        <h3 class="section-title">
          <el-icon><Menu /></el-icon>
          <span>全部别名</span>
          <span class="count-badge">{{ role.aliases.length }}</span>
        </h3>
        <div class="alias-list">
          <el-tag
            v-for="alias in role.aliases"
            :key="alias"
            class="alias-tag"
            effect="plain"
          >
            {{ alias }}
          </el-tag>
        </div>
      </section>

      <section class="role-display-card__section">
        <h3 class="section-title">
          <el-icon><Document /></el-icon>
          <span>代表剧目</span>
        </h3>
        <el-card class="play-card" shadow="hover">
          <h4 class="play-title">{{ role.representativePlay.title }}</h4>
          <p class="play-summary">{{ role.representativePlay.summary }}</p>
        </el-card>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Menu, Document } from '@element-plus/icons-vue'
import SilhouetteSvg from './SilhouetteSvg.vue'
import type { ShadowPuppet } from '@/types/shadowPuppet'

withDefaults(
  defineProps<{
    role: ShadowPuppet
    label?: string
  }>(),
  {
    label: '角色',
  },
)
</script>

<style scoped>
.role-display-card {
  background: #fffef9;
  border: 1px solid #e8d5c4;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.role-display-card__header {
  padding: 14px 20px;
  background: linear-gradient(135deg, #fdf6ec 0%, #f5e6d3 100%);
  border-bottom: 1px solid #e8d5c4;
}

.role-display-card__label {
  font-size: 0.85rem;
  color: #8b4513;
  letter-spacing: 2px;
  font-weight: 600;
}

.role-display-card__body {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.role-display-card__silhouette {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #fff8e7 0%, #f5e6d3 100%);
  border-radius: 8px;
  padding: 16px;
  border: 2px solid #e8d5c4;
  margin-bottom: 20px;
}

.role-display-card__info {
  text-align: center;
  margin-bottom: 24px;
}

.role-display-card__name {
  margin: 0 0 10px;
  font-size: 1.6rem;
  color: #5c3d2e;
  letter-spacing: 4px;
}

.role-display-card__category {
  font-size: 0.95rem;
}

.role-display-card__section {
  margin-bottom: 20px;
}

.role-display-card__section:last-child {
  margin-bottom: 0;
}

.section-title {
  margin: 0 0 12px;
  font-size: 0.95rem;
  color: #8b4513;
  border-left: 3px solid #ffd700;
  padding-left: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.section-title .el-icon {
  font-size: 1rem;
}

.count-badge {
  margin-left: auto;
  background: #f5e6d3;
  color: #8b4513;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.alias-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.alias-tag {
  font-size: 0.85rem;
}

.play-card {
  background: #fdf6ec;
  border: 1px solid #e8d5c4;
}

.play-card :deep(.el-card__body) {
  padding: 14px 16px;
}

.play-title {
  margin: 0 0 8px;
  font-size: 1.05rem;
  color: #5c3d2e;
}

.play-summary {
  margin: 0;
  line-height: 1.75;
  color: #666;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .role-display-card__body {
    padding: 16px;
  }

  .role-display-card__silhouette {
    height: 160px;
  }

  .role-display-card__name {
    font-size: 1.35rem;
  }
}
</style>
