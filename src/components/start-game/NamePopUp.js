import React, { useContext } from 'react';
import './NamePopUp.css';
import GlobalContext from '../GlobalContext';

export default function NamePopUp({ cancel, GameBGM }) {
    const { names, setNames, setAllPlayerData, setIsGamePlaying } = useContext(GlobalContext);

    const submitData = (e) => {
        e.preventDefault();
        setAllPlayerData(prevData => {
            const newData = [...prevData];
            for (let i = 0; i < 4; i++) {
                newData[i] = {
                    ...newData[i],
                    name: names[i + 1]
                }
            }
            return newData;
        });

        GameBGM.pause();
        setIsGamePlaying(true);
    }

    const changeValue = (e) => {
        setNames({ ...names, [e.target.name]: e.target.value })
    }

    return (
        <div className="popup-body">
            <div className="names-popup">
                <i className="fa-solid fa-xmark cut-btn" onClick={cancel}></i>
                <p><b>Note: </b> <br />This is only for 4 Players, Enter Name and Play Game.</p>
                <form action="" onSubmit={submitData}>
                    <div className="input-box">
                        <div className="token" style={{ backgroundImage: "url('Red Token.svg')" }}></div>
                        <input type="text" name="1" value={names[1]} onChange={changeValue} />
                    </div>
                    <div className="input-box">
                        <div className="token" style={{ backgroundImage: "url('Blue Token.svg')" }}></div>
                        <input type="text" name="2" value={names[2]} onChange={changeValue} />
                    </div>
                    <div className="input-box">
                        <div className="token" style={{ backgroundImage: "url('Yellow Token.svg')" }}></div>
                        <input type="text" name="3" value={names[3]} onChange={changeValue} />
                    </div>
                    <div className="input-box">
                        <div className="token" style={{ backgroundImage: "url('Green Token.svg')" }}></div>
                        <input type="text" name="4" value={names[4]} onChange={changeValue} />
                    </div>
                    <button type='submit' className="start-btn submit-btn">Play</button>
                </form>
            </div>
        </div>
    )
}
