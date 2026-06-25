import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import experienceData from '../../assets/EDXP_data/experience.json';
import educationData from '../../assets/EDXP_data/education.json';
import researchData from '../../assets/EDXP_data/research.json';
import '../home/home.css';

const ease = [0.23, 0.74, 0.19, 1] as const;

const currentRole = experienceData[0];
const latestEducation = educationData[0];
const thesis = researchData[0];

type HeroAtAGlanceProps = {
  embedded?: boolean;
};

const HeroAtAGlance = ({ embedded = false }: HeroAtAGlanceProps) => {
  const content = (
    <>
      <header className="home-section-heading home-section-heading-solo">
        <div>
          <p className="home-section-label">Snapshot / credentials / context</p>
          <h2>At a Glance</h2>
        </div>
      </header>

      <div className="home-section-body home-snapshot-body">
        <div className="home-snapshot-shell">
          <div className="home-snapshot-upper">
            <motion.article
              className="home-snapshot-panel home-snapshot-role-panel"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease }}
            >
              <p className="home-section-label">Current role</p>

              <div className="home-snapshot-role-head">
                <div>
                  <p className="home-snapshot-kicker">{currentRole.company}</p>
                  <h3>{currentRole.desg}</h3>
                </div>

                <a
                  className="home-snapshot-inline-link"
                  href={currentRole.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Company site
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <p className="home-snapshot-copy">{currentRole.desc}</p>

              <ul className="home-snapshot-points" aria-label="Current role highlights">
                {currentRole.resps.slice(0, 3).map((point) => (
                  <li key={point} className="home-snapshot-point">
                    <span aria-hidden className="home-snapshot-point-dot" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <div className="home-snapshot-rail">
              <motion.article
                className="home-snapshot-panel"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease, delay: 0.06 }}
              >
                <p className="home-section-label">Education</p>
                <p className="home-snapshot-line">
                  <strong>{latestEducation.degree}</strong>
                  <span>
                    {latestEducation.institute} · {latestEducation.years.replace(' - ', '–')}
                  </span>
                </p>
              </motion.article>

              {thesis && (
                <motion.article
                  className="home-snapshot-panel"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease, delay: 0.1 }}
                >
                  <p className="home-section-label">Research</p>
                  <p className="home-snapshot-line">
                    <strong>LBEADS-NET thesis</strong>
                    <span>
                      Algorithm-unrolling research in chromatographic signal
                      denoising at NYU Tandon.
                    </span>
                  </p>

                  <a
                    className="home-snapshot-inline-link"
                    href={thesis.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read thesis
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </motion.article>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (embedded) {
    return <div className="home-about-module home-snapshot">{content}</div>;
  }

  return (
    <section className="home-section home-index-section home-snapshot" id="About">
      <div className="home-section-inner">{content}</div>
    </section>
  );
};

export default HeroAtAGlance;
