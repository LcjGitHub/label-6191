<template>
  <div v-if="play" class="detail-view">
    <el-button class="back-btn" @click="goBack">
      ← 返回剧目百科
    </el-button>

    <el-card class="detail-card" shadow="never">
      <div class="detail-header">
        <h1 class="detail-title">{{ play.title }}</h1>
        <el-tag type="warning" size="large">{{ play.category }}</el-tag>
      </div>

      <section class="detail-section">
        <h2 class="section-title">剧情简介</h2>
        <div class="summary-content">
          <p class="summary-text">{{ play.summary }}</p>
        </div>
      </section>

      <section class="detail-section">
        <h2 class="section-title">参演角色</h2>
        <div class="role-list">
          <span
            v-for="role in relatedRoles"
            :key="role.id"
            class="role-tag"
            @click="goRoleDetail(role.id)"
          >
            <el-tag size="large">
              {{ role.name }}
            </el-tag>
          </span>
        </div>
        <p v-if="relatedRoles.length === 0" class="empty-hint">暂无关联角色</p>
      </section>
    </el-card>
  </div>

  <el-empty v-else description="未找到该剧目">
    <el-button type="primary" @click="goBack">返回剧目百科</el-button>
  </el-empty>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlayStore } from '@/stores/play'
import { useShadowPuppetStore } from '@/stores/shadowPuppet'

const route = useRoute()
const router = useRouter()
const playStore = usePlayStore()
const puppetStore = useShadowPuppetStore()

const play = computed(() => {
  const id = route.params.id as string
  return playStore.getPlayById(id)
})

const relatedRoles = computed(() => {
  if (!play.value) return []
  return play.value.relatedRoleIds
    .map((id) => puppetStore.getRoleById(id))
    .filter((r) => r !== undefined)
})

function goBack() {
  router.push({ name: 'play-list' })
}

function goRoleDetail(roleId: string) {
  router.push({
    name: 'role-detail',
    params: { id: roleId },
    query: { from: 'play', playId: route.params.id },
  })
}
</script>

<style scoped>
.detail-view {
  width: 100%;
}

.back-btn {
  margin-bottom: 16px;
  color: #8b4513;
  border-color: #d4a574;
}

.detail-card {
  border: 1px solid #e8d5c4;
  background: #fffef9;
}

.detail-card :deep(.el-card__body) {
  padding: 32px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.detail-title {
  margin: 0;
  font-size: 2rem;
  color: #5c3d2e;
  letter-spacing: 4px;
}

.detail-section {
  margin-bottom: 24px;
}

.section-title {
  margin: 0 0 12px;
  font-size: 1rem;
  color: #8b4513;
  border-left: 3px solid #ffd700;
  padding-left: 10px;
}

.summary-content {
  background: #fdf6ec;
  border: 1px solid #e8d5c4;
  border-radius: 8px;
  padding: 20px;
}

.summary-text {
  margin: 0;
  line-height: 2;
  color: #5c3d2e;
  font-size: 0.95rem;
  text-indent: 2em;
}

.role-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px 0;
}

.role-tag {
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-block;
}

.role-tag :deep(.el-tag) {
  background: #fdf6ec;
  color: #8b4513;
  border: 1px solid #d4a574;
}

.role-tag:hover {
  transform: translateY(-2px);
}

.role-tag:hover :deep(.el-tag) {
  background: #f5e6d3;
  border-color: #8b4513;
  color: #5c3d2e;
}

.empty-hint {
  margin: 0;
  color: #8b7355;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .detail-card :deep(.el-card__body) {
    padding: 20px;
  }

  .detail-title {
    font-size: 1.5rem;
  }

  .summary-text {
    font-size: 0.9rem;
  }
}
</style>
