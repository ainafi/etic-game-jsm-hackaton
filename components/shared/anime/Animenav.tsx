"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useSearchStore from '@/store/useSearch'

const formSchema = z.object({
  query: z.string().min(2, {
    message: "Query must be at least 2 characters.",
  }),
})

const AnimeNav = () => {
  const router = useRouter()
  const { setSearch } = useSearchStore()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSearch(values.query)
    router.push("/anime/feed/search")
  }

  return (
    
    <div className='flex items-center justify-center relative'>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='relative'>
                      <Input {...field} className='w-[25rem] md:w-[30rem]' placeholder="Search" />
                      <Button type="submit" className='absolute top-0 right-0 bg-transparent hover:bg-transparent'>
                        <Search />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  )
}

export default AnimeNav
