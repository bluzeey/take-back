"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().optional(),
});

export default function LoginForm() {
  const [error, setError] = useState(null); // State for handling error messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const router = useRouter(); // Initialize router
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { loginUser } = useAuth();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null); // Reset previous errors

    try {
      await loginUser({ ...values });

      // Redirect to dashboard after successful login// Handle successful response

      // You may want to save the token in local storage/session storage if you're using JWT
      // localStorage.setItem('token', responseData.access);

      // Redirect to another page after a successful login (e.g., dashboard)
      router.push("/dashboard"); // Change '/dashboard' to the relevant route
    } catch (error: any) {
      setError(error.message); // Set the error message to display
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Error message if there is an error */}
        {error && <div className="text-red-600">{error}</div>}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@example.com"
                  {...field}
                />
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
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Remember me</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <Link
            href="/forgot-password"
            className="text-sm text-green-600 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
