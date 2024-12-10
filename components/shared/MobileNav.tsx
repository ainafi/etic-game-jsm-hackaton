import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchData } from '@/lib/fetchdata'
interface Igenre{
    id:number
    name:string
  }
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
const MobileNav = () => {
    const [isSelected,setIsSelected]=useState("Genre")
    const {isLoading,data,error}=useQuery({
        queryKey:["genres"],
        queryFn:()=>fetchData("genre/movie/list")
      })
      if(isLoading){
        return <div>Loading</div>
      }
      if(error){
        return <div>Error</div>
      }
  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger className='w-full'>
                <Button className='w-full bg-red'>{isSelected}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-full'>
                <DropdownMenuLabel>Genre</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {data.genres.map((genre:Igenre)=>{
                    return <DropdownMenuItem onClick={()=>setIsSelected(genre.name)} key={genre.id}>{genre.name}</DropdownMenuItem>
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default MobileNav