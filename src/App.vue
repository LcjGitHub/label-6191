<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="app-header__left">
        <router-link to="/" class="app-title">皮影戏角色图鉴</router-link>
        <span class="app-subtitle">生 · 旦 · 净 · 丑</span>
      </div>
      <nav class="app-nav">
        <router-link
          to="/"
          class="app-nav__link"
          :class="{ 'is-active': isRoleActive }"
        >
          角色图鉴
        </router-link>
        <router-link
          to="/plays"
          class="app-nav__link"
          :class="{ 'is-active': isPlayActive }"
        >
          剧目百科
        </router-link>
        <router-link
          to="/overview"
          class="app-nav__link"
          :class="{ 'is-active': isOverviewActive }"
        >
          <el-icon class="el-icon--left">
            <DataLine />
          </el-icon>
          统计概览
        </router-link>
        <router-link
          to="/favorites"
          class="app-nav__link"
          :class="{ 'is-active': isFavoriteActive }"
        >
          <el-icon class="el-icon--left">
            <Star :fill="isFavoriteActive ? '#8b4513' : 'none'" />
          </el-icon>
          收藏夹
          <el-badge
            v-if="favoriteCount > 0"
            :value="favoriteCount"
            :max="99"
            class="fav-badge"
          />
        </router-link>
      </nav>
    </header>
    <main class="app-main">
      <router-view />
    </main>
    <footer class="app-footer">
      纯静态 Mock 数据 · 仅供浏览
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Star, DataLine } from '@element-plus/icons-vue'
import { useFavoriteStore } from '@/stores/favorite'

const route = useRoute()
const favoriteStore = useFavoriteStore()

const favoriteCount = computed(() => favoriteStore.favoriteCount)

const isRoleActive = computed(() => {
  if (route.name === 'home') return true
  if (route.name === 'role-detail' && route.query.from !== 'play' && route.query.from !== 'favorites' && route.query.from !== 'overview') return true
  return false
})

const isPlayActive = computed(() => {
  if (route.name === 'play-list' || route.name === 'play-detail') return true
  if (route.name === 'role-detail' && route.query.from === 'play') return true
  return false
})

const isOverviewActive = computed(() => {
  if (route.name === 'overview') return true
  if (route.name === 'role-detail' && route.query.from === 'overview') return true
  return false
})

const isFavoriteActive = computed(() => {
  if (route.name === 'favorites') return true
  if (route.name === 'role-detail' && route.query.from === 'favorites') return true
  return false
})
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #fdf6ec 0%, #f5e6d3 100%);
}

.app-header {
  padding: 20px 24px;
  background: #8b4513;
  color: #ffd700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.app-header__left {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd700;
  text-decoration: none;
  letter-spacing: 2px;
}

.app-title:hover {
  color: #fff;
}

.app-subtitle {
  font-size: 0.9rem;
  opacity: 0.85;
}

.app-nav {
  display: flex;
  gap: 8px;
  align-items: center;
}

.app-nav__link {
  padding: 8px 16px;
  color: #ffd700;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.app-nav__link:hover {
  background: rgba(255, 215, 0, 0.15);
}

.app-nav__link.is-active {
  background: #ffd700;
  color: #8b4513;
  font-weight: 600;
}

.fav-badge {
  margin-left: 12px;
  --el-badge-bg-color: #ff6b6b;
  --el-badge-text-color: #fff;
}

.app-main {
  flex: 1;
  padding: 24px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.app-footer {
  padding: 12px;
  text-align: center;
  font-size: 0.8rem;
  color: #8b7355;
  border-top: 1px solid #e8d5c4;
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .app-nav {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
</style>
