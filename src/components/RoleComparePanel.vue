<template>
  <div class="compare-panel">
    <div class="compare-panel__grid">
      <RoleDisplayCard
        :role="roleA"
        position="left"
        :label="labelA"
      />
      <div class="compare-panel__divider" aria-hidden="true">
        <div class="vs-badge">VS</div>
      </div>
      <RoleDisplayCard
        :role="roleB"
        position="right"
        :label="labelB"
      />
    </div>

    <div v-if="!roleA || !roleB" class="compare-panel__empty">
      <el-empty
        :description="emptyText"
        :image-size="120"
      >
        <template #image>
          <el-icon :size="80" color="#d4a574">
            <Promotion />
          </el-icon>
        </template>
      </el-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import type { ShadowPuppet } from '@/types/shadowPuppet'
import RoleDisplayCard from './RoleDisplayCard.vue'

const props = withDefaults(
  defineProps<{
    roleA: ShadowPuppet | undefined
    roleB: ShadowPuppet | undefined
    labelA?: string
    labelB?: string
  }>(),
  {
    labelA: '角色一',
    labelB: '角色二',
  },
)

const emptyText = computed(() => {
  if (!props.roleA && !props.roleB) {
    return '请从上方选择两位角色开始对比'
  }
  if (!props.roleA) {
    return '请选择左侧角色'
  }
  return '请选择右侧角色'
})
</script>

<style scoped>
.compare-panel {
  width: 100%;
}

.compare-panel__grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: stretch;
  margin-bottom: 16px;
}

.compare-panel__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.compare-panel__divider::before,
.compare-panel__divider::after {
  content: '';
  position: absolute;
  width: 1px;
  height: calc(50% - 36px);
  background: linear-gradient(180deg, transparent, #e8d5c4);
}

.compare-panel__divider::before {
  top: 0;
}

.compare-panel__divider::after {
  bottom: 0;
  transform: rotate(180deg);
}

.vs-badge {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
  color: #5c3d2e;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(255, 179, 71, 0.4);
  z-index: 1;
  border: 3px solid #fffef9;
}

.compare-panel__empty {
  background: #fffef9;
  border: 1px dashed #d4a574;
  border-radius: 8px;
  padding: 32px;
}

@media (max-width: 960px) {
  .compare-panel__grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .compare-panel__divider {
    padding: 4px 0;
  }

  .compare-panel__divider::before,
  .compare-panel__divider::after {
    width: calc(50% - 36px);
    height: 1px;
  }

  .compare-panel__divider::before {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  .compare-panel__divider::after {
    top: 50%;
    right: 0;
    left: auto;
    bottom: auto;
    transform: translateY(-50%);
  }

  .vs-badge {
    width: 48px;
    height: 48px;
    font-size: 1rem;
  }
}
</style>
