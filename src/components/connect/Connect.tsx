import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import '../home/home.css';

type Channel = {
  label: string;
  value: string;
  href: string;
};

const channels: Channel[] = [
  { label: 'Email', value: 'saadhzubairi@outlook.com', href: 'mailto:saadhzubairi@outlook.com' },
  { label: 'LinkedIn', value: 'in/saadhzubairi', href: 'https://www.linkedin.com/in/saadhzubairi/' },
  { label: 'GitHub', value: '@saadhzubairi', href: 'https://github.com/saadhzubairi/' },
  { label: 'Discord', value: 'saadhzubairi#1469', href: 'https://discord.com/users/saadhzubairi#1469' },
  { label: 'Calendly', value: 'Book a 30-min call', href: 'https://calendly.com/saadhzubairi/30min?month=2025-08' },
  { label: 'Zoom', value: 'My personal room', href: 'https://nyu.zoom.us/my/saadhzubairi' },
];

const ease = [0.23, 0.74, 0.19, 1] as const;

const Connect = () => {
  return (
    <section
      id="Contact"
      className="home-section home-contact-section bg-black text-white selection:bg-white selection:text-black"
    >
      <div className="home-section-inner home-contact-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="home-contact-meta"
        >
          <span>
            Contact
          </span>
          <span>
            New York, NY
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="home-contact-title"
        >
          Get in
          <br />
          <span className="home-contact-title-strong">touch.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="home-contact-lead"
        >
          Currently open to new opportunities — my inbox is always on. Have a
          question, or just want to say hi? Pick a channel below.
        </motion.p>

        <div className="home-contact-list">
          {channels.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease, delay: 0.04 * i }}
              className={`home-contact-link group ${
                i === channels.length - 1 ? 'border-b' : ''
              }`}
            >
              <span
                aria-hidden
                className="home-contact-link-fill"
              />

              <span className="home-contact-channel">
                {c.label}
              </span>

              <span className="home-contact-value">
                {c.value}
              </span>

              <ArrowUpRight className="home-contact-icon" />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="home-contact-footer"
        >
          <span>Designed &amp; Built by Saad Zubairi</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Connect;
