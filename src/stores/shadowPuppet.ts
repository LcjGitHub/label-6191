import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import mockData from '@/mock/shadow-puppets.json'
import type { RoleCategory, ShadowPuppet } from '@/types/shadowPuppet'

/** 全部行当分类 */
export const CATEGORIES: RoleCategory[] = ['生', '旦', '净', '丑']

/**
 * 皮影戏角色 Pinia Store
 * 从本地 Mock JSON 加载静态数据
 */
export const useShadowPuppetStore = defineStore('shadowPuppet', () => {
  const roles = mockData as ShadowPuppet[]

  /** 按行当分组的角色列表 */
  const rolesByCategory = computed(() => {
    const map = new Map<RoleCategory, ShadowPuppet[]>()
    for (const cat of CATEGORIES) {
      map.set(cat, roles.filter((r) => r.category === cat))
    }
    return map
  })

  /** 每个行当的角色数量统计 */
  const categoryCount = computed(() => {
    const map = new Map<RoleCategory, number>()
    for (const cat of CATEGORIES) {
      map.set(cat, roles.filter((r) => r.category === cat).length)
    }
    return map
  })

  /**
   * 根据 ID 查找角色
   * @param id - 角色唯一标识
   */
  function getRoleById(id: string): ShadowPuppet | undefined {
    return roles.find((r) => r.id === id)
  }

  /**
   * 按行当随机抽取一个代表角色
   * @param category - 行当分类
   */
  function getRandomRoleByCategory(category: RoleCategory): ShadowPuppet | undefined {
    const list = roles.filter((r) => r.category === category)
    if (list.length === 0) return undefined
    const idx = Math.floor(Math.random() * list.length)
    return list[idx]
  }

  /**
   * 按行当筛选角色
   * @param category - 行当分类，传 'all' 返回全部
   */
  function getRolesByCategory(category: RoleCategory | 'all'): ShadowPuppet[] {
    if (category === 'all') return roles
    return roles.filter((r) => r.category === category)
  }

  /** 对比选中的角色 ID 列表（最多两个） */
  const compareRoleIds = ref<string[]>([])

  /**
   * 设置对比位置的角色
   * @param index - 对比位置索引（0 或 1）
   * @param roleId - 角色 ID，传空字符串清除该位置
   */
  function setCompareRole(index: 0 | 1, roleId: string) {
    const ids = [...compareRoleIds.value]
    while (ids.length < 2) ids.push('')
    ids[index] = roleId
    compareRoleIds.value = ids.slice(0, 2)
  }

  /** 清除所有对比选择 */
  function clearCompareRoles() {
    compareRoleIds.value = []
  }

  /** 两个对比位置的角色数据（可能为 undefined） */
  const compareRoles = computed<(ShadowPuppet | undefined)[]>(() => {
    while (compareRoleIds.value.length < 2) compareRoleIds.value.push('')
    return compareRoleIds.value.slice(0, 2).map((id) => (id ? getRoleById(id) : undefined))
  })

  /** 是否两个对比位置都已选中有效角色 */
  const isCompareReady = computed(() => {
    return compareRoles.value.every((r) => r !== undefined)
  })

  /**
   * 对比两位角色的行当差异
   * 返回对比结果摘要，供面板展示
   */
  const compareSummary = computed(() => {
    const [r1, r2] = compareRoles.value
    if (!r1 || !r2) return null
    return {
      sameCategory: r1.category === r2.category,
      commonAliases: r1.aliases.filter((a) => r2.aliases.includes(a)),
      aliasCountDiff: Math.abs(r1.aliases.length - r2.aliases.length),
      samePlay: r1.representativePlay.title === r2.representativePlay.title,
    }
  })

  /**
   * 获取除指定角色外的全部角色列表（用于下拉选择时排除已选角色）
   * @param excludeId - 要排除的角色 ID（可选）
   */
  function getRolesForSelect(excludeId?: string): ShadowPuppet[] {
    if (!excludeId) return roles
    return roles.filter((r) => r.id !== excludeId)
  }

  return {
    roles,
    rolesByCategory,
    categoryCount,
    compareRoleIds,
    compareRoles,
    isCompareReady,
    compareSummary,
    getRoleById,
    getRolesByCategory,
    getRandomRoleByCategory,
    setCompareRole,
    clearCompareRoles,
    getRolesForSelect,
  }
})
