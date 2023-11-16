import './main.css';
import React, { useMemo, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';




function Main() {
  const [cookies] = useCookies(['accessToken']);
  let navigate = useNavigate();

  return(
    <div className='main-page'>
      
    </div>
  )
}

export default Main;