"use client";
import { motion } from "framer-motion";
import AnimatedSection from "../ui/animated-section";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Heading from "@/components/common/Heading";
import { cn } from "@/lib/utils";

const ContactSection = ({ isPage }: { isPage?: boolean }) => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Studio",
      content: "123 Design District, New York, NY 10001",
    },
    { icon: Phone, title: "Call Us", content: "+1 (555) 123-4567" },
    { icon: Mail, title: "Email Us", content: "hello@platonicdesign.com" },
    {
      icon: Clock,
      title: "Studio Hours",
      content: "Mon - Fri: 9:00 AM - 6:00 PM",
    },
  ];

  // Form field configurations
  const formFields = [
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      placeholder: "Your first name",
      grid: "md:col-span-1",
      delay: 0.2,
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      placeholder: "Your last name",
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
      type: "select",
      name: "projectType",
      label: "Project Type",
      placeholder: "Select a project type",
      options: [
        "Residential Design",
        "Commercial Space",
        "Full Renovation",
        "Consultation",
      ],
      grid: "md:col-span-2",
      delay: 0.5,
    },
    {
      type: "textarea",
      name: "message",
      label: "Message",
      placeholder: "Tell us about your project...",
      rows: 4,
      grid: "md:col-span-2",
      delay: 0.6,
    },
  ];

  return (
    <section
      id="contact"
      className={cn(
        "min-h-screen py-20 w-screen",
        isPage ? "bg-background" : "bg-secondary"
      )}
    >
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <div className="text-center mb-16">
            <Heading>Contact Us</Heading>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <AnimatedSection
                key={info.title}
                animation="slideRight"
                delay={0.2 * (index + 1)}
              >
                <motion.div
                  className={cn(
                    "flex items-start space-x-4 border rounded-xl p-6 group hover:shadow-gold transition-all duration-500",
                    isPage
                      ? "bg-primary/5 border-primary/20"
                      : "bg-background/5 border-background/20"
                  )}
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 bg-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <info.icon className="w-6 h-6 text-background/60" />
                  </motion.div>

                  <div>
                    <h3 className="font-luxury text-xl font-semibold text-accent mb-2">
                      {info.title}
                    </h3>
                    <p
                      className={cn(
                        "font-inter",
                        isPage ? "text-foreground/60" : "text-background/70"
                      )}
                    >
                      {info.content}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Contact Form */}
          <AnimatedSection animation="slideLeft" delay={0.4}>
            <motion.div
              className={cn(
                "glass-effect border rounded-2xl p-8",
                isPage
                  ? "bg-primary/5 border-primary/20"
                  : "bg-background/5 border-background/20"
              )}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <form className="grid md:grid-cols-2 gap-6">
                {formFields.map((field) => (
                  <motion.div
                    key={field.name}
                    className={field.grid}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: field.delay, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label className="block font-inter text-sm font-medium text-primary mb-2">
                      {field.label}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        rows={field.rows}
                        name={field.name}
                        placeholder={field.placeholder}
                        className={cn(
                          "w-full px-4 py-3 border rounded-lg focus:outline-primary focus:border-transparent transition-all duration-300 resize-none",
                          isPage
                            ? "bg-primary/10 border-primary/20 text-secondary/90"
                            : "bg-background/10 border-background/20 text-background/90"
                        )}
                      />
                    ) : field.type === "select" ? (
                      <Select defaultValue={field.options?.[0]}>
                        <SelectTrigger
                          className={cn(
                            "border focus:outline-primary focus:border-transparent transition-all duration-300",
                            isPage
                              ? "bg-primary/10 border-primary/20 text-secondary/90"
                              : "bg-background/10 border-background/20 text-background/90"
                          )}
                        >
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>{field.label}</SelectLabel>
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        className={cn(
                          "w-full px-4 py-3 border rounded-lg focus:outline-primary focus:border-transparent transition-all duration-300",
                          isPage
                            ? "bg-primary/10 border-primary/20 text-secondary/90"
                            : "bg-background/10 border-background/20 text-background/90"
                        )}
                      />
                    )}
                  </motion.div>
                ))}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full effect-btn px-8 py-4 rounded-lg font-inter font-medium md:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
