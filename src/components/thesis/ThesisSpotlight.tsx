import { ArrowUpRight, FileText, Presentation } from 'lucide-react';
import '../home/home.css';
import './thesisSpotlight.css';

const metrics = [
  { value: '100', label: 'learned scalar parameters' },
  { value: '20', label: 'unrolled ISTA layers' },
  { value: '~2x', label: 'peak MSE improvement' },
  { value: '0.59', label: 'baseline leakage floor' },
];

const findings = [
  {
    kicker: 'The bridge',
    title: 'Classical signal processing, made trainable.',
    body: 'BEADS is recast as a compact neural architecture where every layer keeps physically meaningful parameters instead of hiding the work inside a black box.',
  },
  {
    kicker: 'The result',
    title: 'Adaptivity helps, but the floor is real.',
    body: 'The learned model improves reconstruction without per-signal tuning, while the Baseline Leakage Index stubbornly plateaus across loss configurations.',
  },
  {
    kicker: 'The lesson',
    title: 'Inductive bias beats loss engineering.',
    body: 'When dense chromatographic peaks violate the sparsity assumption, the inherited soft-thresholding operator defines the performance limit.',
  },
];

type ThesisSpotlightProps = {
  embedded?: boolean;
};

const ThesisSpotlight = ({ embedded = false }: ThesisSpotlightProps) => {
  const content = (
    <>
      <header className="home-section-heading home-section-heading-solo">
        <div>
          <p className="home-section-label">Research thesis / NYU Tandon</p>
          <h2>Thesis</h2>
        </div>
      </header>

      <div className="home-section-body">
        <div className="thesis-panel">
          <div className="thesis-hero">
            <div className="thesis-copy">
              <p className="thesis-eyebrow">May 2026 / Advisor: Ivan Selesnick</p>
              <h3 className="thesis-title">
                <span className="thesis-title-strong">LBEADS-NET</span>: Algorithm Unrolling for Learned Baseline
                Estimation and Denoising in Chromatographic Signals
              </h3>
              <p className="thesis-lede">
                Goal: Translate BEADS into a learned optimizer, measure what improves,
                then name the exact structural reason the model cannot fully
                escape baseline leakage.
              </p>

              <div className="thesis-actions" aria-label="Thesis artifacts">
                <a
                  className="home-action home-action-primary"
                  href="/Thesis/lbeads-net-thesis.pdfs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="h-4 w-4" />
                  Read thesis
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  className="home-action"
                  href="/Thesis/lbeads-net-defense.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Presentation className="h-4 w-4" />
                  Defense deck
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="thesis-metrics" aria-label="Thesis metrics">
              {metrics.map((metric) => (
                <div key={metric.label} className="thesis-metric">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="thesis-visual-grid">
            <div className="thesis-findings">
              {findings.map((finding) => (
                <article key={finding.kicker}>
                  <span>{finding.kicker}</span>
                  <h4>{finding.title}</h4>
                  <p>{finding.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (embedded) {
    return <div className="home-about-module thesis-spotlight">{content}</div>;
  }

  return (
    <section className="home-section home-index-section thesis-spotlight" id="Thesis">
      <div className="home-section-inner">{content}</div>
    </section>
  );
};

export default ThesisSpotlight;
