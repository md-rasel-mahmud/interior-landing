"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../ui/animated-section";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import { cn } from "@/lib/utils";
import NavigateButton from "@/components/common/NavigateButton";

// Team Members Images
import tm_1 from "@/assets/team-members/tm-karam_awada.png";
import tm_2 from "@/assets/team-members/tm-mohamad_achour.png";
import tm_3 from "@/assets/team-members/tm-mohammad_al_samad.png";
import tm_4 from "@/assets/team-members/tm-hassan_yaacoub.png";
import tm_5 from "@/assets/team-members/tm-zainab_al-ali.png";
import tm_6 from "@/assets/team-members/tm-gulzar_mazumder.png";
import tm_7 from "@/assets/team-members/tm-sayed_mohamad_ali.png";
import tm_8 from "@/assets/team-members/tm-kareem.png";

const TeamSection = ({ isPage }: { isPage?: boolean }) => {
  const teamMembers = [
    {
      name: "Karam Awada",
      role: "Founder & CEO",
      image: tm_1,
    },
    {
      name: "Mohamad Achour",
      role: "Co Founder & Construction Manager",
      image: tm_2,
    },
    {
      name: "Mohammad Al Samad",
      role: "Arch. Engineer",
      image: tm_3,
    },
    {
      name: "Hassan Yaacoub",
      role: "Finishing Supervisor",
      image: tm_4,
    },
    {
      name: "Zainab AL Ali",
      role: "Secretary",
      image: tm_5,
    },
    {
      name: "Gulzar Mazumder",
      role: "Sr. Draftsman",
      image: tm_6,
    },
    {
      name: "Sayed Mohamad Ali",
      role: "Paint Specialist",
      image: tm_7,
    },
    {
      name: "Kareem",
      role: "Office Attendant",
      image: tm_8,
    },
  ];

  return (
    <section
      id="team"
      className={cn(
        "min-h-screen flex flex-col gap-7 justify-center w-screen bg-background",
        isPage && "pt-24"
      )}
    >
      <div className="max-w-screen-lg mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <div className="text-center">
            <Heading>Our Team</Heading>
          </div>
        </AnimatedSection>

        <div className="grid grid-col-1 md:grid-cols-4 gap-2">
          {teamMembers
            .slice(0, isPage ? teamMembers.length : 4)
            .map((member, index) => {
              return (
                <AnimatedSection
                  key={member.name}
                  animation="scale"
                  delay={0.2 * (index + 1)}
                >
                  <motion.div
                    className={cn(
                      "p-2 text-center group hover:shadow-gold transition-all duration-500 overflow-hidden"
                    )}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      className="relative mx-auto mb-4 w-full h-72 overflow-hidden shadow-soft"
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        width={300}
                        height={300}
                      />
                    </motion.div>

                    <motion.h3
                      className={cn(
                        "text-2xl text-primary font-medium leading-none"
                      )}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {member.name}
                    </motion.h3>

                    <motion.p
                      className={cn("font-inter text-primary/80 text-lg mb-4")}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {member.role}
                    </motion.p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
        </div>
      </div>

      {!isPage && (
        <div className="text-center">
          <NavigateButton href="/team">Meet the Team</NavigateButton>
        </div>
      )}
    </section>
  );
};

export default TeamSection;
