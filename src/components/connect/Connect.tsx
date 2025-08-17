import React from 'react';
import { Mail, Linkedin, Github, MessageCircle, Calendar, Video } from 'lucide-react';
import CustomDiv from '../CustomDiv';

const Connect = () => {
  return (
    <section id="Contact" className="section">
        <CustomDiv>
            <div className="h-10"></div>
        </CustomDiv>
        <CustomDiv>
            <h2 className="text-4xl font-bold text-center">Get in Touch</h2>
        </CustomDiv>
        <CustomDiv>
            <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto">
                I'm currently looking for new opportunities, and my inbox is always open.
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
        </CustomDiv>
        
        <CustomDiv>
            <div className="h-10"></div>
        </CustomDiv>

        <CustomDiv>
            <div className="flex justify-center gap-4">
                <a
                    href="mailto:saadhzubairi@outlook.com"
                    className="p-3 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Mail className="w-8 h-8" />
                </a>
                <a
                    href="https://www.linkedin.com/in/saadhzubairi/"
                    className="p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors cursor-pointer rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Linkedin className="w-8 h-8" />
                </a>
                <a
                    href="https://github.com/saadhzubairi/"
                    className="p-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Github className="w-8 h-8" />
                </a>
                <a
                    href="https://discord.com/users/saadhzubairi#1469"
                    className="p-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors cursor-pointer rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <MessageCircle className="w-8 h-8" />
                </a>
                <a
                    href="https://calendly.com/saadhzubairi/30min?month=2025-08"
                    className="p-3 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Calendar className="w-8 h-8" />
                </a>
                <a
                    href="https://nyu.zoom.us/my/saadhzubairi"
                    className="p-3 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Video className="w-8 h-8" />
                </a>
            </div>
        </CustomDiv>

        <CustomDiv>
            <div className="h-20"></div>
        </CustomDiv>

        <CustomDiv>
            <p className="text-center text-sm text-gray-400 dark:text-gray-500">
                Designed & Built by Saad Zubairi
            </p>
        </CustomDiv>
    </section>
  );
};

export default Connect;
