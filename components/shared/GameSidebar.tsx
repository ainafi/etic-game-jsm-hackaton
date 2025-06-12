"use client"

import { useQuery } from '@tanstack/react-query'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar"

import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu' // ✅ import corrigé

import { User2, ChevronUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { fetchGame } from '@/lib/fetchGame'
import { Button } from '../ui/button'
import { authClient } from '@/lib/auth-client'
import useAuthStore from '@/store/useAuth'

interface IGenre {
  id: number
  name: string
}

const GameSidebar = () => {
  const user = useAuthStore((state) => state.user)
  const clearUser = useAuthStore((state) => state.clearUser)
  const [isSelected, setIsSelected] = useState("Genre")
  const router = useRouter()

  const { isLoading, data, error } = useQuery<{ results: IGenre[] }, Error>({
    queryKey: ["genres"],
    queryFn: () => fetchGame(`genres`),
    refetchInterval: 100,
  })

  const handleLogout = async () => {
    try {
      await authClient.signOut()
      clearUser()
      toast({ title: "Logged out successfully" })
      router.push("/sign-in")
    } catch (error) {
      toast({ title: "Logout failed", description: "Try again later" })
    }
  }

  if (isLoading) {
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Genre</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Array.from({ length: 5 }).map((_, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }

  if (error) return <div>Error: {error.message}</div>

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Genre</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data?.results.map((genre) => (
                <SidebarMenuItem key={genre.id}>
                  <SidebarMenuButton asChild>
                    <span
                      onClick={() => setIsSelected(genre.name)}
                      className={`cursor-pointer px-2 py-1 rounded ${
                        isSelected === genre.name ? "bg-white text-black" : ""
                      }`}
                    >
                      {genre.name}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.data?.user?.name || "Anonymous"}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width] mx-4">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant="destructive" className="w-full" onClick={handleLogout}>
                    Sign out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default GameSidebar
