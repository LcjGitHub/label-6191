/** 行当分类：生旦净丑 */
export type RoleCategory = '生' | '旦' | '净' | '丑'

/** 代表剧目信息 */
export interface RepresentativePlay {
  title: string
  summary: string
}

/** 皮影戏角色 */
export interface ShadowPuppet {
  id: string
  name: string
  category: RoleCategory
  aliases: string[]
  silhouettePath: string
  representativePlay: RepresentativePlay
}
