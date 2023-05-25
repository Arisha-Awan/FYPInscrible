import React, { useState, useContext, useEffect } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router';
import { InscribleContext } from '../../Context/Context';
import { toast } from 'react-toastify';

const SignIn = () => {

    const navigate = useNavigate();
    const { isMetamask, connectedAccount, CheckIfUserIsRegistered, ValidateUsername, signInState} = useContext(InscribleContext);

    //TOAST FUNCTIONS
    const notify = (msg)=> toast.error(msg);
    
    //USESTATES
    const [input, setInput] = useState({
        username: ""
    });
    const [giveAccess, setGiveAccess] = useState(true);

    //FUNCTIONS
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
    };


    useEffect(()=>{
        if (!isMetamask) {
            notify("Please Install MetaMask First!")
            setGiveAccess(false);
        }
        else{
            setGiveAccess(true);
        }
    },[isMetamask]);

    return (
        <div className='signin-container'>
            <div className="signin-container-header">
                <h1>Inscrible</h1>
            </div>

            <div className="signin-container-body">
                <label htmlFor="username" className='signin-lable'>Username :</label>
                <input type="text" placeholder='Enter Username' className='signin-input' name='username' id='username' onChange={handleInput} value={input.username} disabled={!giveAccess} />

                <label htmlFor="address" className='signin-lable'>Address :</label>
                <input type="text" placeholder='Metamask Account Address' className='signin-input' name='address' id='address' value={connectedAccount} disabled={true} />

                <button type='submit' className='signin-button' disabled={!giveAccess} 
                    onClick={ async ()=>{
                        if (input.username === "") {
                            notify("Please Enter Username!");
                            return;
                        }
                        else
                        {
                            const isRegistered = await CheckIfUserIsRegistered(connectedAccount);
                            if(isRegistered){
                                const validUsername = await ValidateUsername(input.username);
                                if (validUsername) {
                                    signInState(true);
                                    console.log("called.....")
                                    navigate('/inscrible');
                                }
                                else{
                                    notify("Please Enter Valid Username!");
                                }
                            }
                            else{
                                notify("Please Create Account First!");
                            }
                        }
                    }}
                >
                    Login
                </button>
            </div>
            <div className='link-signup'>
                Create an account?
                <span
                    onClick={() => {
                        navigate('/signup');
                    }}
                >
                    SignUp
                </span>
            </div>
        </div>
    );
};

export default SignIn;
