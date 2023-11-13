import './user.css'
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';


const initialState = {
  firstName: '',
  lastName: '',
};

/*
User Page.

It only display the name of the user.

Also the page where you would logout.
*/


const User = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  //Profile section
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(JSON.parse(localStorage.getItem('user')));
  }, [cookies.userToken])

  const disconnect = () => {
    setCookie('accessToken', '');
  }

  return (
    <div className='App'>
      <div className='UserPage'>
        <div>
          <h1>
            {state.firstName}
          </h1>
          <h1>
            {state.lastName}
          </h1>
        </div>
        <button
          className='DisconnectButton'
          onClick={disconnect}
        >
          Se Déconnecter
        </button>
      </div>
    </div>
  );
};

export default User;
