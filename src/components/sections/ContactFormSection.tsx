"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedSection from "@/components/ui/animated-section";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";

const ContactFormSection = () => {
  const isPage = true;

  // Form field configurations
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
      delay: 0.6,
    },
  ];

  return (
    <section>
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
                  ) : (
                    //   : field.type === "select" ? (
                    //     <Select defaultValue={field.options?.[0]}>
                    //       <SelectTrigger
                    //         className={cn(
                    //           "border focus:outline-primary focus:border-transparent transition-all duration-300",
                    //           isPage
                    //             ? "bg-primary/10 border-primary/20 text-secondary/90"
                    //             : "bg-background/10 border-background/20 text-background/90"
                    //         )}
                    //       >
                    //         <SelectValue placeholder={field.placeholder} />
                    //       </SelectTrigger>

                    //       <SelectContent>
                    //         <SelectGroup>
                    //           <SelectLabel>{field.label}</SelectLabel>
                    //           {field.options?.map((option) => (
                    //             <SelectItem key={option} value={option}>
                    //               {option}
                    //             </SelectItem>
                    //           ))}
                    //         </SelectGroup>
                    //       </SelectContent>
                    //     </Select>
                    //   )
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg focus:outline-primary focus:border-transparent transition-all duration-300 bg-primary/10 border-primary/20 text-secondary/90"
                      )}
                    />
                  )}
                </motion.div>
              ))}

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full effect-btn px-8 py-4 rounded-lg font-inter font-medium md:col-span-2 flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message <SendHorizonal size={12} />
              </motion.button>
            </form>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactFormSection;
