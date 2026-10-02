'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const supabase = createClient(cookies())

  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect(`/login?error=${encodeURIComponent("Please enter both email and password")}`)
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = createClient(cookies())

  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect(`/login?error=${encodeURIComponent("Please enter both email and password")}`)
  }

  if (password.length < 6) {
    return redirect(`/login?error=${encodeURIComponent("Password must be at least 6 characters")}`)
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  if (data?.session) {
    revalidatePath('/', 'layout')
    redirect('/onboarding')
  }

  // If email confirmation is required by Supabase settings, try immediate sign in
  const signInAttempt = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInAttempt.data?.session) {
    revalidatePath('/', 'layout')
    redirect('/onboarding')
  }

  return redirect(`/login?error=${encodeURIComponent("Account created! If email confirmation is enabled in your Supabase project, please check your inbox, then sign in.")}`)
}

export async function logout() {
  const supabase = createClient(cookies())
  await supabase.auth.signOut()
  redirect('/login')
}
