"use client"
import { fetchData } from '@/lib/fetchdata'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
interface Igenre{
  id:number
  name:string
}
const Sidebar = () => {
  const {isLoading,data,error}=useQuery({
    queryKey:["genres"],
    queryFn:()=>fetchData("genre/movie/list")
  })
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <aside className='my-10'>
      {data.genres.map((genre: Igenre) => (
        <ul className=''  key={genre.id}>
          <li className='text-white text-md border px-4 flex items-center justify-center my-3 '>{genre.name}</li>
        </ul>
      ))}
    </aside>
  )
}

export default Sidebar