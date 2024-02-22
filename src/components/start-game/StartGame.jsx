import React, { useContext, useState } from 'react';
import './StartGame.css';
import NamePopUp from './NamePopUp';
import GlobalContext from '../GlobalContext';

export default function StartGame() {

    const [isPopUp, setIsPopUp] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const { GameBGM } = useContext(GlobalContext);
    
    return (
        <>  
            {isPopUp ? <NamePopUp GameBGM={GameBGM} cancel={() => setIsPopUp(false)}/> : <></>}
            <div className="full-body">
                <div className="game-screen ludo-start">
                    <i onClick={
                        () => {
                            if(isPlay){
                                GameBGM.pause();
                                setIsPlay(false);
                            } else{
                                GameBGM.play();
                                GameBGM.loop = true;
                                setIsPlay(true);
                            }
                        }
                    } className={isPlay ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark"}></i>
                    <div className="banner"></div>
                    <div className="start-btn" onClick={() => setIsPopUp(true)} >Start Game</div>
                </div>
            </div>
        </>
    )
}
