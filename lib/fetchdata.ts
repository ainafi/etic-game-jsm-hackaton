import axios from 'axios';

const url = process.env.NEXT_PUBLIC_TMDB_URL;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  }
};

export const fetchData = async (section: string, queryParameters = {}) => {
  const params = new URLSearchParams({
    language: 'en-US',
    page: '1',
    ...queryParameters,
  });

  const { data } = await axios.get(`${url}/${section}?${params}`, options);
  return data;
};
