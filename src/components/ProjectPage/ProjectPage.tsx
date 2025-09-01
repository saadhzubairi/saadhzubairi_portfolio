import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TexturedDiv from '../TexturedDiv';
import CustomDiv from '../CustomDiv';
import TexturedSpacer from '../TexturedSpacer';
import LightGallery from 'lightgallery/react';
import { motion } from 'framer-motion';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const ProjectSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-16">
    <h2 className="text-3xl  bg-neutral-100 dark:bg-gray-900 font-bold tracking-tight border-b border-gray-200 dark:border-gray-700">{title}</h2>
    <TexturedSpacer height={32} />
    {children}
  </section>
);

const ProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (projectId) {
        try {
          const [projectModule, projectsModule] = await Promise.all([
            import(`../../assets/portfolio/${projectId}.json`),
            import(`@/assets/portfolio/projects.json`)
          ]);
          setProject(projectModule.default);
          setProjects(projectsModule.default);
        } catch (error) {
          console.error("Failed to load project data:", error);
          // Handle error, e.g., navigate to a 404 page
          navigate('/404');
        }
      }
    };

    fetchProjectData();
  }, [projectId, navigate]);

  if (!project || projects.length === 0) {
    return <div>Loading...</div>;
  }

  const currentIndex = projects.findIndex(p => p.id === projectId);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TexturedDiv>
        <div className="pt-24 pb-12 sm:pb-16">
          <CustomDiv className=''>
            <div className="h-0"></div>
          </CustomDiv>
          <CustomDiv>
            <img
              src={project.heroImage.src}
              alt={project.heroImage.alt}
              className="w-full h-auto shadow-2xl border aspect-auto object-cover"
            />
          </CustomDiv>
          <CustomDiv>
            <div className="h-10"></div>
          </CustomDiv>
          <CustomDiv>
            <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto">
              {project.subtitle}
            </p>
          </CustomDiv>
          <CustomDiv>
            <div className="h-5"></div>
          </CustomDiv>
          <CustomDiv>
            <div className="text-center">
              <div className="flex justify-center gap-4">
                <Button variant="secondary" asChild >
                  <a href={project.links.github} target="_blank" className='' rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4 " /> GitHub
                  </a>
                </Button>
              </div>
            </div>
          </CustomDiv>
          <TexturedSpacer height={32} />
          <CustomDiv className=''>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8 ">
              <main className="lg:col-span-2 border-r border-gray-200 dark:border-gray-700">
                <ProjectSection title="About This Project">
                  <div className="space-y-4 px-2 prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                    {project.about.map((p: string, i: number) => <p key={i}>{p}</p>)}
                  </div>
                </ProjectSection>
              </main>

              <div className="lg:col-span-1 space-y-8 sticky top-24 border-l border-gray-200 dark:border-gray-700 self-start">
                <section className='border-b border-gray-200 dark:border-gray-700'>
                  <h3 className="text-xl font-semibold border-b border-t border-gray-200 dark:border-gray-700 px-2 py-1 bg-neutral-100 dark:bg-gray-900">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2 p-2 justify-center">
                    {[...project.techStack.frameworks, ...project.techStack.database, ...project.techStack.tools].map(tech => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </section>
                <section className='border-b border-gray-200 dark:border-gray-700'>
                  <h3 className="text-xl font-semibold border-b border-t border-gray-200 dark:border-gray-700 px-2 py-1 bg-neutral-100 dark:bg-gray-900">My Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground p-2">
                    {project.myResponsibilities.map((resp: string) => <li key={resp}>{resp}</li>)}
                  </ul>
                </section>
                <section className='border-b border-gray-200 dark:border-gray-700'>
                  <h3 className="text-xl font-semibold border-b border-t border-gray-200 dark:border-gray-700 px-2 py-1 bg-neutral-100 dark:bg-gray-900">Methodology</h3>
                  <p className="p-2 text-muted-foreground">
                    {project.methodology.split('**').map((part: string, i: number) =>
                      i % 2 === 1 ? <strong key={i} className="font-semibold text-foreground">{part}</strong> : part
                    )}
                  </p>
                </section>
              </div>
            </div>
          </CustomDiv>


          <CustomDiv>
            <ProjectSection title="Project Gallery">
              <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames="grid grid-cols-1 sm:grid-cols-2 gap-8"
              >
                {project.gallery.map((image: { src: string; alt: string }, index: number) => (
                  <a
                    href={image.src}
                    key={index}
                    className={`relative block group ${index >= 2 ? 'hidden' : ''}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto shadow-md border"
                    />
                    {index === 1 && project.gallery.length > 2 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold cursor-pointer transition-colors duration-300 group-hover:bg-opacity-60">
                        +{project.gallery.length - 2} more
                      </div>
                    )}
                  </a>
                ))}
              </LightGallery>
            </ProjectSection>
          </CustomDiv>

          <CustomDiv>
            <ProjectSection title="Challenges & Lessons Learned">
              <div className="space-y-8">
                {project.challengesAndLessons.map((item: { challenge: string; solution: string }, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-xl">{item.challenge}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.solution}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ProjectSection>
          </CustomDiv>

          <CustomDiv>
            <ProjectSection title="Skills Developed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {project.skillsDeveloped.hardSkills.map((skill: string) => <li key={skill}>{skill}</li>)}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Soft Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {project.skillsDeveloped.softSkills.map((skill: string) => <li key={skill}>{skill}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ProjectSection>
          </CustomDiv>

          <CustomDiv>
            <nav className="flex justify-between items-center border">
              <Button variant="outline" onClick={() => previousProject && navigate(`/portfolio/${previousProject.id}`)} disabled={!previousProject}>
                <ArrowLeft className="mr-2 h-4 w-4" /> {previousProject ? previousProject.name : 'No Previous Project'}
              </Button>
              <Button variant="outline" onClick={() => nextProject && navigate(`/portfolio/${nextProject.id}`)} disabled={!nextProject}>
                {nextProject ? nextProject.name : 'No Next Project'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </nav>
          </CustomDiv>

        </div>
      </TexturedDiv>
    </motion.div>
  );
};

export default ProjectPage;
