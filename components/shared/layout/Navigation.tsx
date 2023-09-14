'use client'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import PhakeButton from '../common/Button'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export default function Navigation({}) {
  const sb = createClientComponentClient()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await sb.auth.getUser()
      if (user) {
        setUser(user)
      }
    }
  }, [])

  return (
    <div className="bg-white border-b px-4 py-2">
      <div className="container mx-auto">
        <NavigationMenu>
          <NavigationMenuList>
            {!user ? (
              <NavigationMenuItem>
                <PhakeButton href="/u/signin">Sign In</PhakeButton>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <PhakeButton onClick={() => {}}>Sign out</PhakeButton>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
