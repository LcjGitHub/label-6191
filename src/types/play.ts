import type { RoleCategory } from './shadowPuppet'

export interface Play {
  id: string
  title: string
  category: RoleCategory
  summary: string
  relatedRoleIds: string[]
}
