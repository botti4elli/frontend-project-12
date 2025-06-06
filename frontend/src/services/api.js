import axios from 'axios';

const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const fetchInitialData = async (token) => {
  const headers = getAuthHeaders(token);

  const [channelsRes, messagesRes] = await Promise.all([
    axios.get('/api/v1/channels', headers),
    axios.get('/api/v1/messages', headers),
  ]);

  return {
    data: {
      channels: channelsRes.data,
      messages: messagesRes.data,
    },
  };
};

export default fetchInitialData;
