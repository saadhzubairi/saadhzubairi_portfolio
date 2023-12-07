import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';


function Social(props) {
    return (
        <div>
            <Box >
                <div className="home__social">
                    {/* <Tooltip title="Email" placement="right"> */}
                    <a href="mailto:saadhzubairi@outlook.com" className="home__social-icon" target="_blank">
                        <i id="email_Ico" class='social_media_icons bx bxs-envelope'></i>
                    </a>
                    {/* </Tooltip> */}
                    {/* <Tooltip title="LinkedIn" placement="right"> */}
                    <a href="https://www.linkedin.com/in/saadhzubairi/" className="home__social-icon" target="_blank">
                        <i id="linkedIn_Ico" class='social_media_icons bx bxl-linkedin'></i>
                    </a>
                    {/* </Tooltip> */}
                    {/* <Tooltip title="Github" placement="right"> */}
                    <a href="https://github.com/saadhzubairi/" className="home__social-icon" target="_blank">
                        <i id="github_Ico" class='social_media_icons bx bxl-github'></i>
                    </a>
                    {/* </Tooltip> */}
                    {/* <Tooltip title="Discord" placement="right"> */}
                    <a href="https://discord.com/users/saadhzubairi#1469" className="home__social-icon" target="_blank">
                        <i id="discord_Ico" class='social_media_icons bx bxl-discord-alt'></i>
                    </a>
                    {/* </Tooltip> */}
                </div>
            </Box>
        </div>)
}
export default Social