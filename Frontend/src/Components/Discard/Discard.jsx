import React, { useState } from 'react';
import './Discard.css';
import { useNavigate } from 'react-router';

const Discard = ({ crossState, setCrossState, file, back, setnext }) => {

    const [isCancled, setIsCancled] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={isCancled ? 'd-none' : 'discard-container'}>
            <div className="discard-message">
                <h4>Discard Photo ?</h4>
                <span>If you discard this file your edits won't be saved.</span>
            </div>
            <button className='discard-button d-btn'
                onClick={() => {
                    file(null);
                    if (crossState === true) {
                        navigate('/inscrible');
                    }
                    setCrossState(false);
                    back(false);
                    setnext(false);
                }}
            >
                Discard
            </button>
            <button className='cancle-discard d-btn'
                onClick={() => {
                    setIsCancled(true);
                    setCrossState(false);
                    back(false);
                    setnext(false);
                }}
            >
                Cancle
            </button>
        </div>
    );
};

export default Discard;
