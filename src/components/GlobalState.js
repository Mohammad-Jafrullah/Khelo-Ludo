import React, { useState } from 'react';
import GlobalContext from './GlobalContext';
import { redPosition, bluePosition, yellowPosition, greenPosition } from './gameplay/Position';

const GlobalState = (props) => {

    const [names, setNames] = useState({ 1: "Player1", 2: "Player2", 3: "Player3", 4: "Player4" })
    const [allPlayerData, setAllPlayerData] = useState([
        {
            name: names[1],
            color: "Red",
            winner: false,
            diceNumber: null,
            startingPosition: 1,
            turningPosition: 52,
            homePosition: 57,
            1: {
                tokenStyle: { top: "10.5%", left: "11.5%", animation: "", zIndex: "1", backgroundImage: "url('Red Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "10.5%", left: "11.5%" },
                locked: true,
                home: false
            },
            2: {
                tokenStyle: { top: "10.5%", left: "23%", animation: "", zIndex: "1", backgroundImage: "url('Red Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "10.5%", left: "23%" },
                locked: true,
                home: false
            },
            3: {
                tokenStyle: { top: "21%", left: "11.5%", animation: "", zIndex: "1", backgroundImage: "url('Red Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "21%", left: "11.5%" },
                locked: true,
                home: false
            },
            4: {
                tokenStyle: { top: "21%", left: "23%", animation: "", zIndex: "1", backgroundImage: "url('Red Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "21%", left: "23%" },
                locked: true,
                home: false
            },
            Position: redPosition
        },
        {
            name: names[2],
            color: "Blue",
            winner: false,
            diceNumber: null,
            startingPosition: 1,
            turningPosition: 39,
            homePosition: 57,
            1: {
                tokenStyle: { top: "68%", left: "11.5%", animation: "", zIndex: "1", backgroundImage: "url('Blue Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "68%", left: "11.5%" },
                locked: true,
                home: false
            },
            2: {
                tokenStyle: { top: "68%", left: "23%", animation: "", zIndex: "1", backgroundImage: "url('Blue Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "68%", left: "23%" },
                locked: true,
                home: false
            },
            3: {
                tokenStyle: { top: "79%", left: "11.5%", animation: "", zIndex: "1", backgroundImage: "url('Blue Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "79%", left: "11.5%" },
                locked: true,
                home: false
            },
            4: {
                tokenStyle: { top: "79%", left: "23%", animation: "", zIndex: "1", backgroundImage: "url('Blue Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "79%", left: "23%", },
                locked: true,
                home: false
            },
            Position: bluePosition
        },
        {
            name: names[3],
            color: "Yellow",
            winner: false,
            diceNumber: null,
            startingPosition: 1,
            turningPosition: 26,
            homePosition: 57,
            1: {
                tokenStyle: { top: "68%", left: "70%", animation: "", zIndex: "1", backgroundImage: "url('Yellow Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "68%", left: "70%" },
                locked: true,
                home: false
            },
            2: {
                tokenStyle: { top: "68%", left: "81.5%", animation: "", zIndex: "1", backgroundImage: "url('Yellow Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "68%", left: "81.5%" },
                locked: true,
                home: false
            },
            3: {
                tokenStyle: { top: "79%", left: "70%", animation: "", zIndex: "1", backgroundImage: "url('Yellow Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "79%", left: "70%" },
                locked: true,
                home: false
            },
            4: {
                tokenStyle: { top: "79%", left: "81.5%", animation: "", zIndex: "1", backgroundImage: "url('Yellow Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "79%", left: "81.5%" },
                locked: true,
                home: false
            },
            Position: yellowPosition
        },
        {
            name: names[4],
            color: "Green",
            winner: false,
            diceNumber: null,
            startingPosition: 1,
            turningPosition: 13,
            homePosition: 57,
            1: {
                tokenStyle: { top: "10.5%", left: "70%", animation: "", zIndex: "1", backgroundImage: "url('Green Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "68%", left: "70%" },
                locked: true,
                home: false
            },
            2: {
                tokenStyle: { top: "10.5%", left: "81.5%", animation: "", zIndex: "1", backgroundImage: "url('Green Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "10.5%", left: "81.5%" },
                locked: true,
                home: false
            },
            3: {
                tokenStyle: { top: "21%", left: "70%", animation: "", zIndex: "1", backgroundImage: "url('Green Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "21%", left: "70%" },
                locked: true,
                home: false
            },
            4: {
                tokenStyle: { top: "21%", left: "81.5%", animation: "", zIndex: "1", backgroundImage: "url('Green Token.svg')" },
                positionInNum: null,
                lockedPosition: { top: "21%", left: "81.5%" },
                locked: true,
                home: false
            },
            Position: greenPosition
        }]
    );

    const [globalChance, setGlobalChance] = useState(true);
    const [playerChance, setPlayerChance] = useState(0);
    const [winnerPosition, setWinnerPosition] = useState(0);
    const [isGamePLaying, setIsGamePlaying] = useState(false);
    const GameBGM = new Audio("Game-BGM.mp3");

    return (
        <GlobalContext.Provider value={{
            allPlayerData, setAllPlayerData, globalChance, setGlobalChance, GameBGM, playerChance, setPlayerChance, winnerPosition, setWinnerPosition, names, setNames, isGamePLaying, setIsGamePlaying
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalState;
