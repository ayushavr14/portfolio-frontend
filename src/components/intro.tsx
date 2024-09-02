import useUserData from "@/hooks/useUserDetails";
import { motion } from "framer-motion";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { useActiveSectionContext } from "../context/active-section-context";
import { useSectionInView } from "../lib/hooks";
import About from "./about";
import SectionDivider from "./section-divider";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const userData = useUserData();

  return (
    <>
      {userData?.map((item) => (
        <div key={item._id}>
          <section
            ref={ref}
            id="home"
            className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
          >
            <div className="flex items-center justify-center">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "tween",
                    duration: 0.2,
                  }}
                ></motion.div>

                <div>
                  <motion.span
                    key={item._id}
                    className="absolute bottom-0 right-0 text-4xl hand"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 125,
                      delay: 0.1,
                      duration: 0.7,
                    }}
                  >
                    👋
                  </motion.span>
                </div>
              </div>
            </div>

            <motion.h1
              className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {item.user}
            </motion.h1>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium space-x-3"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
              }}
            >
              <a
                href="#contact"
                className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
                onClick={() => {
                  setActiveSection("Contact");
                  setTimeOfLastClick(Date.now());
                }}
              >
                Contact me here{" "}
                <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
              </a>

              <a
                className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
                href={
                  item.cvLink && item.cvLink.length > 0 ? item.cvLink[0] : "#"
                }
                target="_blank"
                download
              >
                View CV
                <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
              </a>

              <a
                className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
                href={item.linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsLinkedin />
              </a>

              <a
                className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
                href={item.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithubSquare />
              </a>
            </motion.div>
          </section>
          <div className="flex justify-center items-center">
            <SectionDivider />
          </div>
          <About about={item.about || ""} />
        </div>
      ))}
    </>
  );
}
