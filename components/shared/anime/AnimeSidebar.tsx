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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { User2, ChevronUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { fetchDataAnime } from '@/lib/fetchAnime'

interface IGenre {
  mal_id: number
  name: string
}

const AnimeSidebar = () => {
  const [isSelected, setIsSelected] = useState("Genre")
  const router = useRouter()
  const { isLoading, data, error } = useQuery({
    queryKey: ["genres"],
    queryFn: () => fetchDataAnime(`/genres/anime`),
    refetchInterval: 100
  })


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

  const handleLogout = async () => {
    try {
     
      router.push("/")
      toast({ title: "Logout success", variant: "default" })
    } catch (error) {
      console.error(error)
      toast({ title: "Logout failed", variant: "destructive" })
    }
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Genre</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Array.isArray(data?.data) && data.data.map((genre: IGenre) => (
                <SidebarMenuItem key={genre.mal_id}>
                  <SidebarMenuButton asChild>
                    <span
                      onClick={() => setIsSelected(genre.name)}
                      className={`${isSelected === genre.name ? "bg-white text-black" : ""} cursor-pointer`}
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
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] mx-4"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button className='bg-red my-2' onClick={handleLogout}>Sign out</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AnimeSidebar
