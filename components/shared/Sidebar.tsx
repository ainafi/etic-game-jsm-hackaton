"use client"
import { fetchData } from '@/lib/fetchdata'
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
import { DropdownMenuTrigger } from '../ui/dropdown-menu'
import { User2, ChevronUp } from 'lucide-react'
import { logout } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { Button } from '../ui/button'
import useGenre from '@/store/useGenre'

interface Igenre{
  id:number
  name:string
}
const AppSidebar = () => {
  const {genre}=useGenre()
  const [isSelected,setIsSelected]=useState("Genre")
  const router=useRouter()
  const {isLoading,data,error}=useQuery({
    queryKey:["genres"],
    queryFn:()=>fetchData(`genre/${genre}/list`),
    refetchInterval:100
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
  const handleLogout=async ()=>{
    try {
      await logout()
      router.push("/")
      toast({title:"logout success",variant:"default"})
      console.log("logout success")
      
    } catch (error) {
      console.error(error)
      toast({title:"logout faild",variant:"destructive"})
    }
  }
  return (
  
      <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Genre</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.genres.map((genres:Igenre) => (
                <SidebarMenuItem key={genres.id}>
                  <SidebarMenuButton asChild>
                      <span onClick={()=>setIsSelected(genres.name)} className={`${isSelected === genres.name ? "bg-white text-black" : ""} cursor-pointer`}>{genres.name}</span>
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
              <DropdownMenu >
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

export default AppSidebar
