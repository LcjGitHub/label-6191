<template>
  <div v-if="role" class="detail-view">
    <el-button class="back-btn" @click="goBack">
      ← {{ backText }}
    </el-button>

    <el-card class="detail-card" shadow="never">
      <div class="detail-layout">
        <div class="detail-silhouette">
          <SilhouetteSvg :path="role.silhouettePath" />
        </div>

        <div class="detail-content">
          <div class="detail-header">
            <h1 class="detail-name">{{ role.name }}</h1>
            <el-tag type="warning" size="large">{{ role.category }}</el-tag>
            <el-button
              class="favorite-btn"
              :type="isFavorited ? 'warning' : 'default'"
              @click="onToggleFavorite"
            >
              <el-icon class="el-icon--left">
                <Star v-if="isFavorited" :fill="'#ffd700'" />
                <Star v-else />
              </el-icon>
              {{ isFavorited ? '已收藏' : '收藏' }}
            </el-button>
          </div>

          <section class="detail-section">
            <h2 class="section-title">别名</h2>
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

          <section class="detail-section">
            <h2 class="section-title">代表剧目</h2>
            <el-card class="play-card" shadow="hover">
              <h3 class="play-title">{{ role.representativePlay.title }}</h3>
              <p class="play-summary">{{ role.representativePlay.summary }}</p>
            </el-card>
          </section>
        </div>
      </div>
    </el-card>

    <SameCategoryRoleList :roles="sameCategoryRoles" />

    <div class="nav-btn-group">
      <el-button
        class="nav-btn nav-btn--prev"
        :disabled="!adjacentRoles.prev"
        @click="goToRole(adjacentRoles.prev)"
      >
        <el-icon class="nav-btn__icon"><ArrowLeft /></el-icon>
        <span class="nav-btn__text">
          <span class="nav-btn__label">上一个</span>
          <span class="nav-btn__name">{{ prevRoleName }}</span>
        </span>
      </el-button>

      <div class="nav-btn__divider"></div>

      <el-button
        class="nav-btn nav-btn--next"
        :disabled="!adjacentRoles.next"
        @click="goToRole(adjacentRoles.next)"
      >
        <span class="nav-btn__text">
          <span class="nav-btn__label">下一个</span>
          <span class="nav-btn__name">{{ nextRoleName }}</span>
        </span>
        <el-icon class="nav-btn__icon"><ArrowRight /></el-icon>
      </el-button>
    </div>
  </div>

  <el-empty v-else description="未找到该角色">
    <el-button type="primary" @click="goBack">返回图鉴</el-button>
  </el-empty>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight, Star } from '@element-plus/icons-vue'
import SilhouetteSvg from '@/components/SilhouetteSvg.vue'
import SameCategoryRoleList from '@/components/SameCategoryRoleList.vue'
import { useShadowPuppetStore } from '@/stores/shadowPuppet'
import { useFavoriteStore } from '@/stores/favorite'

const route = useRoute()
const router = useRouter()
const store = useShadowPuppetStore()
const favoriteStore = useFavoriteStore()

const fromSource = computed(() => route.query.from as string | undefined)
const fromPlayId = computed(() => route.query.playId as string | undefined)

/** 当前角色数据 */
const role = computed(() => {
  const id = route.params.id as string
  return store.getRoleById(id)
})

/** 相邻角色（根据来源决定顺序） */
const adjacentRoles = computed(() => {
  const id = route.params.id as string
  if (fromSource.value === 'favorites') {
    return favoriteStore.getAdjacentFavoriteRoles(id)
  }
  return store.getAdjacentRoles(id)
})

/** 上一个角色名称 */
const prevRoleName = computed(() => {
  if (!adjacentRoles.value.prev) return '无'
  const prevRole = store.getRoleById(adjacentRoles.value.prev)
  return prevRole?.name || '无'
})

/** 下一个角色名称 */
const nextRoleName = computed(() => {
  if (!adjacentRoles.value.next) return '无'
  const nextRole = store.getRoleById(adjacentRoles.value.next)
  return nextRole?.name || '无'
})

/** 切换到指定角色，保持来源上下文 */
function goToRole(roleId: string | null) {
  if (!roleId) return
  const query: Record<string, string> = {}
  if (fromSource.value) {
    query.from = fromSource.value
  }
  if (fromPlayId.value) {
    query.playId = fromPlayId.value
  }
  router.push({ name: 'role-detail', params: { id: roleId }, query })
}

/** 同行情其他角色列表 */
const sameCategoryRoles = computed(() => {
  if (!role.value) return []
  return store.getSameCategoryRoles(role.value.id)
})

const isFavorited = computed(() => {
  if (!role.value) return false
  return favoriteStore.isFavorited(role.value.id)
})

function onToggleFavorite() {
  if (role.value) {
    favoriteStore.toggleFavorite(role.value.id)
  }
}

const backText = computed(() => {
  if (fromSource.value === 'play' && fromPlayId.value) {
    return '返回剧目'
  }
  if (fromSource.value === 'favorites') {
    return '返回收藏夹'
  }
  if (fromSource.value === 'overview') {
    return '返回概览'
  }
  return '返回图鉴'
})

function goBack() {
  if (fromSource.value === 'play' && fromPlayId.value) {
    router.push({ name: 'play-detail', params: { id: fromPlayId.value } })
  } else if (fromSource.value === 'favorites') {
    router.push({ name: 'favorites' })
  } else if (fromSource.value === 'overview') {
    router.push({ name: 'overview' })
  } else {
    router.push({ name: 'home' })
  }
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

.detail-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  align-items: start;
}

.detail-silhouette {
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #fff8e7 0%, #f5e6d3 100%);
  border-radius: 8px;
  padding: 24px;
  border: 2px solid #e8d5c4;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.detail-name {
  margin: 0;
  font-size: 2rem;
  color: #5c3d2e;
  letter-spacing: 4px;
}

.favorite-btn {
  margin-left: auto;
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

.alias-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.alias-tag {
  font-size: 0.9rem;
}

.play-card {
  background: #fdf6ec;
  border: 1px solid #e8d5c4;
}

.play-card :deep(.el-card__body) {
  padding: 16px 20px;
}

.play-title {
  margin: 0 0 12px;
  font-size: 1.25rem;
  color: #5c3d2e;
}

.play-summary {
  margin: 0;
  line-height: 1.8;
  color: #666;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }

  .detail-silhouette {
    height: 240px;
  }

  .favorite-btn {
    margin-left: 0;
  }
}

.nav-btn-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-top: 32px;
  background: #fffef9;
  border: 1px solid #e8d5c4;
  border-radius: 8px;
  padding: 8px;
}

.nav-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 64px;
  border: none;
  background: transparent;
  color: #5c3d2e;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.nav-btn:hover:not(:disabled) {
  background: #fdf6ec;
  color: #8b4513;
}

.nav-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.nav-btn__icon {
  font-size: 1.25rem;
}

.nav-btn__text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.3;
}

.nav-btn--next .nav-btn__text {
  align-items: flex-end;
}

.nav-btn__label {
  font-size: 0.8rem;
  color: #8b7355;
}

.nav-btn__name {
  font-size: 1rem;
  font-weight: 600;
  color: #5c3d2e;
}

.nav-btn__divider {
  width: 1px;
  height: 40px;
  background: #e8d5c4;
  margin: 0 8px;
}

@media (max-width: 768px) {
  .nav-btn-group {
    flex-direction: row;
    padding: 4px;
  }

  .nav-btn {
    height: 56px;
    font-size: 0.85rem;
  }

  .nav-btn__name {
    font-size: 0.9rem;
  }
}
</style>
