"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/ui/animated-section";
import { SendHorizonal } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios.instanse";
import { toast } from "sonner";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(5, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

// Field configuration
const formFields = [
  {
    type: "text",
    name: "name",
    label: "Name",
    placeholder: "Your name",
    grid: "md:col-span-1",
    delay: 0.2,
  },
  {
    type: "text",
    name: "phone",
    label: "Phone Number",
    placeholder: "(123) 456-7890",
    grid: "md:col-span-1",
    delay: 0.3,
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    placeholder: "your.email@example.com",
    grid: "md:col-span-2",
    delay: 0.4,
  },
  {
    type: "textarea",
    name: "message",
    label: "Message",
    placeholder: "Tell us about your project...",
    rows: 4,
    grid: "md:col-span-2",
    delay: 0.5,
  },
  {
    type: "button",
    name: "submit",
    label: "Send Message",
    grid: "md:col-span-2",
    delay: 0.6,
    icon: <SendHorizonal size={12} />,
  },
];

// const baseInputClass =
//   "w-full px-4 py-3 border rounded-lg focus:outline-primary focus:border-transparent transition-all duration-300 bg-primary/10 border-primary/20 text-secondary/90";
const baseInputClass = cn(
  "w-full bg-transparent border-0 border-b border-primary/30 rounded-none px-0 py-2",
  "focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 focus:border-b-2 focus:border-primary",
  "transition-all duration-300 text-secondary/90 placeholder:text-secondary/50"
);

const ContactFormSection = () => {
  const [loading, setLoading] = useState(false);

  // Initialize react-hook-form with Zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  // Submit handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/contact/", values);

      console.log("data :>> ", data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="container mx-auto px-2">
        <AnimatedSection animation="slideLeft" delay={0.4}>
          <motion.div
            className={cn(
              "glass-effect border rounded-2xl p-8 bg-background/5 border-background/20"
            )}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid md:grid-cols-2 gap-6"
              >
                {formFields.map((field) => (
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
                                <Input
                                  id={field.name}
                                  type={field.type}
                                  placeholder={field.placeholder}
                                  {...f}
                                  className={baseInputClass}
                                />
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
                          disabled={loading}
                        >
                          {loading ? "Sending..." : field.label}
                          {!loading && field.icon}
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </form>
            </Form>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactFormSection;
