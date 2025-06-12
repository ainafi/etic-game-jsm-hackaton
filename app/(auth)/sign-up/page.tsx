"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { authClient } from "@/lib/auth-client"
import { signupFormValidation } from "@/lib/validation/validation"
import useAuthStore from "@/store/useAuth"

const SignUp = () => {
  const { setUser } = useAuthStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const form = useForm<z.infer<typeof signupFormValidation>>({
    resolver: zodResolver(signupFormValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // Google connection


  const onSubmit = async (values: z.infer<typeof signupFormValidation>) => {
    try {
      setIsLoading(true)
      const { data, error } = await authClient.signUp.email(values)

      if (error) {
        toast.error("Signup failed: " + error.message)
        return
      }

      if (data?.user) {
        setUser(data.user)
        toast.success("Signup successful! Redirecting...")
        router.push("/discover")
      }
    } catch (err) {
      console.error("Signup failed:", err)
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center  to-black p-4">
      <Card className="w-full max-w-md border-gray-800 bg-gray-950/50 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center space-y-2 pb-2">
          <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gray-800 p-2">
            <Image src="/image/logo.png" width={108} height={100} alt="logo" className="object-contain" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Create an Account</CardTitle>
          <CardDescription className="text-gray-400">Sign up to get started with our platform</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {(["name", "email", "password"] as const).map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field}
                  render={({ field: f }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 capitalize">{field}</FormLabel>
                      <FormControl>
                        <Input
                          type={field === "password" ? "password" : "text"}
                          className="border-gray-700 bg-gray-800/50 text-white focus-visible:ring-gray-500"
                          placeholder={`Enter your ${field}`}
                          {...f}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              ))}

              <Button
                className="w-full bg-gradient-to-r from-red to-red-500 text-white hover:from-red-700 hover:to-red-600 transition-all duration-300"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>

          <div className=" flex flex-col  items-center gap-2">
            <Separator className="flex-grow bg-gray-700" />
            <span className="text-sm text-gray-400">or continue with</span>
            <Separator className="flex-grow bg-gray-700" />
          </div>

          

          <div className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link className="text-blue-400 hover:text-blue-300 transition-colors" href="/sign-in">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUp
