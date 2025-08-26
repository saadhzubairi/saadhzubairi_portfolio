/// <reference types="vite/client" />

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import TexturedDiv from '../../TexturedDiv';
import CustomDiv from '../../CustomDiv';
import TexturedSpacer from '../../TexturedSpacer';
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { motion } from 'framer-motion';

const GameProjectPage: React.FC = () => {
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<any>(null);
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        const fetchProjectData = async () => {
            if (projectId) {
                try {
                    const projectModules = import.meta.glob('/src/assets/portfolio/*.json');
                    const projectPath = `/src/assets/portfolio/${projectId}.json`;
                    const projectsModule = await import(`@/assets/portfolio/projects.json`);

                    if (projectModules[projectPath]) {
                        const projectModule = await projectModules[projectPath]() as { default: any };
                        setProject(projectModule.default);
                        setProjects(projectsModule.default);
                    } else {
                        throw new Error('Project not found');
                    }
                } catch (error) {
                    console.error("Failed to load project data:", error);
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
            <TexturedDiv className='pt-12'>
                <div className="py-12 sm:py-16">

                    <CustomDiv>
                        <div className=""></div>
                    </CustomDiv>

                    <CustomDiv>
                        <h1 className="text-5xl md:text-6xl font-bold">{project.name}</h1>
                    </CustomDiv>

                    <CustomDiv>
                        <p className="text-lg text-muted-foreground max-w-3xl">{project.subtitle}</p>
                    </CustomDiv>

                    <CustomDiv>
                        <div className="h-10"></div>
                    </CustomDiv>
                    <CustomDiv>
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <Button variant="secondary" asChild>
                                <a href={project.links[0]} target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" />
                                    View Code
                                </a>
                            </Button>
                        </div>
                    </CustomDiv>
                    <CustomDiv>
                        <div className="h-10"></div>
                    </CustomDiv>

                    <TexturedSpacer height={32} />

                    {/* Main Content */}

                    <main className="">
                        {/* Gameplay Video Section */}

                        <CustomDiv>
                            <div className="h-10"></div>
                        </CustomDiv>
                        <CustomDiv>
                            <h2 className="text-3xl font-bold ">Gameplay Demo</h2>
                        </CustomDiv>
                        <CustomDiv>
                            <div className="h-10"></div>
                        </CustomDiv>

                        <CustomDiv className="aspect-video border border-gray-300 dark:border-gray-700">
                            <iframe
                                src={project.youtubeLink}
                                title="Gameplay Demo"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </CustomDiv>

                        <CustomDiv>
                            <div className="h-10"></div>
                        </CustomDiv>
                        <CustomDiv>
                            <h2 className="text-3xl font-bold">About The Project</h2>
                        </CustomDiv>
                        <CustomDiv>
                            <div className="h-4"></div>
                        </CustomDiv>
                        {/* About the Game Section */}
                        <CustomDiv>
                            <div className="text-muted-foreground leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: project.introText }} />
                        </CustomDiv>

                        <TexturedSpacer height={32} />

                        {/* Tech & Structure Grid */}
                        <div className="flex flex-col">
                            {/* Tech Stack */}
                            <section>
                                <CustomDiv>
                                    <h3 className="text-2xl font-bold">Technology Used</h3>
                                </CustomDiv>
                                <CustomDiv>
                                    <div className="h-4"></div>
                                </CustomDiv>
                                <div className="p-2">
                                    <CustomDiv>
                                        <p className="text-muted-foreground">{project.techText}</p>
                                    </CustomDiv>
                                    <CustomDiv>
                                        <div className="h-4"></div>
                                    </CustomDiv>
                                    <CustomDiv>
                                        <div className="space-y-3">
                                            <p className="font-semibold">Engine & Language:</p>
                                            <ul className="flex flex-wrap gap-2">
                                                {project.techStack.frameworks.map((tech: string) => (
                                                    <Badge key={tech} variant="secondary">{tech}</Badge>
                                                ))}
                                            </ul>
                                        </div>
                                    </CustomDiv>
                                </div>
                            </section>

                            {/* Project Structure */}
                            <section>
                                <CustomDiv>
                                    <h3 className="text-2xl font-bold">Project Structure</h3>
                                </CustomDiv>
                                <CustomDiv>
                                    <div className="h-4"></div>
                                </CustomDiv>
                                <div className="p-2">
                                    <CustomDiv>
                                        <div className="text-sm text-muted-foreground leading-relaxed space-y-3" dangerouslySetInnerHTML={{ __html: project.structureText }} />
                                    </CustomDiv>
                                </div>
                            </section>
                        </div>

                        <TexturedSpacer height={32} />


                        <CustomDiv>
                            <h2 className="text-3xl font-bold">Gallery</h2>
                        </CustomDiv>
                        <CustomDiv>
                            <div className="h-4"></div>
                        </CustomDiv>
                        <section>
                            <CustomDiv>
                                <LightGallery
                                    speed={500}
                                    plugins={[lgThumbnail, lgZoom]}
                                    elementClassNames="grid grid-cols-1 sm:grid-cols-2 gap-6"
                                >
                                    {project.screenshots.map((screenshot: string, index: number) => (
                                        <a
                                            href={screenshot}
                                            key={index}
                                            className={`relative block group h-[400px] ${index >= 2 ? 'hidden' : ''}`}
                                        >
                                            <img
                                                src={screenshot}
                                                alt={`Screenshot ${index + 1}`}
                                                className="w-full h-full object-cover border border-gray-300 dark:border-gray-700"
                                            />
                                            {index === 1 && project.screenshots.length > 2 && (
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold cursor-pointer transition-colors duration-300 group-hover:bg-opacity-60">
                                                    +{project.screenshots.length - 2} more
                                                </div>
                                            )}
                                        </a>
                                    ))}
                                </LightGallery>
                            </CustomDiv>
                        </section>

                        <TexturedSpacer height={32} />

                        {/* Lessons Learned */}
                        <CustomDiv>
                            <h2 className="text-3xl font-bold">Lessons Learned</h2>
                        </CustomDiv>
                        <CustomDiv>
                            <div className="h-4"></div>
                        </CustomDiv>
                        <section>
                            <CustomDiv>
                                <div className="text-muted-foreground leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: project.lessonsLearned }} />
                            </CustomDiv>
                        </section>
                    </main>


                    <TexturedSpacer height={64} />

                    {/* Navigation */}
                    <CustomDiv>
                        <nav className="flex justify-between items-center border border-gray-200 dark:border-gray-700 p-4">
                            <Button variant="outline" onClick={() => previousProject && navigate(`/portfolio/project/game/${previousProject.id}`)} disabled={!previousProject}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> {previousProject ? previousProject.name : 'No Previous Project'}
                            </Button>
                            <Button variant="outline" onClick={() => nextProject && navigate(`/portfolio/project/game/${nextProject.id}`)} disabled={!nextProject}>
                                {nextProject ? nextProject.name : 'No Next Project'} <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </nav>
                    </CustomDiv>
                </div>
            </TexturedDiv>
        </motion.div>
    );
};

export default GameProjectPage;
