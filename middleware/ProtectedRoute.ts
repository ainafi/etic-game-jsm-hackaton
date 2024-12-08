"use client"
// import { Loader } from 'lucide-react';
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuthStore from "@/store/useAuth"
import { getCurrentUser } from "@/lib/auth"
import { toast } from '@/hooks/use-toast';

const ProtectedRoute=({children}:{children: React.ReactNode;})=>{
    const router=useRouter()
    const user=useAuthStore((state)=>state.user)
    useEffect(() => {
      const checkUser=async()=>{
        try {
            await getCurrentUser()
        } catch (error) {
            router.push('/sign-in')
            return toast({title:"please connect to your account",variant:"destructive"})
            console.log(error)
        }
      }
      checkUser()
    }, [router])
    if (!user) {
        return null
    }
    return children
    
}

export default ProtectedRoute