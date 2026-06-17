
import { supabase } from '@/lib/supabase'

// Login
const { error } = await supabase.auth.signInWithPassword({ email, password })

// Register
const { error } = await supabase.auth.signUp({ email, password })

// Google OAuth
await supabase.auth.signInWithOAuth({ provider: 'google' })
