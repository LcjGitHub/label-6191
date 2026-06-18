<template>
  <div class="favorites-view">
    <div class="favorites-header">
      <div>
        <h1 class="page-title">
          <el-icon class="title-icon">
            <Star :fill="'#ffd700'" />
          </el-icon>
          我的收藏夹
        </h1>
        <p class="page-desc" v-if="favoriteCount > 0">
          已收藏 {{ favoriteCount }} 个角色
        </p>
        <p class="page-desc" v-else>
          暂无收藏，快去图鉴里挑选喜欢的角色吧~
        </p>
      </div>
      <el-button
        v-if="favoriteCount > 0"
        type="danger"
        plain
        @click="onClearAll"
      >
        清空收藏
      </el-button>
    </div>

    <div v-if="favoriteCount > 0" class="role-grid">
      <RoleCard
        v-for="role in favoriteRoles"
        :key="role.id"
        :role="role"
        from-source="favorites"
      />
    </div>

    <el-empty
      v-else
      description="还没有收藏任何角色"
      :image-size="180"
    >
      <router-link to="/">
        <el-button type="primary">去角色图鉴看看</el-button>
      </router-link>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Star } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import RoleCard from '@/components/RoleCard.vue'
import { useFavoriteStore } from '@/stores/favorite'

const favoriteStore = useFavoriteStore()

const favoriteRoles = computed(() => favoriteStore.favoriteRoles)
const favoriteCount = computed(() => favoriteStore.favoriteCount)

async function onClearAll() {
  try {
    await ElMessageBox.confirm(
      '确定要清空所有收藏吗？此操作无法撤销。',
      '清空收藏',
      {
        confirmButtonText: '确定清空',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
    favoriteStore.clearAllFavorites()
    ElMessage.success('已清空全部收藏')
  } catch {
    // 用户取消操作
  }
}
</script>

<style scoped>
.favorites-view {
  width: 100%;
}

.favorites-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.page-title {
  margin: 0 0 8px;
  font-size: 1.75rem;
  color: #5c3d2e;
  letter-spacing: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  font-size: 1.75rem;
}

.page-desc {
  margin: 0;
  color: #8b7355;
  font-size: 0.95rem;
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
</style>
