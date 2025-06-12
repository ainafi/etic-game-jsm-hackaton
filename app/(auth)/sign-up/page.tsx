"use client";

import Image from 'next/image';
import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "at least 2 characters",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "at last 6 characters",
  }),
});

const SignUp = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router=useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", 
      email: "",
      password: ""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
   
    console.log(values);
  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <Image src="/image/logo.png" width={108} height={100} alt="sign" />
      <h2 className='text-2xl py-5 font-semibold text-white'>Signup</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white capitalize'>name</FormLabel>
                <FormControl>
                  <Input className='w-[300px] text-white' placeholder="votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white capitalize'>email</FormLabel>
                <FormControl>
                  <Input className='w-[300px] text-white' placeholder="votre email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Mot de passe</FormLabel>
                <FormControl>
                  <Input type='password' className="text-white" placeholder="votre mot de passe " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-[300px] capitalize bg-red' type="submit" disabled={isLoading}>
            {isLoading && (
              <div className='flex items-center gap-2'>
                <Loader className='animate-spin'/>
              </div>
            )}
            {isLoading ? "Please wait" : "sign up"}
          </Button>
        </form>
      </Form>
      <p className='text-white py-2'>
        I have an account
        <span>
          <Link className='text-blue-500' href='/sign-in'>sign in</Link>
        </span>
      </p>
    </div>
  );
}

export default SignUp;
