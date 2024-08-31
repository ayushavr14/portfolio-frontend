import { ReactNode } from "react";

type Props = {
  children: ReactNode,
  className?: string,
};

const Wrapper = ({ children }: Props) => (
  <section className="max-w-[1400px] mx-auto px-4 md:px-8">{children}</section>
);

export default Wrapper;
