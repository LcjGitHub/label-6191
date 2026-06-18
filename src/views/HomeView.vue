<template>
  <div class="home-view">
    <h1 class="page-title">角色图鉴</h1>
    <p class="page-desc">按生旦净丑分类浏览皮影戏经典角色</p>

    <el-tabs v-model="activeTab" class="category-tabs">
      <el-tab-pane label="全部" name="all" />
      <el-tab-pane
        v-for="cat in categories"
        :key="cat"
        :label="cat"
        :name="cat"
      />
    </el-tabs>

    <div class="role-grid">
      <RoleCard
        v-for="role in filteredRoles"
        :key="role.id"
        :role="role"
      />
    </div>

    <el-empty
      v-if="filteredRoles.length === 0"
      description="暂无角色"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import RoleCard from '@/components/RoleCard.vue'
import { CATEGORIES, useShadowPuppetStore } from '@/stores/shadowPuppet'
import type { RoleCategory } from '@/types/shadowPuppet'

const store = useShadowPuppetStore()
const categories = CATEGORIES
const activeTab = ref<RoleCategory | 'all'>('all')

/** 当前 Tab 下的角色列表 */
const filteredRoles = computed(() =>
  store.getRolesByCategory(activeTab.value),
)
</script>

<style scoped>
.home-view {
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

.role-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
</style>
