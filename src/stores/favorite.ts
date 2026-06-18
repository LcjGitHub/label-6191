import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { ShadowPuppet } from '@/types/shadowPuppet'
import { useShadowPuppetStore } from './shadowPuppet'

const STORAGE_KEY = 'shadow-puppet-favorites'

function loadFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        return parsed.filter((id) => typeof id === 'string')
      }
    }
  } catch (e) {
    console.warn('读取收藏数据失败', e)
  }
  return []
}

function saveToStorage(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch (e) {
    console.warn('保存收藏数据失败', e)
  }
}

export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteIds = ref<string[]>(loadFromStorage())

  watch(
    favoriteIds,
    (ids) => {
      saveToStorage(ids)
    },
    { deep: true },
  )

  const favoriteCount = computed(() => favoriteIds.value.length)

  const favoriteRoles = computed<ShadowPuppet[]>(() => {
    const puppetStore = useShadowPuppetStore()
    return favoriteIds.value
      .map((id) => puppetStore.getRoleById(id))
      .filter((r): r is ShadowPuppet => !!r)
  })

  function isFavorited(id: string): boolean {
    return favoriteIds.value.includes(id)
  }

  function addFavorite(id: string) {
    if (!isFavorited(id)) {
      favoriteIds.value.push(id)
    }
  }

  function removeFavorite(id: string) {
    const idx = favoriteIds.value.indexOf(id)
    if (idx !== -1) {
      favoriteIds.value.splice(idx, 1)
    }
  }

  function toggleFavorite(id: string) {
    if (isFavorited(id)) {
      removeFavorite(id)
    } else {
      addFavorite(id)
    }
  }

  function clearAllFavorites() {
    favoriteIds.value.splice(0, favoriteIds.value.length)
  }

  /**
   * 获取相邻收藏角色的编号（按收藏顺序）
   * @param roleId - 当前角色 ID
   * @returns 上一个和下一个收藏角色的 ID，没有则返回 null
   */
  function getAdjacentFavoriteRoles(roleId: string): { prev: string | null; next: string | null } {
    const index = favoriteIds.value.indexOf(roleId)
    if (index === -1) return { prev: null, next: null }
    const prev = index > 0 ? favoriteIds.value[index - 1] : null
    const next = index < favoriteIds.value.length - 1 ? favoriteIds.value[index + 1] : null
    return { prev, next }
  }

  return {
    favoriteIds,
    favoriteCount,
    favoriteRoles,
    isFavorited,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearAllFavorites,
    getAdjacentFavoriteRoles,
  }
})
