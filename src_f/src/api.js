import axios from 'axios';

export const fetchStaff = async () => {
  try {
    const response = await axios.get('http://localhost:8000/');
    return response.data;
  } catch (error) {
    console.error('Error fetching staff data:', error);
    throw error;
  }
};

export const addStaff = async (userData) => {
  try {
    const response = await axios.post('http://localhost:8000/add/', userData);
    return response.data;
  } catch (error) {
    console.error('Error adding staff member:', error);
    throw error;
  }
};

export const addTime = async (userId, timeData) => {
  try {
    const response = await axios.post(`http://localhost:8000/settime/?id=${userId}`, timeData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding time:', error);
    throw error;
  }
};

export const updateTime = async (userId, timeData) => {
  try {
    const response = await axios.put(`http://localhost:8000/update_time/?id=${userId}`, timeData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating time:', error);
    throw error;
  }
};

export const generateExcelDay = async (formattedDate) => {
  try {
    const response = await axios.get(`http://localhost:8000/dayx/?data=${formattedDate}`, {
      responseType: 'blob',
    });
    return response;
  } catch (error) {
    console.error('Error generating Excel for the day:', error);
    throw error;
  }
};

export const generateExcelMonth = async (year, month) => {
  try {
    const response = await axios.get(`http://localhost:8000/monthx/?year=${year}&month=${month}`, {
      responseType: 'blob',
    });
    return response;
  } catch (error) {
    console.error('Error generating Excel for the month:', error);
    throw error;
  }
};

export const fixTime = async () => {
  try {
    const response = await axios.post('http://localhost:8000/fix-time');
    return response.data;
  } catch (error) {
    console.error('Error fixing time:', error);
    throw error;
  }
};
