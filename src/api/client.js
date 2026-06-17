
import { supabase } from '@/lib/supabase'

// Generic entity helper - same interface as base44
const makeEntity = (tableName) => ({
  async list(sortBy = 'created_at', limit = 100) {
    const ascending = !sortBy.startsWith('-')
    const col = sortBy.replace('-', '')
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order(col, { ascending })
      .limit(limit)
    if (error) throw error
    return data
  },

  async filter(filters = {}, sortBy = 'created_at', limit = 100) {
    const ascending = !sortBy.startsWith('-')
    const col = sortBy.replace('-', '')
    let query = supabase.from(tableName).select('*')
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
    const { data, error } = await query.order(col, { ascending }).limit(limit)
    if (error) throw error
    return data
  },

  async create(payload) {
    const { data, error } = await supabase.from(tableName).insert(payload).select().single()
    if (error) throw error
    return data
  },

  async update(id, payload) {
    const { data, error } = await supabase.from(tableName).update(payload).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async delete(id) {
    const { error } = await supabase.from(tableName).delete().eq('id', id)
    if (error) throw error
  },
})

export const entities = {
  Officer: makeEntity('officers'),
  Conference: makeEntity('conferences'),
  NewsArticle: makeEntity('news_articles'),
  MembershipApplication: makeEntity('membership_applications'),
  NewsletterSubscriber: makeEntity('newsletter_subscribers'),
  College: makeEntity('colleges'),
  Chapter: makeEntity('chapters'),
  JournalDepartment: makeEntity('journal_departments'),
}

export const auth = {
  async me() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')
    return { id: user.id, email: user.email, full_name: user.user_metadata?.full_name, role: user.user_metadata?.role || 'user' }
  },
  async isAuthenticated() {
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
  },
  async logout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  },
}
