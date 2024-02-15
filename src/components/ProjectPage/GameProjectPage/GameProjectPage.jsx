import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import './gameProjectPage.css'

export const GameProjectPage = () => {

  const { projectId } = useParams()
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const module = await import(`../../../assets/portfolio/${projectId}.json`);
        setJsonData(module.default);
        setLoading(false)
      } catch (error) {
        console.error('Error importing JSON:', error);
      }
    };
    fetchData();
  }, [jsonData, projectId])

  console.log(jsonData)


  return (
    loading ? <div className="portfolio_circular_progress">
      <div className="portfolio_wrapper">
        <div className="portfolio_container">
          <CircularProgress style={{ height: "5rem", width: "5rem", color: "#333" }} />
        </div>
      </div>
    </div>
      :

      <>
        <div className="gamePageContainer section">

          <div className="gamePageSec">
            <div className="gamePageImageCont">

              <img src={jsonData.image} alt="" className="gamePage_titleImage" />
            </div>
            <div className="gameIntroSec gameSec">
              <div className="gameIntroSec_bar"></div>
              <div className="gameIntroSec_text">
                <div className="gameIntroSec_heading">{jsonData.name}</div>
                <div className="gameIntroSec_subtext" dangerouslySetInnerHTML={{ __html: jsonData.introText }} />
              </div>
            </div>

            <div className="gameTechSec gameSec">
              <div className="gameTechSec_img">
                <img src={jsonData.techImg} alt="" className="gameTechSec_imgImage" />
              </div>
              <div className="gameTechSec_text">
                <div className="gameTechSec_bar"></div>
                <div className="gameTechSec_heading game_heading">{jsonData.techHead}</div>
                <div className="gameTechSec_subtext game_subtext">{jsonData.techText}</div>
              </div>
            </div>

            <div className="gameStructSec gameSec">
              <div className="gameStructSec_head GSH">
                <div className="gameStructSec_heading game_heading">Project Structure</div>
                <div className="gameStructSec_bar GBAR"></div>
              </div>
              <div className="gameStructSec_body">
                <div className="gameStructSec_desc" dangerouslySetInnerHTML={{ __html: jsonData.structureText }} />
                {
                  jsonData.structureImg ?
                    <div className="gameStructSec_img">
                      <img src={jsonData.structureImg} alt="" className="gameStructSec_imgImage" />
                    </div> : null
                }
              </div>
            </div>

            <div className="gameAssetsSec gameSec">
              <div className="gameAssetsSec_head GSH">
                <div className="gameAssetsSec_heading game_heading">Game Assets</div>
                <div className="gameAssetsSec_bar GBAR" ></div>
              </div>
              <div className="gameAssetsSec_desc">{jsonData.assetText}</div>
              <div className="gameAssetsSec_assetGallery">
                {jsonData.assets.map((asset, index) => (
                  <img key={index} src={asset} alt="" className="gameAssetImg" />
                ))}
              </div>
            </div>

            <div className="gameScreenshotsSec gameSec">
              <div className="gameScreenshotsSec_head GSH">
                <div className="gameScreenshotsSec_heading game_heading">Screenshots</div>
                <div className="gameScreenshotsSec_bar GBAR">
                </div>
              </div>
              <div className="gameScreenshotsSec_Screenshots">
                {jsonData.screenshots.map((asset, index) => (
                  <img key={index} src={asset} alt="" className="gameSSImg" />
                ))}
              </div>
            </div>

            <div className="gameYoutubeSec gameSec">
              <div className="gameYoutubeSec_head GSH">
                <div className="gameYoutubeSec_heading game_heading">Video Demo</div>
                <div className="gameYoutubeSec_bar GBAR"></div>
              </div>
              <div className="gameYoutubeSec_video">
                <iframe width="100%" height="540px" src={jsonData.youtubeLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
            </div>

            <div className="gameLessonsLearnedSec gameSec">
              <div className="gameLessonsLearnedSec_head GSH">
                <div className="gameLessonsLearnedSec_heading game_heading">Lessons Learned</div>
                <div className="gameLessonsLearnedSec_bar GBAR"></div>
              </div>
              <div className="gameLessonsLearnedSec_desc" dangerouslySetInnerHTML={{ __html: jsonData.lessonsLearned }} />
            </div>

            <div className="gameLinks gameSec GSH">
              <div className="gameLinks_head">
                <div className="gameLinks_heading game_heading">Source Code Links</div>
                <div className="gameLinks_bar GBAR"></div>
              </div>
              <div className="gameLinks_desc">
                <a href={jsonData.links} className="gameLinks_link">Github Link</a>
              </div>
            </div>

          </div>
        </div >
      </>
  )
}
