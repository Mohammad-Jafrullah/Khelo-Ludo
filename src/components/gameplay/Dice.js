import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../GlobalContext';

export default function Dice() {

    const { allPlayerData, setAllPlayerData, globalChance, setGlobalChance, playerChance, setPlayerChance } = useContext(GlobalContext);
    const zooming = "zooming 0.5s linear infinite alternate";
    const [diceSrc, setDiceSrc] = useState("Dice-1.svg");

    const getDiceNumber = () => {
        let allTokenLocked = 0;
        const curPlayer = allPlayerData[playerChance];

        if (!globalChance) {
            // alert("you can't move dice now.");
            return;
        }
        setGlobalChance(false);
        const diceSound = new Audio("roll-dice.mp3");
        diceSound.play();
        setDiceSrc("rolle dice.gif");
        setTimeout(() => {
            const diceNumber = Math.ceil(Math.random() * 6);
            setDiceSrc(`Dice-${diceNumber}.svg`)
            if (diceNumber === 6) {
                for (let i = 1; i <= 4; i++) {
                    if (curPlayer[i].home || (curPlayer[i].positionInNum + diceNumber) > curPlayer.homePosition) {
                        allTokenLocked++;
                        continue;
                    }
                    setAllPlayerData(prevData => {
                        const newData = [...prevData];
                        newData[playerChance][i].tokenStyle = {
                            ...newData[playerChance][i].tokenStyle,
                            animation: zooming,
                            zIndex: "10"
                        }
                        return newData;
                    })
                }
            } else {
                for (let i = 1; i <= 4; i++) {
                    if (curPlayer[i].home || curPlayer[i].locked || (curPlayer[i].positionInNum + diceNumber) > curPlayer.homePosition) {
                        allTokenLocked++;
                        continue;
                    }
                    setAllPlayerData(prevData => {
                        const newData = [...prevData];
                        newData[playerChance][i].tokenStyle = {
                            ...newData[playerChance][i].tokenStyle,
                            animation: zooming,
                            zIndex: "10"
                        }
                        return newData;
                    })
                }
            }
            if (allTokenLocked === 4) {
                const updateChance = (playerChance + 1) % 4;
                setPlayerChance(updateChance);
                setGlobalChance(true);
            }
            setAllPlayerData(prevData => {
                const newData = [...prevData];
                newData[playerChance] = {
                    ...newData[playerChance],
                    diceNumber
                }
                return newData;
            });
        }, 1000);
    }

    useEffect(() => {
        if (allPlayerData[playerChance].winner) {
            const updateChance = (playerChance + 1) % 4;
            setPlayerChance(updateChance);
        }
    }, [playerChance, allPlayerData, setPlayerChance]);

    return (
        <div className="dice-body">
            <div className="token" style={{ backgroundImage: allPlayerData[playerChance][1].tokenStyle.backgroundImage }}></div>
            <h2>{allPlayerData[playerChance].name}</h2>
            <div onClick={getDiceNumber} className="dice" style={{ backgroundImage: `url("${diceSrc}")` }}></div>
        </div>
    )
}