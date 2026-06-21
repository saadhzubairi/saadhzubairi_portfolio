import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CustomDiv from "../CustomDiv";
import { Link } from "react-router-dom";
import ContactExpandable from "../contact/ContactExpandable";

const ROLES = [
  "Full-Stack",
  "Web Development",
  "ML & AI",
  "Signal Processing",
  "Distributed Systems",
  "Simulation & Modeling",
];

// Dynamic-island-style pill: constant height, width morphs to hug each role,
// text crossfades like a slot machine.
const RoleIsland = () => {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROLES.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="inline-flex h-11 items-center gap-2.5 rounded-full bg-gray-900 px-5 text-white shadow-sm dark:bg-white dark:text-gray-900"
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 dark:bg-emerald-500" />
      <div className="relative flex h-full items-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={index}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, filter: "blur(4px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -12, filter: "blur(4px)" }
            }
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="whitespace-nowrap text-sm font-medium tracking-tight"
          >
            {ROLES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Home = () => {
  return (
    <section
      id="Home"
      className="relative h-screen w-full flex overflow-hidden items-center justify-center"
    >
      {/* zine-style oversized ghost watermark — bottom-bleed on mobile, right-bleed on desktop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex items-end justify-end overflow-hidden select-none sm:items-center"
      >
        <span className="translate-y-[12%] -mr-[14vw] whitespace-nowrap text-[44vw] font-thin leading-none tracking-tighter text-gray-900/[0.035] dark:text-white/[0.045] sm:translate-y-0 sm:-mr-[6vw] sm:text-[26vw]">
          Zubairi
        </span>
      </div>

      <div className="relative z-10 flex flex-col w-full mx-auto">
        <CustomDiv>
          <h1 className="text-7xl md:text-9xl font-thin tracking-tight text-gray-900 dark:text-white text-left leading-[0.9]">
            Saad
          </h1>
        </CustomDiv>
        <CustomDiv>
          <h1 className="text-7xl md:text-9xl font-thin tracking-tight text-gray-900 dark:text-white text-left leading-[0.9]">
            Zubairi
          </h1>
        </CustomDiv>

        <CustomDiv>
          <div className="pt-8 pb-6">
            <RoleIsland />
          </div>
        </CustomDiv>

        <CustomDiv>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 py-2">
            <Link
              to="/portfolio"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-gray-900 px-6 text-sm font-medium text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-900"
            >
              View my work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <a
              href="/SaadZ.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-gray-200 px-6 text-sm font-medium text-gray-600 transition-all duration-300 hover:border-gray-400 hover:text-gray-900 dark:border-gray-700/70 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white"
            >
              My resume
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <ContactExpandable />
          </div>
        </CustomDiv>
      </div>
    </section>
  );
};

export default Home;
