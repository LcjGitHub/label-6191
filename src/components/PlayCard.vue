<template>
  <el-card
    class="play-card"
    shadow="hover"
    @click="goDetail"
  >
    <div class="play-card__header">
      <h3 class="play-card__title">{{ play.title }}</h3>
      <el-tag size="small" type="warning">{{ play.category }}</el-tag>
    </div>
    <p class="play-card__summary">{{ truncatedSummary }}</p>
    <div class="play-card__roles">
      <span class="play-card__label">参演角色：</span>
      <div class="play-card__role-tags">
        <el-tag
          v-for="role in relatedRoles"
          :key="role.id"
          size="small"
          class="play-card__role-tag"
          effect="plain"
          @click.stop="goRoleDetail(role.id)"
        >
          {{ role.name }}
        </el-tag>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Play } from '@/types/play'
import { useShadowPuppetStore } from '@/stores/shadowPuppet'

const props = defineProps<{
  play: Play
}>()

const router = useRouter()
const puppetStore = useShadowPuppetStore()

const relatedRoles = computed(() =>
  props.play.relatedRoleIds
    .map((id) => puppetStore.getRoleById(id))
    .filter((r) => r !== undefined),
)

const truncatedSummary = computed(() => {
  const summary = props.play.summary
  return summary.length > 80 ? summary.slice(0, 80) + '...' : summary
})

function goDetail() {
  router.push({ name: 'play-detail', params: { id: props.play.id } })
}

function goRoleDetail(roleId: string) {
  router.push({ name: 'role-detail', params: { id: roleId } })
}
</script>

<style scoped>
.play-card {
  cursor: pointer;
  transition: transform 0.2s ease;
  border: 1px solid #e8d5c4;
  background: #fffef9;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.play-card:hover {
  transform: translateY(-4px);
}

.play-card :deep(.el-card__body) {
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.play-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.play-card__title {
  margin: 0;
  font-size: 1.1rem;
  color: #5c3d2e;
}

.play-card__summary {
  margin: 0 0 12px;
  font-size: 0.85rem;
  color: #666;
  line-height: 1.6;
  flex: 1;
}

.play-card__roles {
  border-top: 1px dashed #e8d5c4;
  padding-top: 12px;
}

.play-card__label {
  font-size: 0.8rem;
  color: #8b7355;
  display: block;
  margin-bottom: 6px;
}

.play-card__role-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.play-card__role-tag {
  cursor: pointer;
}

.play-card__role-tag:hover {
  opacity: 0.8;
}
</style>
