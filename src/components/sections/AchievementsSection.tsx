import Heading from "@/components/common/Heading";
import { Award, Star, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const AchievementsSection = () => {
  const achievements = [
    {
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      title: "Top Performer",
      description: "Recognized as the top performer of the year 2024.",
    },
    {
      icon: <Award className="w-8 h-8 text-blue-500" />,
      title: "Certified Developer",
      description: "Achieved official certification in React & Next.js.",
    },
    {
      icon: <Star className="w-8 h-8 text-green-500" />,
      title: "5+ Years Experience",
      description: "Worked with multiple startups and enterprise projects.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-foreground">
      <div className="max-w-6xl mx-auto text-center py-6">
        <Heading>Achievements</Heading>

        <div className="grid gap-6 md:grid-cols-3 py-12">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-xl transition-shadow duration-300 rounded-2xl bg-background/10 border-background/20 backdrop-blur-lg">
                <CardHeader>
                  <div className="flex justify-center ">
                    <span className="bg-background/80 p-5 rounded-full">
                      {item.icon}
                    </span>
                  </div>
                  <CardTitle className="text-xl mt-4 text-center text-background">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted/50 text-center px-5">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
