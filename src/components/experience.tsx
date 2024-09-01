import { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import socket from "@/socket/socket"; // Import the socket instance
import { useSectionInView } from "../lib/hooks";
import { useTheme } from "../context/theme-context";
import axiosInstance from "@/axios/instance"; // Assuming you have a configured axios instance

export interface ExperienceType {
  _id: string;
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
  // icon: JSX.Element;
}

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const { theme } = useTheme();
  const [experiencesData, setExperiencesData] = useState<ExperienceType[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axiosInstance.get<ExperienceType[]>(
          "/api/experiences"
        );
        setExperiencesData(response.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();

    socket.on("experience-updated", (updatedExperience: ExperienceType) => {
      setExperiencesData((prevExperiences) =>
        prevExperiences.map((experience) =>
          experience._id === updatedExperience._id
            ? updatedExperience
            : experience
        )
      );
    });

    socket.on("experience-deleted", (deletedExperienceId: string) => {
      setExperiencesData((prevExperiences) =>
        prevExperiences.filter(
          (experience) => experience._id !== deletedExperienceId
        )
      );
    });

    return () => {
      socket.off("experience-updated");
      socket.off("experience-deleted");
    };
  }, []);

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item) => (
          <VerticalTimelineElement
            key={item._id}
            contentStyle={{
              background:
                theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
              boxShadow: "none",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              textAlign: "left",
              padding: "1.3rem 2rem",
            }}
            contentArrowStyle={{
              borderRight:
                theme === "light"
                  ? "0.4rem solid #9ca3af"
                  : "0.4rem solid rgba(255, 255, 255, 0.5)",
            }}
            date={item.startDate.slice(4, 0)}
            // icon={item.icon}
            iconStyle={{
              background:
                theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
              fontSize: "1.5rem",
            }}
          >
            <h3 className="font-semibold capitalize">{item.title}</h3>
            <p className="font-normal !mt-0">{item.company}</p>
            <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
              {item.description}
            </p>
            <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
              {item.startDate.slice(0, 4)}
              {" - "}
              {item.endDate.slice(0, 4) || "Present"}
            </p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
}
