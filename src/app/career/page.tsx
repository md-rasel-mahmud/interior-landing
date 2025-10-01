"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Heading from "@/components/common/Heading";
import AnimatedSection from "@/components/ui/animated-section";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SendHorizonal } from "lucide-react";

const fields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Enter your full name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "Enter your email address",
  },
  {
    name: "phone",
    label: "Phone Number (with country code)",
    type: "tel",
    required: true,
    placeholder: "+8801XXXXXXXXX",
  },
  {
    name: "portfolio",
    label: "Portfolio (Optional)",
    type: "url",
    required: false,
    placeholder: "https://yourportfolio.com",
  },
  {
    name: "linkedin",
    label: "LinkedIn Profile (Optional)",
    type: "url",
    required: false,
    className: "md:col-span-2",
    placeholder: "https://linkedin.com/in/username",
  },
  {
    name: "resume",
    label: "Resume",
    type: "file",
    accept: ".pdf,.doc,.docx",
    required: true,
    placeholder: "Upload your resume",
  },
  {
    name: "position",
    label: "Which position are you applying for?",
    type: "select",
    options: [
      "Interior Designer",
      "Junior Interior Designer",
      "3D Visualizer",
      "Architectural Designer",
      "Project Manager",
      "Site Supervisor",
      "Furniture Designer",
      "Lighting Designer",
      "Drafter (AutoCAD/SketchUp)",
      "Client Relations Executive",
    ],
    required: true,
    placeholder: "Select a position",
  },
  {
    name: "coverLetter",
    label: "Cover Letter / Short Message",
    type: "textarea",
    required: true,
    className: "md:col-span-2",
    placeholder: "Write a short message or cover letter",
  },
  {
    name: "consent",
    label: "I agree to data processing policies",
    type: "checkbox",
    required: true,
    className: "md:col-span-2",
  },
];

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  portfolio?: string;
  linkedin?: string;
  resume: FileList;
  coverLetter: string;
  position: string;
  consent: boolean;
};

export default function CareerPage() {
  const [loading, setLoading] = useState(false);

  const inputClass = cn(
    "w-full bg-transparent border-0 border-b border-primary/30 rounded-none px-0 py-2",
    "focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 focus:border-b-2 focus:border-primary",
    "transition-all duration-300 text-secondary/90 placeholder:text-secondary/50"
  );

  // Form Validation Schema
  const validationSchema = z.object({
    fullName: z.string().min(2, "Full Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
    linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
    resume: z
      .any()
      .refine((files) => files?.length === 1, "Resume is required")
      .refine(
        (files) =>
          files?.length === 1 &&
          [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(files[0]?.type),
        "Only PDF, DOC, or DOCX files are accepted"
      ),
    position: z.string().min(1, "Please select a position"),
    coverLetter: z
      .string()
      .min(10, "Cover Letter must be at least 10 characters"),
    consent: z.literal(true, {
      errorMap: () => ({
        message: "You must agree to data processing policies",
      }),
    }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (values: FormData) => {
    try {
      setLoading(true);
      console.log("values :>> ", values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-20">
      <div className="min-h-screen flex flex-col justify-end w-full">
        <div className="text-center pb-8 pt-20">
          <Heading>Join Our Team</Heading>
        </div>

        {/* Contact Form */}
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {fields.map((field) => (
                  <div key={field.name} className={cn(field.className)}>
                    {field.type !== "checkbox" && (
                      <Label htmlFor={field.name}>{field.label}</Label>
                    )}

                    {field.type === "textarea" ? (
                      <>
                        <Textarea
                          id={field.name}
                          className={inputClass}
                          placeholder={field.placeholder}
                          {...register(field.name as keyof FormData, {
                            required: field.required,
                          })}
                        />

                        {errors[field.name as keyof FormData] && (
                          <p className="text-sm text-destructive mt-1">
                            {
                              errors[field.name as keyof FormData]
                                ?.message as string
                            }
                          </p>
                        )}
                      </>
                    ) : field.type === "select" ? (
                      <>
                        <Select
                          onValueChange={(val) =>
                            setValue(field.name as keyof FormData, val)
                          }
                        >
                          <SelectTrigger className={inputClass}>
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {errors[field.name as keyof FormData] && (
                          <p className="text-sm text-destructive mt-1">
                            {
                              errors[field.name as keyof FormData]
                                ?.message as string
                            }
                          </p>
                        )}
                      </>
                    ) : field.type === "checkbox" ? (
                      <>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={field.name}
                            className="rounded"
                            {...register(field.name as keyof FormData, {
                              required: field.required,
                            })}
                          />
                          <Label htmlFor={field.name}>{field.label}</Label>
                        </div>
                        {errors[field.name as keyof FormData] && (
                          <p className="text-sm text-destructive mt-1">
                            {
                              errors[field.name as keyof FormData]
                                ?.message as string
                            }
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <Input
                          id={field.name}
                          type={field.type}
                          accept={field.accept}
                          className={inputClass}
                          placeholder={field.placeholder}
                          {...register(field.name as keyof FormData, {
                            required: field.required,
                          })}
                        />
                        {errors[field.name as keyof FormData] && (
                          <p className="text-sm text-destructive mt-1">
                            {
                              errors[field.name as keyof FormData]
                                ?.message as string
                            }
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ))}

                <Button type="submit" className="w-full md:col-span-2 ">
                  {loading ? "Sending..." : "Submit Application"}
                  {!loading && <SendHorizonal size={12} />}
                </Button>
              </form>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
