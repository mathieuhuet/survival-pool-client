import axios from 'axios';
import { USER_API } from '../../sercret'
const API = USER_API
? USER_API
: 'http://192.168.1.5:10101/user';

export const getUserInfo = (accessToken) => {
  return new Promise((resolve, reject) => {
    console.log(API);
    axios.get(
      `${API}/getUserInfo`, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
      }
    ).then((response) => {
      const { data } = response;
      resolve(data);
    }).catch(err => {
      try {
        if (err.response.data.error) {
          reject(err.response.data);
        }
      } catch (error) {
        reject(error);
      }
    })
  })
};