import axios from 'axios';

export const api = () => {
  return axios.create({
    baseURL: `${process.env.API}/api`,
  });
};
