<template>
  <div class="compare-view">
    <header class="page-header">
      <h1 class="page-title">
        <el-icon><Histogram /></el-icon>
        <span>角色对比</span>
      </h1>
      <p class="page-desc">选择两位皮影戏角色，对比其行当、别名与代表剧目</p>
    </header>

    <el-card class="selector-card" shadow="never">
      <div class="selector-grid">
        <div class="selector-item">
          <label class="selector-label">
            <el-icon><UserFilled /></el-icon>
            <span>角色一（左侧）</span>
          </label>
          <el-select
            v-model="selectedIdA"
            placeholder="请选择第一位角色"
            size="large"
            filterable
            clearable
            class="selector-select"
          >
            <el-option
              v-for="role in optionsA"
              :key="role.id"
              :label="formatOptionLabel(role)"
              :value="role.id"
            >
              <span class="option-name">{{ role.name }}</span>
              <el-tag size="small" type="warning" effect="plain">
                {{ role.category }}
              </el-tag>
            </el-option>
          </el-select>
        </div>

        <div class="selector-divider" aria-hidden="true">
          <el-icon :size="24" color="#d4a574"><Switch /></el-icon>
        </div>

        <div class="selector-item">
          <label class="selector-label">
            <el-icon><UserFilled /></el-icon>
            <span>角色二（右侧）</span>
          </label>
          <el-select
            v-model="selectedIdB"
            placeholder="请选择第二位角色"
            size="large"
            filterable
            clearable
            class="selector-select"
          >
            <el-option
              v-for="role in optionsB"
              :key="role.id"
              :label="formatOptionLabel(role)"
              :value="role.id"
            >
              <span class="option-name">{{ role.name }}</span>
              <el-tag size="small" type="warning" effect="plain">
                {{ role.category }}
              </el-tag>
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="selector-actions">
        <el-button
          type="primary"
          size="large"
          :disabled="!isBothSelected"
          @click="onStartCompare"
        >
          <el-icon class="el-icon--left"><View /></el-icon>
          开始对比
        </el-button>
        <el-button
          size="large"
          :disabled="!hasAnySelection"
          @click="onClearAll"
        >
          <el-icon class="el-icon--left"><RefreshRight /></el-icon>
          重置选择
        </el-button>
      </div>

      <Transition name="fade">
        <div v-if="store.compareSummary" class="compare-summary">
          <div class="summary-item">
            <span class="summary-label">行当对比：</span>
            <el-tag
              :type="store.compareSummary.sameCategory ? 'success' : 'info'"
              size="small"
            >
              {{ store.compareSummary.sameCategory ? '相同行当' : '不同行当' }}
            </el-tag>
          </div>
          <div v-if="store.compareSummary.commonAliases.length > 0" class="summary-item">
            <span class="summary-label">共同别名（{{ store.compareSummary.commonAliases.length }}）：</span>
            <el-tag
              v-for="alias in store.compareSummary.commonAliases"
              :key="alias"
              size="small"
              type="warning"
              effect="plain"
            >
              {{ alias }}
            </el-tag>
          </div>
          <div class="summary-item">
            <span class="summary-label">代表剧目：</span>
            <el-tag
              :type="store.compareSummary.samePlay ? 'success' : 'warning'"
              size="small"
            >
              {{ store.compareSummary.samePlay ? '同一名剧' : '不同剧目' }}
            </el-tag>
          </div>
        </div>
      </Transition>
    </el-card>

    <RoleComparePanel
      :role-a="roleA"
      :role-b="roleB"
      label-a="角色一"
      label-b="角色二"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import {
  Histogram,
  UserFilled,
  Switch,
  RefreshRight,
  View,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import RoleComparePanel from '@/components/RoleComparePanel.vue'
import { useShadowPuppetStore } from '@/stores/shadowPuppet'
import type { ShadowPuppet } from '@/types/shadowPuppet'

const store = useShadowPuppetStore()

const selectedIdA = computed({
  get: () => store.compareRoleIds[0] ?? '',
  set: (val: string) => store.setCompareRole(0, val || ''),
})

const selectedIdB = computed({
  get: () => store.compareRoleIds[1] ?? '',
  set: (val: string) => store.setCompareRole(1, val || ''),
})

const roleA = computed(() => store.compareRoles[0])
const roleB = computed(() => store.compareRoles[1])

const optionsA = computed(() => store.getRolesForSelect(selectedIdB.value || undefined))
const optionsB = computed(() => store.getRolesForSelect(selectedIdA.value || undefined))

const hasAnySelection = computed(() => selectedIdA.value || selectedIdB.value)
const isBothSelected = computed(() => selectedIdA.value && selectedIdB.value)

function formatOptionLabel(role: ShadowPuppet): string {
  return `${role.name}（${role.category}）`
}

function onStartCompare() {
  ElMessage.success('已加载两位角色对比信息')
}

function onClearAll() {
  store.clearCompareRoles()
  ElMessage.info('已重置对比选择')
}

watch(
  () => [selectedIdA.value, selectedIdB.value],
  ([idA, idB]) => {
    if (idA && idB && idA === idB) {
      ElMessage.warning('不能选择同一个角色进行对比')
    }
  },
)

onMounted(() => {
  store.clearCompareRoles()
})
</script>

<style scoped>
.compare-view {
  width: 100%;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  margin: 0 0 8px;
  font-size: 1.75rem;
  color: #5c3d2e;
  letter-spacing: 4px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-title .el-icon {
  font-size: 1.5rem;
  color: #d4a574;
}

.page-desc {
  margin: 0;
  color: #8b7355;
  font-size: 0.95rem;
}

.selector-card {
  margin-bottom: 28px;
  border: 1px solid #e8d5c4;
  background: #fffef9;
}

.selector-card :deep(.el-card__body) {
  padding: 24px;
}

.selector-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: end;
  margin-bottom: 20px;
}

.selector-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.selector-label {
  font-size: 0.9rem;
  color: #8b4513;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 1px;
}

.selector-label .el-icon {
  color: #d4a574;
}

.selector-select {
  width: 100%;
}

.option-name {
  color: #5c3d2e;
  margin-right: 8px;
}

.selector-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 4px;
}

.selector-actions {
  display: flex;
  gap: 12px;
  padding-top: 8px;
  border-top: 1px dashed #e8d5c4;
}

.compare-summary {
  margin-top: 20px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #fdf6ec 0%, #f5e6d3 100%);
  border-radius: 8px;
  border: 1px solid #e8d5c4;
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.summary-label {
  font-size: 0.85rem;
  color: #8b4513;
  font-weight: 600;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 768px) {
  .selector-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .selector-divider {
    padding: 0;
    transform: rotate(90deg);
  }

  .compare-summary {
    flex-direction: column;
    align-items: flex-start;
  }

  .selector-actions {
    flex-direction: column;
  }
}
</style>
