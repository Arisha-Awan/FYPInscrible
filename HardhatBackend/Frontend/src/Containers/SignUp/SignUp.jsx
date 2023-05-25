import React, { useContext, useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router';
import { InscribleContext } from '../../Context/Context';
import {toast} from 'react-toastify';

const SignUp = () => {

  const navigate = useNavigate();
  const {connectedAccount, CheckIfUserIsRegistered, RegisterUser} = useContext(InscribleContext);

  const notify = (msg)=> toast.error(msg);

  const [input, setInput] = useState({
    username : ""
  });

  const handleUsername = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setInput({...input, [name] : value});
  };

  return (
    <div className='signup-container'>

        <div className="signup-container-header">
            <h1>Inscrible</h1>
        </div>

        <div className="signup-container-body">
            <label htmlFor="username" className='signup-lable'>Username :</label>
            <input type="text" placeholder='Enter Username' className='signup-input' name='username' id='username' onChange={handleUsername} value={input.username}/>

            <label htmlFor="address" className='signup-lable'>Address :</label>
            <input type="text" placeholder='Metamask Account Address' className='signup-input' id='address' disabled={true} value={connectedAccount}/>  

            <button className='signup-button'
              onClick={ async ()=>{
                if (input.username === "") {
                  notify("Please Enter Username !");
                }
                else{
                  const isRegistered = await CheckIfUserIsRegistered(connectedAccount);
                  if (isRegistered) {
                    notify("User Already Exists. Go to SignIn !");
                  }
                  else{
                    await RegisterUser(input.username);
                    navigate('/');
                  }
                }
              }}
            >
              Create
            </button>
        </div>
        <div className='link-signin'>
          Already have an Account? 
          <span
            onClick={()=>{
              navigate('/');
            }}
          >
            SignIn
          </span>
        </div>
    </div>
  );
};

export default SignUp;
