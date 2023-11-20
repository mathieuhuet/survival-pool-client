import './scoreBoard.css';
import React, { useMemo, useState, useEffect } from 'react';
import getScores from '../../Utilities/getScores'

function ScoreBoard() {
  const [scores, setScores] = useState({});
  useEffect(() => {
    async function get() {
      let response = await getScores();
      setScores(response);
    }
    get()
  }, []);
  
  return (
    <div className='scoreBoard-main'>
      {scores.events ?
        scores.events.map(score => 
          <div key={score.id} className='scoreBoard-singleEvent'>
            <div className='scoreBoard-individualScore'>
              <div className='scoreBoard-matchScore'>
                <div className='scoreBoard-teamName'>
                  <img
                    src={score.competitions[0].competitors[1].team.logo}
                    width='32'
                    height='32'
                    alt='logo'
                  />
                  {score.competitions[0].competitors[1].team.abbreviation}
                </div>
                <div className='scoreBoard-score'>
                  {score.competitions[0].competitors[1].score}
                </div>
              </div>
            </div>
            <div className='scoreBoard-at'>
              @
            </div>
            <div className='scoreBoard-individualScore'>
              <div className='scoreBoard-matchScore'>
                <div className='scoreBoard-teamName'>
                  <img
                    src={score.competitions[0].competitors[0].team.logo}
                    width='32'
                    height='32'
                    alt='logo'
                  />
                  {score.competitions[0].competitors[0].team.abbreviation}
                </div>
                <div className='scoreBoard-score'>
                  {score.competitions[0].competitors[0].score}
                </div>
              </div>
            </div>
            <div className='scoreBoard-time'>
              {score.competitions[0].status.type.shortDetail}
            </div>
          </div>
        ) :
        <h2>Aucun score à afficher</h2>
      }
    </div>
  )
}

export default ScoreBoard;