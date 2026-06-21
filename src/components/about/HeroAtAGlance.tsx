import { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import CustomDiv from '../CustomDiv';
import { Calendar, ExternalLink, GraduationCap, Link as LinkIcon, ChevronDown } from 'lucide-react';
import {
  Expandable,
  ExpandableTrigger,
} from '@/components/ui/expandable';
import { CutoutCorner } from '@/components/ui/cutout-card';
import experienceData from '../../assets/EDXP_data/experience.json';
import educationData from '../../assets/EDXP_data/education.json';
import researchData from '../../assets/EDXP_data/research.json';
import skillsData from '../../assets/skills_data/skills.json';

const cardTransition = { duration: 0.35, ease: [0.23, 0.74, 0.19, 1] as [number, number, number, number] };

const computeDuration = (years: string): string => {
  const parts = years.split('–').map((s) => s.trim());
  if (parts.length < 2) return years;

  const parseDate = (s: string): Date => {
    if (s.toLowerCase() === 'present') return new Date();
    return new Date(s + ' 1');
  };

  const start = parseDate(parts[0]);
  const end = parseDate(parts[1]);
  const months = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44)));

  if (months < 12) return `${months} mo${months !== 1 ? 's' : ''}`;
  const yrs = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${yrs} yr${yrs !== 1 ? 's' : ''}`;
  return `${yrs} yr${yrs !== 1 ? 's' : ''} ${rem} mo${rem !== 1 ? 's' : ''}`;
};

// ─── Row 1: Work Experiences ────────────────────────────────────────────────

const recentExperiences = experienceData.slice(0, 3);

const ExperienceCard = ({
  exp,
  isExpanded,
  onToggle,
}: {
  exp: (typeof experienceData)[0];
  isExpanded: boolean;
  onToggle: () => void;
}) => (
  <Expandable
    expanded={isExpanded}
    onToggle={onToggle}
    expandDirection="vertical"
    expandBehavior="push"
    transitionDuration={0.35}
    easeType={[0.23, 0.74, 0.19, 1]}
    className={isExpanded ? '' : 'h-full'}
  >
    <ExpandableTrigger className={isExpanded ? '' : 'h-full'}>
      <motion.div
        layout
        transition={cardTransition}
        className={`select-none rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-5 cursor-pointer hover:shadow-lg dark:hover:shadow-black/20 flex flex-col relative ${isExpanded ? '' : 'h-full'}`}
      >
        {/* Header */}
        <motion.div layout="position" className="flex items-center gap-4 mb-5">
          <img
            src={exp.logo}
            alt={exp.company}
            className="w-14 h-14 rounded-xl object-contain bg-gray-50 dark:bg-gray-800 p-1 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono text-gray-400 dark:text-gray-600 mt-0.5">
              {exp.company}
            </p>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 leading-tight">
              {exp.desg}
            </h3>
          </div>
        </motion.div>

        {/* Duration pin — cutout style top-right when collapsed, inline when expanded */}
        {!isExpanded && (
          <div className="absolute top-0 right-0 flex items-start">
            {/* "Current" badge for ongoing roles */}
            {exp.years.toLowerCase().includes('present') && (
              <div className="relative rounded-bl-[16px] bg-emerald-600 dark:bg-emerald-500 px-3 py-2 text-white dark:text-white">
                <span className="text-xs font-semibold whitespace-nowrap">Current</span>
                <CutoutCorner
                  className="absolute top-0 -left-[23px] -rotate-90 text-emerald-600 dark:text-emerald-500"
                  size={24}
                />
              </div>
            )}
            {/* Duration badge */}
            <div className={`bg-gray-900 dark:bg-gray-100 px-3.5 py-2 text-white dark:text-gray-900 rounded-tr-2xl ${exp.years.toLowerCase().includes('present') ? '' : 'relative rounded-bl-[16px]'}`}>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap">
                <Calendar className="w-3 h-3" />
                {computeDuration(exp.years)}
              </span>
              {!exp.years.toLowerCase().includes('present') && (
                <CutoutCorner
                  className="absolute top-0 -left-[23px] -rotate-90 text-gray-900 dark:text-gray-100"
                  size={24}
                />
              )}
              <CutoutCorner
                className="absolute right-0 -bottom-[23px] -rotate-90 text-gray-900 dark:text-gray-100"
                size={24}
              />
            </div>
          </div>
        )}
        {isExpanded && (
          <motion.div
            layout="position"
            className="mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 whitespace-nowrap">
              <Calendar className="w-3 h-3" />
              {exp.years}
            </span>
          </motion.div>
        )}

        {/* Skills */}
        <motion.div layout="position" className="flex flex-wrap gap-1.5">
          {exp.skills.slice(0, 6).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
            >
              {skill}
            </span>
          ))}
        </motion.div>

        {/* Expanded content — sizing handled by parent's layout prop; we only fade opacity here */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="mt-6 space-y-5"
          >
            {/* Role description */}
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
              {exp.desc}
            </p>

            {/* Divider */}
            <hr className="border-gray-100 dark:border-gray-800" />

            {/* Contributions */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-3">
                Key Contributions
              </p>
              <div className="space-y-3">
                {exp.resps.map((r, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
                    <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      {r}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra skills + link row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {exp.skills.length > 6 &&
                exp.skills.slice(6).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-gray-100 dark:bg-gray-800/60 text-gray-500 dark:text-gray-500"
                  >
                    {skill}
                  </span>
                ))}
              <span className="flex-1" />
              <a
                href={exp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/60 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" />
                {exp.company}
              </a>
            </div>
          </motion.div>
        )}
      </motion.div>
    </ExpandableTrigger>
  </Expandable>
);

// ─── Row 2a: Education ──────────────────────────────────────────────────────

const latestEducation = educationData[0];

const EducationCard = ({
  isExpanded,
  onToggle,
}: {
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const courses = latestEducation.moreInfo.find((s) => s.Heading === 'Courses')?.List || [];
  const thesis = latestEducation.moreInfo.find((s) => s.Heading === 'Thesis')?.List || [];

  return (
    <Expandable
      expanded={isExpanded}
      onToggle={onToggle}
      expandDirection="vertical"
      expandBehavior="push"
      transitionDuration={0.35}
      easeType={[0.23, 0.74, 0.19, 1]}
      className="h-full"
    >
      <ExpandableTrigger className="h-full">
        <motion.div
          layout
          transition={cardTransition}
          className="select-none h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-5 cursor-pointer hover:shadow-lg dark:hover:shadow-black/20 flex flex-col relative"
        >
          {/* Class-of badge — same cutout style as ExperienceCard's duration badge */}
          {!isExpanded && (
            <div className="absolute top-0 right-0 flex items-start">
              <div className="relative rounded-tr-2xl rounded-bl-[16px] bg-gray-900 dark:bg-gray-100 px-3.5 py-2 text-white dark:text-gray-900">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap">
                  <GraduationCap className="w-3 h-3" />
                  Class of &apos;26
                </span>
                <CutoutCorner
                  className="absolute top-0 -left-[23px] -rotate-90 text-gray-900 dark:text-gray-100"
                  size={24}
                />
                <CutoutCorner
                  className="absolute right-0 -bottom-[23px] -rotate-90 text-gray-900 dark:text-gray-100"
                  size={24}
                />
              </div>
            </div>
          )}

          {/* Header */}
          <motion.div layout="position" className="flex items-center gap-4 mb-5">
            <img
              src={latestEducation.logo}
              alt={latestEducation.institute}
              className="w-14 h-14 rounded-xl object-contain bg-gray-50 dark:bg-gray-800 p-1 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono text-gray-400 dark:text-gray-600 mt-0.5">
                {latestEducation.institute}
              </p>
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 leading-tight">
                {latestEducation.degree}
              </h3>
            </div>
          </motion.div>

          {/* Date row */}
          <motion.div layout="position" className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-500 mb-5">
            <Calendar className="w-3.5 h-3.5" />
            {latestEducation.session}
          </motion.div>

          {/* Chips — collapsed only */}
          {!isExpanded && (
            <motion.div layout="position" className="flex flex-wrap gap-1.5">
              {courses.slice(0, 4).map((course) => (
                <span
                  key={course}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                >
                  {course}
                </span>
              ))}
              {thesis.length > 0 && (
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  Thesis
                </span>
              )}
            </motion.div>
          )}

          {/* Expanded content — parent layout prop handles sizing; simple fade matches ExperienceCard */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="space-y-4"
            >
              {thesis.length > 0 && (
                <div className="rounded-2xl bg-purple-100 dark:bg-purple-900/40 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-1.5">
                    Thesis
                  </p>
                  {thesis.map((t, i) => (
                    <p key={i} className="text-sm text-purple-900 dark:text-purple-200 leading-relaxed">
                      {t}
                    </p>
                  ))}
                </div>
              )}

              {courses.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-2">
                    Courses
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {courses.map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </ExpandableTrigger>
    </Expandable>
  );
};

// ─── Row 2b: Research ───────────────────────────────────────────────────────

const ResearchCard = ({
  isExpanded,
  onToggle,
}: {
  isExpanded: boolean;
  onToggle: () => void;
}) => (
  <Expandable
    expanded={isExpanded}
    onToggle={onToggle}
    expandDirection="vertical"
    expandBehavior="push"
    transitionDuration={0.35}
    easeType={[0.23, 0.74, 0.19, 1]}
    className="h-full"
  >
    <ExpandableTrigger className="h-full">
      <motion.div
        layout
        transition={cardTransition}
        className="select-none h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-5 cursor-pointer hover:shadow-lg dark:hover:shadow-black/20 flex flex-col"
      >
        {/* Header */}
        <motion.div layout="position" className="mb-4">
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 leading-tight">
            Publications & Research
          </h3>
          <p className="text-xs font-mono text-gray-400 dark:text-gray-600 mt-1">
            {researchData.length} paper{researchData.length !== 1 && 's'} &middot; New York University
          </p>
        </motion.div>

        {/* Paper chips — collapsed only */}
        {!isExpanded && (
          <motion.div layout="position" className="flex flex-wrap gap-2">
            {researchData.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <LinkIcon className="w-3 h-3" />
                <span>Paper {i + 1}</span>
              </a>
            ))}
          </motion.div>
        )}

        {/* Expanded content — parent layout prop handles sizing; simple fade matches ExperienceCard */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="space-y-3"
          >
            {researchData.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="block p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                  {item.source}
                </p>
              </a>
            ))}
          </motion.div>
        )}
      </motion.div>
    </ExpandableTrigger>
  </Expandable>
);

// ─── Row 3: Skills ──────────────────────────────────────────────────────────

const DOMAINS = [
  'Full-Stack Engineering',
  'AI & Machine Learning',
  'Backend & APIs',
  'Data & Storage',
  'Cloud & DevOps',
];

const SkillsCard = ({
  isExpanded,
  onToggle,
}: {
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const allSkills = skillsData.flatMap((cat) => cat.skills);

  return (
    <motion.div
      layout
      onClick={onToggle}
      transition={cardTransition}
      className="select-none rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-5 cursor-pointer hover:shadow-lg dark:hover:shadow-black/20 flex flex-col"
    >
      <motion.div layout="position" className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 leading-tight">
            Skills & Technologies
          </h3>
          <p className="text-xs font-mono text-gray-400 dark:text-gray-600 mt-1">
            {allSkills.length} technologies &middot; {DOMAINS.length} domains
          </p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-400 dark:text-gray-600 mt-1"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Domain chips — match the rest of the page's skill-chip style */}
      <motion.div layout="position" className="flex flex-wrap gap-1.5">
        {DOMAINS.map((d) => (
          <span
            key={d}
            className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
          >
            {d}
          </span>
        ))}
      </motion.div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6"
        >
          {skillsData.map((category) => (
            <div key={category.category}>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 mb-3">
                {category.category}
              </p>
              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-3">
                    {skill.logo ? (
                      <img src={skill.logo} alt={skill.name} className="w-4 h-4 object-contain flex-shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-[8px] font-bold text-gray-500 flex-shrink-0">
                        {skill.name[0]}
                      </span>
                    )}
                    <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">
                      {skill.name}
                    </span>
                    <div className="flex gap-1 flex-shrink-0">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className={`w-1.5 h-1.5 rounded-full ${
                            dot <= skill.level
                              ? 'bg-gray-800 dark:bg-gray-200'
                              : 'bg-gray-200 dark:bg-gray-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────

type CardId = `exp-${number}` | 'eduResearch' | 'skills';

const HeroAtAGlance = () => {
  const [expandedCard, setExpandedCard] = useState<CardId | null>(null);

  const toggle = (id: CardId) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section className="section select-none" id="AtAGlance">
      <CustomDiv>
        <div className=""></div>
      </CustomDiv>
      <CustomDiv>
        <h2 className="text-6xl font-thin text-black dark:text-gray-100">At a Glance</h2>
      </CustomDiv>
      <CustomDiv>
        <span className="text-lg text-gray-500">A summary of my skills and experiences</span>
      </CustomDiv>
      <CustomDiv>
        <div className="h-10"></div>
      </CustomDiv>

      <CustomDiv>
        <LayoutGroup>
          <div className="space-y-4">
            {/* Row 1: 3 most recent experiences — rearranges on expand */}
            {(() => {
              const expandedExpIdx = [0, 1, 2].find((i) => expandedCard === `exp-${i}`);
              const isAnyExpExpanded = expandedExpIdx !== undefined;

              // Reorder: expanded card first, rest in original order
              const orderedIndices = isAnyExpExpanded
                ? [expandedExpIdx, ...[0, 1, 2].filter((i) => i !== expandedExpIdx)]
                : [0, 1, 2];

              return (
                <motion.div
                  layout
                  transition={cardTransition}
                  className={`grid gap-4 ${
                    isAnyExpExpanded
                      ? 'grid-cols-1 md:grid-cols-3 md:grid-rows-[1fr_1fr]'
                      : 'grid-cols-1 md:grid-cols-3 md:grid-rows-[1fr]'
                  }`}
                >
                  {orderedIndices.map((i, pos) => (
                    <motion.div
                      key={recentExperiences[i].company}
                      layout
                      transition={cardTransition}
                      className={
                        isAnyExpExpanded && pos === 0
                          ? 'md:col-span-2 md:row-span-2'
                          : ''
                      }
                    >
                      <ExperienceCard
                        exp={recentExperiences[i]}
                        isExpanded={expandedCard === `exp-${i}`}
                        onToggle={() => toggle(`exp-${i}`)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              );
            })()}

            {/* Row 2: Education + Research (linked — expand together) */}
            <motion.div
              layout
              transition={cardTransition}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <EducationCard
                isExpanded={expandedCard === 'eduResearch'}
                onToggle={() => toggle('eduResearch')}
              />
              <ResearchCard
                isExpanded={expandedCard === 'eduResearch'}
                onToggle={() => toggle('eduResearch')}
              />
            </motion.div>

            {/* Row 3: Skills */}
            <div className="grid grid-cols-1 gap-4">
              <SkillsCard
                isExpanded={expandedCard === 'skills'}
                onToggle={() => toggle('skills')}
              />
            </div>
          </div>
        </LayoutGroup>
      </CustomDiv>

      <CustomDiv>
        <div className="h-6"></div>
      </CustomDiv>
    </section>
  );
};

export default HeroAtAGlance;
