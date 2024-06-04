// src/components/Home.jsx

import React from 'react';
import UserMenu from './UserMenu';

const Home = ({ staff, onClick }) => (
  <div className="flex">
    <UserMenu staff={staff} onClick={onClick} />
    <div className="ml-4 flex-1">
      <h2 className="text-xl font-bold">Welcome</h2>
      <p>Select an option from the menu or add a new user.</p>
    </div>
  </div>
);

export default Home;
