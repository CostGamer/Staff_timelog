import React from 'react';
import { Menu } from 'antd';

const UserMenu = ({ staff, onClick }) => (
  <Menu
    onClick={onClick}
    style={{ width: '100%' }}
    mode="inline"
    items={staff}
  />
);

export default UserMenu;
