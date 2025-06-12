"use client";

import Image from 'next/image';
import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useRouter } from 'next/navigation';
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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "at least 6 characters",
  }),
});
const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      <h2 className='text-2xl py-5 font-semibold text-white'>Sign In</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white capitalize'>Email</FormLabel>
                <FormControl>
                  <Input className='w-[300px] text-white' placeholder="Your email" {...field} />
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
                <FormLabel className='text-white'>Password</FormLabel>
                <FormControl>
                  <Input type='password' className='text-white' placeholder="Your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-[300px] capitalize bg-red' type="submit" disabled={isLoading}>
            {isLoading && (
              <div className='flex items-center gap-2'>
                <Loader className='animate-spin' />
              </div>
            )}
            {isLoading ? "Please wait" : "Sign In"}
          </Button>
        </form>
      </Form>
      <div>
        <p className='text-center pt-2 text-white'>or</p>
        <Button className='bg-white w-[300px] flex items-center justify-between my-3'>
          <Image src='/image/google.png' width={20} height={20} alt='google' />
          <span className='text-black'>Connect with Google</span>
          <span></span>
        </Button>
      </div>
      <p className='text-white py-2'>
        I don&apos;t have an account
        <span>
          <Link className='text-blue-500' href='/sign-up'> Sign Up</Link>
        </span>
      </p>
    </div>
  );
}

export default SignIn;
