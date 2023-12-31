import axios from 'axios';
import { USER_API } from '../../secret';
const API = USER_API
? USER_API
: 'http://192.168.1.5:10101/user';

export const changeIcon = (data, accessToken) => {
  return new Promise((resolve, reject) => {
    axios.put(
      `${API}/changeIcon`, 
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
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
          reject(err);
        }
      })
    })
};