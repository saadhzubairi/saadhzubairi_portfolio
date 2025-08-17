import { Mail, Linkedin, Github, MessageCircle, PawPrint, File } from 'lucide-react';
import CustomDiv from '../CustomDiv';
import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section id="Home" className="h-screen w-full flex overflow-hidden items-center justify-center">
      {/* Content areas */}
      <div className="flex flex-col w-full mx-auto">
        <CustomDiv>
          <div className="h-20 items-end flex justify-start">
            <p className="text-xs h-full w-[100%] flex items-end justify-start text-gray-400 dark:text-gray-500 font-mono text-left select-none">
              text-8xl text-white tracking-tighter text-balance
            </p>
          </div>
        </CustomDiv>
        <CustomDiv>
          <div className="flex items-center justify-start ">
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white tracking-tighter text-balance text-left">
              Saad H. Zubairi
            </h1>
          </div>
        </CustomDiv>
        <CustomDiv>
          <div className="flex items-center justify-start ">
            <h3 className="text-6xl md:text-2xl font-normal text-gray-900 dark:text-white tracking-tighter text-balance text-left">
              Software Engineer
            </h3>
          </div>
        </CustomDiv>
        <CustomDiv>
          <div className="h-20 items-end flex justify-start">
            <p className="text-xs text-gray-400 dark:text-gray-500 font-mono text-left select-none">
              text-lg text-white font-medium
            </p>
          </div>
        </CustomDiv>
        <CustomDiv>
          <div className=" flex items-start justify-start ">
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium text-left">
              Full-stack engineer with proven track record in architecting and optimizing scalable, high-performance web applications delivering impactful features from concept to deployment across distributed teams.
            </p>
          </div>
        </CustomDiv>
        <CustomDiv>
          <div className="h-16"></div>
        </CustomDiv>
        <CustomDiv>
          <div className=" flex items-center justify-center md:justify-start ">
            <div className="flex flex-row gap-4">
              <a
                href="mailto:saadhzubairi@outlook.com"
                className="p-3 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer rounded-sm border hover:bg-gray-100 dark:hover:bg-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/saadhzubairi/"
                className="p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors cursor-pointer rounded-sm border hover:bg-gray-100 dark:hover:bg-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/saadhzubairi/"
                className="p-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer rounded-sm border hover:bg-gray-100 dark:hover:bg-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://discord.com/users/saadhzubairi#1469"
                className="p-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors cursor-pointer rounded-sm border hover:bg-gray-100 dark:hover:bg-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>
        </CustomDiv>
        <CustomDiv>
          <div className="h-16"></div>
        </CustomDiv>
        <CustomDiv>
          <div className="flex items-center justify-center md:justify-start gap-2 w-full">
            <Link to="/portfolio">
              <Button className="w-36 h-12 bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white cursor-pointer">
                <span className="flex items-center gap-2">
                  <PawPrint />  Portfolio
                </span>
              </Button>
            </Link>
            <Button variant={"secondary"} className="w-36 h-12 dark:bg-gray-800 border cursor-pointer">
              <span className="flex items-center gap-2">
                <File />  Resume
              </span>
            </Button>
          </div>
        </CustomDiv>
      </div>

    </section>
  );
};

export default Home;