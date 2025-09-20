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

const ContactSection = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Studio",
      content: "123 Design District, New York, NY 10001",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@platonicdesign.com",
    },
    {
      icon: Clock,
      title: "Studio Hours",
      content: "Mon - Fri: 9:00 AM - 6:00 PM",
    },
  ];

  return (
    <section id="contact" className="min-h-screen py-20 bg-secondary w-screen">
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <div className="text-center mb-16">
            <Heading>Let&apos;s Create Together</Heading>
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
                  className="flex items-start space-x-4 bg-background/5 border border-background/20 rounded-xl p-6 group hover:shadow-gold transition-all duration-500"
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
                    <p className="font-inter text-background/50">
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
              className="glass-effect rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label className="block font-inter text-sm font-medium text-primary mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background/10 border border-background/20 rounded-lg focus:outline-primary focus:border-transparent transition-all duration-300 text-background/90"
                      placeholder="Your first name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label className="block font-inter text-sm font-medium text-primary mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background/10 border border-background/20 rounded-lg focus:outline-primary focus:border-transparent transition-all duration-300 text-background/90"
                      placeholder="Your last name"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <label className="block font-inter text-sm font-medium text-primary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-background/10 border border-background/20 rounded-lg focus:outline-primary focus:border-transparent transition-all duration-300 text-background/90"
                    placeholder="your.email@example.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <label className="block font-inter text-sm font-medium text-primary mb-2">
                    Project Type
                  </label>

                  <Select defaultValue="Residential Design">
                    <SelectTrigger className="bg-background/10 border text-background/60 border-background/20 focus:outline-primary focus:border-transparent transition-all duration-300">
                      <SelectValue placeholder="Select a project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Project Type</SelectLabel>
                        <SelectItem value="Residential Design">
                          Residential Design
                        </SelectItem>
                        <SelectItem value="Commercial Space">
                          Commercial Space
                        </SelectItem>
                        <SelectItem value="Full Renovation">
                          Full Renovation
                        </SelectItem>
                        <SelectItem value="Consultation">
                          Consultation
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <label className="block font-inter text-sm font-medium text-primary mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-background/10 border border-background/20 rounded-lg focus:outline-primary focus:border-transparent transition-all duration-300 text-background/90 resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full effect-btn px-8 py-4 rounded-lg font-inter font-medium"
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
