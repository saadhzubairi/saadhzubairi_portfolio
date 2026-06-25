import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import ContactExpandable from "../contact/ContactExpandable";
import saadPortrait from "../../assets/portraits/saad-portrait.jpg";
import "./home.css";

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
      className="role-island"
    >
      <span className="role-island-dot" />
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
      className="home-section home-hero"
    >
      <div
        aria-hidden
        className="home-hero-watermark"
      >
        <span>Zubairi</span>
      </div>

      <div className="home-section-inner home-hero-grid">
        <div className="home-hero-index" aria-hidden="true">
          <span>Index</span>
          <strong>01</strong>
        </div>

        <div className="home-hero-copy">
          <p className="home-section-label">Software Engineer</p>
          <h1 className="home-hero-title">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 0.74, 0.19, 1] }}
              className="">
              Saad
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 0.74, 0.19, 1] }}
              className="">
              Zubairi
            </motion.div>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 0.74, 0.19, 1] }}
            className="home-hero-role">
            <RoleIsland />
          </motion.div>
          <div className="home-action-row">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.0, ease: [0.23, 0.74, 0.19, 1] }}
              className="">
              <Link
                to="/portfolio"
                className="home-action home-action-primary"
              >
                View my work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 0.74, 0.19, 1] }}
              href="/SaadZ.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="home-action"
            >
              My resume
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 0.74, 0.19, 1] }}
              className="">
              <ContactExpandable triggerClassName="home-action" />

            </motion.div>
          </div>
        </div>

        <aside className="home-hero-aside">
          <figure className="home-hero-portrait">
            <img
              src={saadPortrait}
              alt="Portrait of Saad Zubairi"
              loading="eager"
            />
            <figcaption>
              <span>Portrait</span>
              <span>Saad Z.</span>
            </figcaption>
          </figure>

          <div className="home-hero-note">
            <span>Based in</span>
            <strong>New York</strong>
            <small>Involved in ambitious product, platform, and AI systems work.</small>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Home;
