import { defineStore } from 'pinia'
import { computed } from 'vue'
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

  return {
    roles,
    rolesByCategory,
    categoryCount,
    getRoleById,
    getRolesByCategory,
    getRandomRoleByCategory,
  }
})
