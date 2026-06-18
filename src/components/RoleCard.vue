<template>
  <el-card
    class="role-card"
    shadow="hover"
    @click="goDetail"
  >
    <el-button
      class="favorite-btn"
      :type="isFavorited ? 'warning' : 'default'"
      :text="!isFavorited"
      :aria-label="isFavorited ? '取消收藏' : '收藏'"
      circle
      @click.stop="onToggleFavorite"
    >
      <el-icon :size="16">
        <Star v-if="isFavorited" :fill="'#ffd700'" />
        <Star v-else />
      </el-icon>
    </el-button>
    <div class="role-card__silhouette">
      <SilhouetteSvg :path="role.silhouettePath" />
    </div>
    <div class="role-card__info">
      <h3 class="role-card__name">{{ role.name }}</h3>
      <el-tag size="small" type="warning">{{ role.category }}</el-tag>
      <p class="role-card__play">{{ role.representativePlay.title }}</p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Star } from '@element-plus/icons-vue'
import SilhouetteSvg from './SilhouetteSvg.vue'
import type { ShadowPuppet } from '@/types/shadowPuppet'
import { useFavoriteStore } from '@/stores/favorite'

const props = defineProps<{
  role: ShadowPuppet
  fromSource?: string
}>()

const router = useRouter()
const favoriteStore = useFavoriteStore()

const isFavorited = computed(() => favoriteStore.isFavorited(props.role.id))

function onToggleFavorite() {
  favoriteStore.toggleFavorite(props.role.id)
}

function goDetail() {
  const query: Record<string, string> = {}
  if (props.fromSource) {
    query.from = props.fromSource
  }
  router.push({ name: 'role-detail', params: { id: props.role.id }, query })
}
</script>

<style scoped>
.role-card {
  cursor: pointer;
  transition: transform 0.2s ease;
  border: 1px solid #e8d5c4;
  background: #fffef9;
  position: relative;
}

.role-card:hover {
  transform: translateY(-4px);
}

.role-card :deep(.el-card__body) {
  padding: 16px;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  --el-button-hover-text-color: #ffd700;
}

.role-card__silhouette {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #fff8e7 0%, #f5e6d3 100%);
  border-radius: 4px;
  margin-bottom: 12px;
  padding: 8px;
}

.role-card__info {
  text-align: center;
}

.role-card__name {
  margin: 0 0 8px;
  font-size: 1.1rem;
  color: #5c3d2e;
}

.role-card__play {
  margin: 8px 0 0;
  font-size: 0.85rem;
  color: #8b7355;
}
</style>
