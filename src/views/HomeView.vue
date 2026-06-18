<template>
  <div class="home-view">
    <h1 class="page-title">角色图鉴</h1>
    <p class="page-desc">按生旦净丑分类浏览皮影戏经典角色</p>

    <el-input
      v-model="searchKeyword"
      class="search-input"
      placeholder="搜索角色名称或别名，如：刘备、玄德、卧龙"
      clearable
      :prefix-icon="Search"
    />

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
      :description="emptyDescription"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import RoleCard from '@/components/RoleCard.vue'
import { CATEGORIES, useShadowPuppetStore } from '@/stores/shadowPuppet'
import type { RoleCategory } from '@/types/shadowPuppet'

const store = useShadowPuppetStore()
const categories = CATEGORIES
const activeTab = ref<RoleCategory | 'all'>('all')
const searchKeyword = ref('')

/** 当前 Tab + 搜索关键词过滤后的角色列表 */
const filteredRoles = computed(() =>
  store.searchRoles(searchKeyword.value, activeTab.value),
)

/** 空状态描述：区分是无数据还是搜索无匹配 */
const emptyDescription = computed(() => {
  if (searchKeyword.value.trim()) return '未找到匹配的角色，试试其他关键词'
  return '暂无角色'
})
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

.search-input {
  margin-bottom: 20px;
  max-width: 480px;
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
