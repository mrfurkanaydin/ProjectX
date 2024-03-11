"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50)
});

export default function login() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values) {
    const res = await fetch("http://localhost:3001/api/auth", {
      method: "POST",
      body: JSON.stringify(values)
    });
    const data = await res.json();
    // console.log(data);
    // console.log(data.status == 401);
    if (data.status && data.status === 401) {
      alert("Invalid username or password");
    }
    if (data.user) {
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.tokens));
    }
  }
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="border-2 p-10 rounded-lg flex flex-col gap-4 justify-center items-center ">
          <Avatar className="w-24 h-24">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback>P</AvatarFallback>
          </Avatar>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email"
                          className="w-full border p-2"
                          {...field}
                        ></Input>
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
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          className="w-full border p-2"
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
