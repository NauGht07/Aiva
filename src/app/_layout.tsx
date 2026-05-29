import { initLocalDatabase } from '@/lib/database';
import { supabase } from '@/lib/supabase';
import { Slot, router } from 'expo-router';
import { useEffect, useState, } from 'react';


export default function TabLayout() {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    initLocalDatabase()
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('./(app)/home')
      } else {
        router.replace('./(auth)/login')
      }
      setInitialized(true)
    })
  }, [])

  if (!initialized) return null

  return <Slot />
}