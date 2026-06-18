import { defineStore } from 'pinia'
import mockData from '@/mock/culture-chapters.json'
import type { CultureChapter } from '@/types/culture'

export const useCultureStore = defineStore('culture', () => {
  const chapters = mockData as CultureChapter[]

  function getChapterById(id: string): CultureChapter | undefined {
    return chapters.find((c) => c.id === id)
  }

  return {
    chapters,
    getChapterById,
  }
})
