"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword, FirebaseError } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Mic, ArrowRight } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const getFirebaseAuthErrorMessage = (error: FirebaseError): string => {
  switch (error.code) {
    case 'auth/user-not-found':
    case 'auth/invalid-credential':
      return "Incorrect email or password. Please try again.";
    case 'auth/invalid-email':
      return "Please enter a valid email address.";
    case 'auth/wrong-password':
      return "Incorrect password. Please try again.";
    default:
      return "An unexpected error occurred. Please try again later.";
  }
};


export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting you to the dashboard.",
      });
      router.push("/dashboard");
    } catch (error) {
      const description = error instanceof FirebaseError 
        ? getFirebaseAuthErrorMessage(error)
        : "An unknown error occurred.";
      
      toast({
        variant: "destructive",
        title: "Login Failed",
        description,
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-white">
        <div className="w-24 h-24 bg-gradient-to-tr from-violet-600 to-indigo-500 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
          <Mic className="text-white w-12 h-12" />
        </div>
        <h1 className="text-4xl font-bold text-center mb-4">Welcome Back to VOXA</h1>
        <p className="text-lg text-slate-300 text-center max-w-md">
          The AI workforce that doesn't just talk, it acts. Log in to manage your autonomous agents.
        </p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground">Sign In</h2>
            <p className="text-muted-foreground mt-2">Enter your credentials to access your account.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-lg py-6 bg-gradient-to-r from-violet-600 to-indigo-600" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
