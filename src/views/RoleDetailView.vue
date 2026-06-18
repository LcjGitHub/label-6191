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
  </div>

  <el-empty v-else description="未找到该角色">
    <el-button type="primary" @click="goBack">返回图鉴</el-button>
  </el-empty>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Star } from '@element-plus/icons-vue'
import SilhouetteSvg from '@/components/SilhouetteSvg.vue'
import SameCategoryRoleList from '@/components/SameCategoryRoleList.vue'
import { useShadowPuppetStore } from '@/stores/shadowPuppet'
import { useFavoriteStore } from '@/stores/favorite'

const route = useRoute()
const router = useRouter()
const store = useShadowPuppetStore()
const favoriteStore = useFavoriteStore()

/** 当前角色数据 */
const role = computed(() => {
  const id = route.params.id as string
  return store.getRoleById(id)
})

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

const fromSource = computed(() => route.query.from as string | undefined)
const fromPlayId = computed(() => route.query.playId as string | undefined)

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
</style>
