import { defineStore } from 'pinia'
import mockData from '@/mock/plays.json'
import type { Play } from '@/types/play'
import type { RoleCategory } from '@/types/shadowPuppet'

export const usePlayStore = defineStore('play', () => {
  const plays = mockData as Play[]

  function getPlayById(id: string): Play | undefined {
    return plays.find((p) => p.id === id)
  }

  function getPlaysByCategory(category: RoleCategory | 'all'): Play[] {
    if (category === 'all') return plays
    return plays.filter((p) => p.category === category)
  }

  return {
    plays,
    getPlayById,
    getPlaysByCategory,
  }
})
