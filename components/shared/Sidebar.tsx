"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"

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

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User2, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

import useGenre from "@/store/useGenre"
import useAuthStore from "@/store/useAuth"
import { authClient } from "@/lib/auth-client"
import { fetchData } from "@/lib/fetchdata"

interface IGenre {
  id: number
  name: string
}

const AppSidebar = () => {
  const user = useAuthStore((state) => state.user)
  const clearUser = useAuthStore((state) => state.clearUser)
  const { genre, setgenre } = useGenre()  // <-- ajout de setgenre ici
  const [isSelected, setIsSelected] = useState(genre || "Genre")
  const router = useRouter()
  
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

  const { isLoading, data, error } = useQuery({
    queryKey: ["genres"],
    queryFn: () => fetchData(`genre/${genre}/list`),
    refetchInterval: 100,
  })


  console.log(data)
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

  if (error) return <div className="text-red-500 p-4">Error: {(error as Error).message}</div>

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Genre</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.genres.map((genreItem: IGenre) => (
                <SidebarMenuItem key={genreItem.id}>
                  <SidebarMenuButton asChild>
                    <span
                      onClick={() => {
                        setIsSelected(genreItem.name)  // local pour l’UI
                        setgenre(genreItem.name)       // global pour le store Zustand
                      }}
                      className={`cursor-pointer px-2 py-1 rounded-md ${
                        isSelected === genreItem.name ? "bg-white text-black" : "hover:bg-gray-200"
                      }`}
                    >
                      {genreItem.name}
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
                  <User2 className="mr-2" />
                  {user?.name || "Anonymous"}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-full bg-white p-2 rounded shadow-md">
                <DropdownMenuItem asChild>
                  <Button onClick={handleLogout} variant="destructive" className="w-full justify-start">
                    Logout
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

export default AppSidebar
