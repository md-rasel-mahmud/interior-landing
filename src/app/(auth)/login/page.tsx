"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { baseInputClass, cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  // const router = useRouter();

  const validationSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const form = useForm<FieldValues>({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const handleLogin = async (data: FieldValues) => {
    const { username, password } = data;
    setIsLoading(true);

    // sign in using next-auth
    const res = await signIn("credentials", {
      username,
      password,
      callbackUrl: "/admin",
      // redirect: false,
    });

    if (res?.error) {
      console.error("res?.error", res?.error);

      setIsLoading(false);
      toast.error("Error", {
        description:
          typeof res?.error === "string" ? res.error : "Login failed",
      });
    } else {
      setIsLoading(false);
      toast.success("Success", {
        description: "Login successful",
      });

      // router.push("/");
    }
  };

  const formData = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter your username number",
      required: true,
      grid: "md:col-span-2",
      rows: 1,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
      required: true,
      grid: "md:col-span-2",
      delay: 0.2,
      rows: 1,
    },
    {
      type: "button",
      name: "submit",
      label: "Sign In",
      grid: "md:col-span-2",
      delay: 0.3,
    },
  ];

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-display text-organic-600">
            Sign In
          </CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* <form onSubmit={handleSubmit(handleLogin)}>
            <FormInput {...{ formData, control }} />

            <Button
              type="submit"
              className="w-full bg-organic-500 hover:bg-organic-600 mt-5"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form> */}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="grid md:grid-cols-2 gap-6"
            >
              {formData.map((field) => (
                <motion.div
                  key={field.name}
                  className={field.grid}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: field.delay, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {/* Skip label and control for button */}
                  {field.type !== "button" && (
                    <FormField
                      control={form.control}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      name={field.name as any}
                      render={({ field: f }) => (
                        <FormItem>
                          <FormLabel className="block font-inter text-sm font-medium text-primary mb-2">
                            {field.label}
                          </FormLabel>
                          <FormControl>
                            {field.type === "textarea" ? (
                              <Textarea
                                id={field.name}
                                placeholder={field.placeholder}
                                rows={field.rows}
                                {...f}
                                className={cn(baseInputClass, "resize-none")}
                              />
                            ) : (
                              <div className="relative">
                                <Input
                                  id={field.name}
                                  type={
                                    field.name === "password"
                                      ? isShowPassword
                                        ? "text"
                                        : "password"
                                      : field.type
                                  }
                                  placeholder={field.placeholder}
                                  {...f}
                                  className={baseInputClass}
                                />

                                {field.name === "password" && (
                                  <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/70 hover:text-secondary"
                                    onClick={() =>
                                      setIsShowPassword(!isShowPassword)
                                    }
                                  >
                                    {isShowPassword ? (
                                      <EyeClosed size={18} />
                                    ) : (
                                      <Eye size={18} />
                                    )}
                                  </button>
                                )}
                              </div>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {field.type === "button" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: field.delay, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <Button
                        type="submit"
                        className="w-full effect-btn px-8 py-4 rounded-lg font-inter font-medium flex items-center justify-center gap-2"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-organic-500 hover:text-organic-600 font-medium"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
