import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import SubmitBtn from "./submit-btn";
import { useSectionInView } from "../lib/hooks";
import { useState, useRef } from "react";
import { message } from "antd";
import axios from "axios";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    formData.append("access_key", import.meta.env.VITE_CONTACT);

    try {
      const response = await axios.post(
        "https://api.web3forms.com/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
        if (formRef.current) {
          formRef.current.reset(); // Reset the form fields
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to submit form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:ayush2001314@gmail.com">
          ayush2001314@gmail.com
        </a>{" "}
        or through this form.
      </p>

      <form
        onSubmit={onSubmit}
        ref={formRef}
        className="mt-10 flex flex-col dark:text-black"
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <SubmitBtn isLoading={isLoading} />
      </form>
    </motion.section>
  );
}
