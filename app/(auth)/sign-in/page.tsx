"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { authClient } from "@/lib/auth-client";
import useAuthStore from "@/store/useAuth";
import { signinFormValidation } from "@/lib/validation/validation";

const SignIn = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signinFormValidation>>({
    resolver: zodResolver(signinFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signinFormValidation>) => {
    try {
      setIsLoading(true);
      const response = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (response && "data" in response && response.data?.user) {
        setUser(response.data.user);
        toast.success("Sign in successful");
        router.push("/discover");
      }
    } catch (error: any) {
      toast.error("Sign in failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/image/logo.png" width={108} height={100} alt="logo" />
      <h2 className="text-2xl py-5 font-semibold text-white">Sign In</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input className="w-[300px] text-white" placeholder="Your email" {...field} />
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
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="text-white" placeholder="Your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-[300px] capitalize bg-red" type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader className="animate-spin" />
                Please wait
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>
      <p className="text-white pt-2">or</p>
      <Button className="bg-white w-[300px] flex items-center justify-between my-3">
        <Image src="/image/google.png" width={20} height={20} alt="Google" />
        <span className="text-black">Connect with Google</span>
        <span />
      </Button>
      <p className="text-white py-2">
        I don't have an account
        <Link className="text-blue-500 ml-1" href="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
