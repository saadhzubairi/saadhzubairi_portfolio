import { motion } from 'framer-motion';
import '../home/home.css';

const ease = [0.23, 0.74, 0.19, 1] as const;

const stackGroups = [
  {
    domain: 'Languages',
    items: ['Python', 'TypeScript', 'Java', 'Go', 'SQL', 'C++', 'JavaScript', 'Rust', 'Kotlin'],
  },
  {
    domain: 'AI/ML',
    items: ['PyTorch', 'LangChain', 'RAG', 'Vector Databases', 'LLM Fine-tuning', 'MLflow'],
  },
  {
    domain: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Terraform', 'Ansible', 'Linux', 'Git', 'GitHub Actions', 'OpenStack Swift'],
  },
  {
    domain: 'Frameworks',
    items: ['Next.js', 'Nuxt.js', 'Express.js', 'Nest.js', 'Django', 'FastAPI', 'T3 Stack', 'REST', 'GraphQL', 'Node.js'],
  },
  {
    domain: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Vector Databases', 'MySQL'],
  },
  {
    domain: 'Frontend & Mobile',
    items: ['React.js', 'Vue.js', 'OpenLayers', 'Android (Kotlin)', 'Chrome Extensions'],
  },
  {
    domain: 'Monitoring & Tools',
    items: ['Prometheus', 'Grafana', 'Selenium'],
  },
] as const;

type ToolsOfTradeProps = {
  embedded?: boolean;
};

const ToolsOfTrade = ({ embedded = false }: ToolsOfTradeProps) => {
  const content = (
    <>
      <header className="home-section-heading home-section-heading-solo">
        <div>
          <p className="home-section-label">Stack / systems / workflows</p>
          <h2>Tools of the Trade</h2>
        </div>
      </header>

      <div className="home-section-body">
        <motion.div
          className="tools-trade-shell"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease }}
        >
          {stackGroups.map((group, index) => (
            <motion.article
              key={group.domain}
              className="tools-trade-row"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, ease, delay: index * 0.04 }}
            >
              <span className="tools-trade-domain">{group.domain}</span>
              <p>{group.items.join(', ')}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </>
  );

  if (embedded) {
    return <div className="home-about-module tools-trade-section">{content}</div>;
  }

  return (
    <section className="home-section home-index-section tools-trade-section" id="Tools">
      <div className="home-section-inner">{content}</div>
    </section>
  );
};

export default ToolsOfTrade;
