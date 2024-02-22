import React, { useContext } from 'react';
import './LudoBoard.css';
import GlobalContext from '../GlobalContext';
import Dice from './Dice';

export default function LudoBoard({ tokenClick, gifSrc }) {

    const { allPlayerData, winnerPosition } = useContext(GlobalContext);

    return (
        <div className='full-body'>
            <div className="game-screen">
                <i onClick={() => window.location.reload() } className="fa-solid fa-rotate-right"></i>
                <div className="ludo-board">

                    <img className="winners winner1" src={allPlayerData[0].winner ? `${winnerPosition} Winner.svg` : ""} alt="" />
                    <img className="winners winner2" src={allPlayerData[1].winner ? `${winnerPosition} Winner.svg` : ""} alt="" />
                    <img className="winners winner3" src={allPlayerData[2].winner ? `${winnerPosition} Winner.svg` : ""} alt="" />
                    <img className="winners winner4" src={allPlayerData[3].winner ? `${winnerPosition} Winner.svg` : ""} alt="" />

                    <img className="congrats" src={gifSrc} alt="" />
                    {/* ***** Red ***** */}
                    <div className="tokens tokens-red" style={allPlayerData[0][1].tokenStyle} onClick={() => tokenClick(0, 1)}></div>
                    <div className="tokens tokens-red" style={allPlayerData[0][2].tokenStyle} onClick={() => tokenClick(0, 2)}></div>
                    <div className="tokens tokens-red" style={allPlayerData[0][3].tokenStyle} onClick={() => tokenClick(0, 3)}></div>
                    <div className="tokens tokens-red" style={allPlayerData[0][4].tokenStyle} onClick={() => tokenClick(0, 4)}></div>

                    {/* ***** Blue ***** */}
                    <div className="tokens tokens-blue" style={allPlayerData[1][1].tokenStyle} onClick={() => tokenClick(1, 1)}></div>
                    <div className="tokens tokens-blue" style={allPlayerData[1][2].tokenStyle} onClick={() => tokenClick(1, 2)}></div>
                    <div className="tokens tokens-blue" style={allPlayerData[1][3].tokenStyle} onClick={() => tokenClick(1, 3)}></div>
                    <div className="tokens tokens-blue" style={allPlayerData[1][4].tokenStyle} onClick={() => tokenClick(1, 4)}></div>

                    {/* ***** Yellow ***** */}
                    <div className="tokens tokens-yellow" style={allPlayerData[2][1].tokenStyle} onClick={() => tokenClick(2, 1)}></div>
                    <div className="tokens tokens-yellow" style={allPlayerData[2][2].tokenStyle} onClick={() => tokenClick(2, 2)}></div>
                    <div className="tokens tokens-yellow" style={allPlayerData[2][3].tokenStyle} onClick={() => tokenClick(2, 3)}></div>
                    <div className="tokens tokens-yellow" style={allPlayerData[2][4].tokenStyle} onClick={() => tokenClick(2, 4)}></div>

                    {/* ***** Green ***** */}
                    <div className="tokens tokens-green" style={allPlayerData[3][1].tokenStyle} onClick={() => tokenClick(3, 1)}></div>
                    <div className="tokens tokens-green" style={allPlayerData[3][2].tokenStyle} onClick={() => tokenClick(3, 2)}></div>
                    <div className="tokens tokens-green" style={allPlayerData[3][3].tokenStyle} onClick={() => tokenClick(3, 3)}></div>
                    <div className="tokens tokens-green" style={allPlayerData[3][4].tokenStyle} onClick={() => tokenClick(3, 4)}></div>

                </div>
                <Dice />
            </div>
        </div>
    )
}
