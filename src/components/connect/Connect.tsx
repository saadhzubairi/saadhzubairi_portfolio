import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import '../home/home.css';

type Channel = {
  label: string;
  value: string;
  href: string;
  note: string;
};

const channels: Channel[] = [
  {
    label: 'Email',
    value: 'saadhzubairi@outlook.com',
    href: 'mailto:saadhzubairi@outlook.com',
    note: 'Projects / work inquiries',
  },
  {
    label: 'LinkedIn',
    value: 'in/saadhzubairi',
    href: 'https://www.linkedin.com/in/saadhzubairi/',
    note: 'Recruiting / introductions',
  },
  {
    label: 'GitHub',
    value: '@saadhzubairi',
    href: 'https://github.com/saadhzubairi/',
    note: 'Code / shipped work',
  },
  {
    label: 'Discord',
    value: 'saadhzubairi#1469',
    href: 'https://discord.com/users/saadhzubairi#1469',
    note: 'Quick async chat',
  },
  {
    label: 'Calendly',
    value: 'Book a 30-min call',
    href: 'https://calendly.com/saadhzubairi/30min?month=2025-08',
    note: 'Schedule a call',
  },
  {
    label: 'Zoom',
    value: 'My personal room',
    href: 'https://nyu.zoom.us/my/saadhzubairi',
    note: 'Direct meeting room',
  },
];

const ease = [0.23, 0.74, 0.19, 1] as const;

const Connect = () => {
  return (
    <section id="Contact" className="home-section home-index-section home-contact-section">
      <div className="home-section-inner home-contact-inner">
        <header className="home-section-heading">
          <div>
            <p className="home-section-label">Contact / availability / channels</p>
            <h2>Contact</h2>
          </div>
          <p>
            Open to product engineering, platform work, and applied AI
            conversations. Pick the channel that fits the ask.
          </p>
        </header>

        <div className="home-section-body">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease }}
            className="home-contact-shell"
          >
            <div className="home-contact-overview">
              <div className="home-contact-overview-copy">
                <p className="home-section-label">Available for</p>
                <h3>Open to new roles and hard systems work.</h3>
                <p>
                  I&apos;m based in New York and happy to talk through full-time
                  roles, consulting, shipped product work, or weird infra and AI
                  ideas worth building.
                </p>
              </div>

              <div className="home-contact-summary-grid">
                <div className="home-contact-summary-card">
                  <span>Based in</span>
                  <strong>New York, NY</strong>
                </div>
                <div className="home-contact-summary-card">
                  <span>Best first ping</span>
                  <strong>Email / LinkedIn</strong>
                </div>
              </div>
            </div>

            <div className="home-contact-grid">
              {channels.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, ease, delay: 0.04 * i }}
                  className="home-contact-card"
                >
                  <div className="home-contact-card-copy">
                    <span className="home-contact-card-kicker">{c.note}</span>
                    <h3>{c.label}</h3>
                    <p>{c.value}</p>
                  </div>

                  <ArrowUpRight className="home-contact-card-icon" />
                </motion.a>
              ))}
            </div>
          </motion.div>
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
