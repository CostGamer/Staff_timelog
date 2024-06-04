// import axios from 'axios';

// export const fetchStaff = async () => {
//   try {
//     const response = await axios.get('http://localhost:8000/');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching staff data:', error);
//     throw error;
//   }
// };

// export const addStaff = async (userData) => {
//   try {
//     const response = await axios.post('http://localhost:8000/add/', userData);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding staff member:', error);
//     throw error;
//   }
// };

// export const addTime = async (userId, timeData) => {
//   try {
//     const response = await axios.post(`http://localhost:8000/settime/?id=${userId}`, timeData);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding time:', error);
//     throw error;
//   }
// };

// src/api.js



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
    const response = await axios.post(`http://localhost:8000/settime/?id=${userId}`, timeData);
    return response.data;
  } catch (error) {
    console.error('Error adding time:', error);
    throw error;
  }
};
