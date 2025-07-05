"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import { authRequest } from "@/lib/api/auth-api";
import type { AuthRegisterForm } from "@/types/auth-type";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDeviceStore } from "@/store/device-store";

const loginSchema = z.object({
  user_name: z.string().min(2, "Username is required"),
  password: z.string().min(1, "Password is required"),
  full_name: z.string().min(2, "Fullname is required"),
  email: z.string().email("Email is required"),
});

const LoginForm = () => {
  const { device, fetchDeviceInfo } = useDeviceStore();

  useEffect(() => {
    fetchDeviceInfo();
  }, [fetchDeviceInfo]);

  const navigate = useRouter();
  const setTokens = useAuthStore((s) => s.setTokens);
  const { AUTH_REGISTER } = authRequest();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user_name: "",
      password: "",
      full_name: "",
      email: "",
    },
  });

  const loginMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: (payload: AuthRegisterForm) => AUTH_REGISTER(payload),
    onSuccess: (data) => {
      const { accessToken, refreshToken, existUser } = data?.data;
      const roles = existUser?.roles || [];
      console.log(existUser, data?.data);

      if (accessToken && refreshToken) {
        setTokens(accessToken, refreshToken, roles);

        // Redirect based on role
        if (roles.includes("admin") || roles.includes("super_admin")) {
          navigate.push("/");
        } else {
          navigate.push("/login");
        }
      }
    },
    onError: (err) => {
      console.error("Login error:", err);
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate({
      ...data,
      device_name: device?.device_name,
      device_type: device?.device_type,
      os: device?.os,
      ip_address: device?.ip_address ?? undefined,
      browser: device?.browser,
    });
  };

  return (
    <Card className="mx-auto w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4 pb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sign in to your account
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Fullname" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-md shadow-md hover:brightness-110 transition-all"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-gray-600">
          Do you have account?
          <button className="text-blue-600 hover:underline font-medium">
            Sign in
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
