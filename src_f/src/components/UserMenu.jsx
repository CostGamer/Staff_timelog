// import React from 'react';
// import { Menu } from 'antd';
// import { MailOutlined } from '@ant-design/icons';

// const UserMenu = ({ staff, onClick }) => (
//   <Menu
//     onClick={onClick}
//     style={{ width: 256 }}
//     defaultSelectedKeys={['1']}
//     defaultOpenKeys={['sub1']}
//     mode="inline"
//     items={staff}
//   />
// );

// export default UserMenu;

import React from 'react';
import { Menu } from 'antd';

const UserMenu = ({ staff, onClick }) => (
  <Menu
    onClick={onClick}
    style={{ width: 256 }}
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['g1']}
    mode="inline"
    items={staff}
  />
);

export default UserMenu;
