<template>
  <section v-if="roles.length > 0" class="same-category-section">
    <h2 class="section-title">同行情角色</h2>
    <div class="scroll-container">
      <div
        v-for="role in roles"
        :key="role.id"
        class="mini-role-card"
        @click="goDetail(role.id)"
      >
        <div class="mini-role-card__silhouette">
          <SilhouetteSvg :path="role.silhouettePath" />
        </div>
        <div class="mini-role-card__name">{{ role.name }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import SilhouetteSvg from './SilhouetteSvg.vue'
import type { ShadowPuppet } from '@/types/shadowPuppet'

defineProps<{
  roles: ShadowPuppet[]
}>()

const router = useRouter()

function goDetail(id: string) {
  router.push({ name: 'role-detail', params: { id } })
}
</script>

<style scoped>
.same-category-section {
  margin-top: 32px;
}

.section-title {
  margin: 0 0 16px;
  font-size: 1.15rem;
  color: #8b4513;
  border-left: 3px solid #ffd700;
  padding-left: 10px;
}

.scroll-container {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 8px 4px 16px;
  scrollbar-width: thin;
  scrollbar-color: #d4a574 transparent;
}

.scroll-container::-webkit-scrollbar {
  height: 6px;
}

.scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #d4a574;
  border-radius: 3px;
}

.mini-role-card {
  flex: 0 0 140px;
  cursor: pointer;
  background: #fffef9;
  border: 1px solid #e8d5c4;
  border-radius: 8px;
  padding: 16px 12px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mini-role-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.15);
}

.mini-role-card__silhouette {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #fff8e7 0%, #f5e6d3 100%);
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 8px;
}

.mini-role-card__name {
  font-size: 1rem;
  color: #5c3d2e;
  margin: 0;
}

@media (max-width: 768px) {
  .mini-role-card {
    flex: 0 0 120px;
  }

  .mini-role-card__silhouette {
    height: 80px;
  }

  .mini-role-card__name {
    font-size: 0.9rem;
  }
}
</style>
