import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import ForumIcon from '@mui/icons-material/Forum';


function Social(props) {
    return (
        <div>
            <div className="home__social">
                <a href="mailto:saadhzubairi@outlook.com" className="home__social-icon" target="_blank">
                    <i class='bx bxs-envelope' style={{color:"#777"}}></i>
                </a>
                <a href="https://www.linkedin.com/in/saadhzubairi/" className="home__social-icon" target="_blank">
                    <i class='bx bxl-linkedin' style={{color:"#777"}}></i>
                </a>
                <a href="https://github.com/saadhzubairi/" className="home__social-icon" target="_blank">
                    <i class='bx bxl-github' style={{color:"#777"}}></i>
                </a>
                <a href="https://discord.com/users/saadhzubairi#1469" className="home__social-icon" target="_blank">
                    <i class='bx bxl-discord-alt'style={{color:"#777"}}></i>
                </a>

            </div>
        </div>)
}
export default Social