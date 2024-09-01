import { useSectionInView } from "../lib/hooks";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";

export default function About({ about }: { about: string }) {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">{about}</p>
    </motion.section>
  );
}
