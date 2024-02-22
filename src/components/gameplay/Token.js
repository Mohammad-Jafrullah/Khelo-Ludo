import React, { useContext, useState } from 'react'
import LudoBoard from './LudoBoard';
import GlobalContext from '../GlobalContext';
import { allPositions, stopPosition } from './Position';

export default function Token() {

    const { allPlayerData, setAllPlayerData, playerChance, setPlayerChance, setGlobalChance, winnerPosition, setWinnerPosition } = useContext(GlobalContext);
    const [gifSrc, setGifSrc] = useState("");

    // *** HOME TOKEN ***

    const homeToken = (SNum, curPlayer) => {
        try {
            let isWinner = 0;
            const homeSound = new Audio("home-token.mp3");
            homeSound.play();
            setAllPlayerData(prevData => {
                const newData = [...prevData];

                newData[playerChance][SNum] = {
                    ...newData[playerChance][SNum],
                    home: true
                }
                return newData;
            })
            setGifSrc("Congrats Home.gif");
            setTimeout(() => {
                setGifSrc("")
            }, 2000);
            console.log(curPlayer[1].home, curPlayer[2].home, curPlayer[3].home, curPlayer[4].home,);
            for (let i = 1; i <= 4; i++) {
                if (curPlayer[i].home) {
                    isWinner++;
                }
                console.log(i, isWinner, curPlayer[i].home)
            }
            if (isWinner === 3) {
                const winnerSound = new Audio("win-player.mp3");
                winnerSound.play();
                setAllPlayerData(prevData => {
                    const newData = [...prevData];
                    newData[playerChance] = {
                        ...newData[playerChance],
                        winner: true
                    }
                    return newData;
                });
                const winner = winnerPosition + 1;
                setWinnerPosition(winner);
                if (winner === 3) {
                    // *** GAME OVER ***
                    alert("Game Over");
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // *** CHANGE ONLY TOP LEFT STYLE ***

    const changeStyle = (SNum, Position, diceNumber, positionInNum) => {
        try {
            const moveTokenStepByStep = (steps) => {
                // If steps greater than diceNumber then return
                if (steps > diceNumber) return;

                setAllPlayerData(prevData => {
                    const step = new Audio("step sound.mp3")
                    step.play();
                    const newData = [...prevData];
                    // Update token style for the current step
                    newData[playerChance][SNum].tokenStyle = {
                        ...newData[playerChance][SNum].tokenStyle,
                        top: Position[positionInNum + steps].top,
                        left: Position[positionInNum + steps].left
                    };
                    return newData;
                });
                setTimeout(() => {
                    moveTokenStepByStep(steps + 1);
                }, 500);
            };
            moveTokenStepByStep(1);
        } catch (error) {
            console.log(error);
        }
    }

    // *** CHECK KILL ***

    const checkKill = ({ top, left }) => {
        try {
            for (let i = 0; i < stopPosition.length; i++) {
                if (allPositions[stopPosition[i]].top === top && allPositions[stopPosition[i]].left === left)
                    return false;
            }
            for (let i = (playerChance + 1) % 4; i !== playerChance; i = (i + 1) % 4) {
                for (let j = 1; j <= 4; j++) {
                    if (top === allPlayerData[i][j].tokenStyle.top && left === allPlayerData[i][j].tokenStyle.left)
                        return [i, j];
                }
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    // *** KILL CONFIRM ***

    const killConfirm = (isKill, diceNumber) => {
        try {
            const moveTokenStepByStep = (steps) => {
                // If steps greater than diceNumber then return
                if (steps === 0) {
                    setAllPlayerData(prevData => {
                        const newData = [...prevData];
                        newData[isKill[0]][isKill[1]].tokenStyle = {
                            ...newData[isKill[0]][isKill[1]].tokenStyle,
                            top: newData[isKill[0]][isKill[1]].lockedPosition.top,
                            left: newData[isKill[0]][isKill[1]].lockedPosition.left,
                        }
                        newData[isKill[0]][isKill[1]] = {
                            ...newData[isKill[0]][isKill[1]],
                            locked: true
                        }
                        return newData;
                    });
                    return;
                };

                setAllPlayerData(prevData => {
                    const newData = [...prevData];
                    // Update token style for the current step
                    newData[isKill[0]][isKill[1]].tokenStyle = {
                        ...newData[isKill[0]][isKill[1]].tokenStyle,
                        top: newData[isKill[0]].Position[steps].top,
                        left: newData[isKill[0]].Position[steps].left
                    };
                    return newData;
                });
                console.log(steps)
                setTimeout(() => {
                    moveTokenStepByStep(steps - 1);
                }, steps * 10);
            };
            setTimeout(() => {
                const killed = new Audio("kill-token.mp3");
                killed.play();
                moveTokenStepByStep(allPlayerData[isKill[0]][isKill[1]].positionInNum);
            }, diceNumber * 500);
        } catch (error) {
            console.log(error);
        }
    }

    // *** ONCLICK TOKEN ***

    const TokenClick = (PNum, SNum) => {
        try {
            // *** CHECK ELIGIBLE ***

            if (allPlayerData[PNum][SNum].tokenStyle.animation === "") {
                // alert("You can't move this.");
                return;
            }

            const { diceNumber, startingPosition, homePosition, Position } = allPlayerData[playerChance];
            const { positionInNum, locked } = allPlayerData[playerChance][SNum];
            let newPosition = positionInNum + diceNumber;
            const updateChance = (playerChance + 1) % 4;
            const isKill = checkKill(Position[newPosition]);

            if (diceNumber === 6 && locked) {
                const openToken = new Audio("open-token.mp3");
                openToken.play();
                newPosition = startingPosition;
                setAllPlayerData(prevData => {
                    const newData = [...prevData];

                    newData[playerChance][SNum] = {
                        ...newData[playerChance][SNum],
                        locked: false
                    }

                    newData[playerChance][SNum].tokenStyle = {
                        ...newData[playerChance][SNum].tokenStyle,
                        top: Position[newPosition].top,
                        left: Position[newPosition].left,
                    }
                    return newData;
                })
                // setGlobalChance(true);
            }
            else if (newPosition === homePosition) {
                changeStyle(SNum, Position, diceNumber, positionInNum);
                setTimeout(() => {
                    homeToken(SNum, allPlayerData[playerChance]);
                }, diceNumber * 500);
            }
            else if (isKill) {
                changeStyle(SNum, Position, diceNumber, positionInNum);
                killConfirm(isKill, diceNumber);
            } else {
                changeStyle(SNum, Position, diceNumber, positionInNum);
                if (diceNumber !== 6) {
                    setTimeout(() => {
                        setPlayerChance(updateChance);
                    }, diceNumber * 500);
                }
            }
            setTimeout(() => {
                setGlobalChance(true);
            }, diceNumber * 500);
            setAllPlayerData(prevData => {
                const newData = [...prevData];

                newData[playerChance][SNum] = {
                    ...newData[playerChance][SNum],
                    positionInNum: newPosition
                }
                return newData;
            })
            for (let i = 1; i <= 4; i++) {
                setAllPlayerData(prevData => {
                    const newData = [...prevData];

                    newData[playerChance][i].tokenStyle = {
                        ...newData[playerChance][i].tokenStyle,
                        animation: "",
                        zIndex: "1"
                    }
                    return newData;
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <LudoBoard tokenClick={(PNum, SNum) => TokenClick(PNum, SNum)} gifSrc={gifSrc} />
    )
}
