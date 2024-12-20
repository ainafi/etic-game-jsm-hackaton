"use client";

import Image from 'next/image';
import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react"
import useCheckSession from '@/hooks/useCheckSession';
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
import { createUserAccount, signInAccount } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "at last 6 characters",
  }),
});

const SignUp = () => {
  useCheckSession();
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false);
  const router=useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const newUser = await createUserAccount(values);
      if(!newUser) throw Error
      toast({title:"sign up success",variant:"default"})

      const session=await signInAccount({email:values.email,password:values.password})
      if(!session){
        toast({title:"sign In failed try again",variant:"destructive"})
        return ;
      }
        router.push("/discover")
  
    } catch (error) {
      return toast({title:"sign up failed try again",variant:"destructive"})
      console.error(error);
    } finally{
      setIsLoading(false)
    }
    
  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <Image src="/image/logo.png" width={108} height={100} alt="sign" />
      <h2 className='text-2xl py-5 font-semibold text-white'>Signup</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
      {/* <div>
        <p className='text-center pt-2 text-white'>ou</p>
        <Button className='bg-white w-[300px] flex items-center justify-between my-3'>
          <Image src='/image/google.png' width={20} height={20} alt='google'/>
          <span className='text-black'>Connecter with google</span>
          <span></span>
        </Button>
      </div> */}
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
