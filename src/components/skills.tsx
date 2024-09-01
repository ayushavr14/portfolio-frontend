import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { useSectionInView } from "../lib/hooks";
import socket from "@/socket/socket";
import axiosInstance from "@/axios/instance";
import { SkillsT } from "@/lib/types";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");
  const [skillsData, setSkillsData] = useState<SkillsT[]>([]);
  console.log(skillsData);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axiosInstance.get<SkillsT[]>("/api/skills");
        setSkillsData(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();

    socket.on("skill-added", (newSkill: SkillsT) => {
      setSkillsData((prevSkills) => [...prevSkills, newSkill]);
    });

    socket.on("skill-updated", (updatedSkill: SkillsT) => {
      setSkillsData((prevSkills) =>
        prevSkills.map((skill) =>
          skill._id === updatedSkill._id ? updatedSkill : skill
        )
      );
    });

    socket.on("skill-deleted", (deletedSkillId: string) => {
      setSkillsData((prevSkills) =>
        prevSkills.filter((skill) => skill._id !== deletedSkillId)
      );
    });

    return () => {
      socket.off("skill-added");
      socket.off("skill-updated");
      socket.off("skill-deleted");
    };
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
        {skillsData.map((skill, skillIndex) =>
          skill.name.map((name, index) => (
            <motion.li
              className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80"
              key={`${skill._id}-${index}`}
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              custom={skillIndex}
            >
              {name}
            </motion.li>
          ))
        )}
      </ul>
    </section>
  );
}
