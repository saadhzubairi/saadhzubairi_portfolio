import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type Channel = {
  no: string;
  label: string;
  value: string;
  href: string;
};

const channels: Channel[] = [
  { no: '01', label: 'Email', value: 'saadhzubairi@outlook.com', href: 'mailto:saadhzubairi@outlook.com' },
  { no: '02', label: 'LinkedIn', value: 'in/saadhzubairi', href: 'https://www.linkedin.com/in/saadhzubairi/' },
  { no: '03', label: 'GitHub', value: '@saadhzubairi', href: 'https://github.com/saadhzubairi/' },
  { no: '04', label: 'Discord', value: 'saadhzubairi#1469', href: 'https://discord.com/users/saadhzubairi#1469' },
  { no: '05', label: 'Calendly', value: 'Book a 30-min call', href: 'https://calendly.com/saadhzubairi/30min?month=2025-08' },
  { no: '06', label: 'Zoom', value: 'My personal room', href: 'https://nyu.zoom.us/my/saadhzubairi' },
];

const ease = [0.23, 0.74, 0.19, 1] as const;

const Connect = () => {
  return (
    <section
      id="Contact"
      className="relative w-full bg-black text-white selection:bg-white selection:text-black"
    >
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-20 sm:px-8 sm:py-28">
        {/* top meta rule */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="flex items-end justify-between border-t border-white/25 pt-4"
        >
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white/50">
            (06) — Contact
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white/50">
            New York, NY
          </span>
        </motion.div>

        {/* headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="mt-10 font-sans text-[clamp(3.5rem,15vw,12rem)] font-semibold leading-[0.82] tracking-tighter"
        >
          Get in
          <br />
          <span className="font-serif font-normal italic">touch.</span>
        </motion.h2>

        {/* lead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="mt-8 max-w-md text-base leading-relaxed text-white/60 sm:ml-auto sm:text-right"
        >
          Currently open to new opportunities — my inbox is always on. Have a
          question, or just want to say hi? Pick a channel below.
        </motion.p>

        {/* channel index */}
        <div className="mt-14">
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
              className={`group relative isolate flex items-center gap-4 border-t border-white/20 py-5 sm:gap-8 sm:py-7 ${
                i === channels.length - 1 ? 'border-b' : ''
              }`}
            >
              {/* sliding fill */}
              <span
                aria-hidden
                className="absolute inset-0 -z-10 origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.23,0.74,0.19,1)] group-hover:scale-x-100"
              />

              <span className="w-8 shrink-0 font-mono text-xs text-white/40 transition-colors duration-300 group-hover:text-black/50 sm:text-sm">
                {c.no}
              </span>

              <span className="flex-1 font-sans text-3xl font-medium uppercase tracking-tight transition-colors duration-300 group-hover:text-black sm:text-5xl">
                {c.label}
              </span>

              <span className="hidden font-mono text-sm text-white/50 transition-colors duration-300 group-hover:text-black/60 sm:block">
                {c.value}
              </span>

              <ArrowUpRight className="h-6 w-6 shrink-0 text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-black sm:h-8 sm:w-8" />
            </motion.a>
          ))}
        </div>

        {/* footer meta rule */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mt-16 flex flex-col gap-2 border-t border-white/25 pt-4 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white/50 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>Designed &amp; Built by Saad Zubairi</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Connect;
