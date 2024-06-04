// import React, { useState, useEffect } from 'react';
// import { fetchStaff } from '../api';
// import UserMenu from './components/UserMenu';
// import AddUserForm from './components/AddUserForm';
// import AddTimeForm from './components/AddTimeForm';

// const App = () => {
//   const [staff, setStaff] = useState([]);

//   const refreshStaffList = async () => {
//     try {
//       const staffResponse = await fetchStaff();
//       const menuStaff = [
//         {
//           key: 'g1',
//           label: 'Список пользователей',
//           type: 'group',
//           children: staffResponse.map((member) => ({
//             key: String(member.id),
//             label: `${member.id} - ${member.fullname}`,
//           })),
//         }
//       ];
//       setStaff(menuStaff);
//     } catch (error) {
//       console.error('Error refreshing staff list:', error);
//     }
//   };

//   useEffect(() => {
//     refreshStaffList();
//   }, []);

//   const onClick = (e) => {
//     console.log('click ', e);
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <UserMenu staff={staff} onClick={onClick} />
//       <div style={{ marginLeft: 20, flex: 1 }}>
//         <h2>Add User</h2>
//         <AddUserForm refreshStaffList={refreshStaffList} />
//         <h2 style={{ marginTop: 40 }}>Add Time</h2>
//         <AddTimeForm />
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { fetchStaff } from './api';
import UserMenu from './components/UserMenu';
import AddUserForm from './components/AddUserForm';
import AddTimeForm from './components/AddTimeForm';

const App = () => {
  const [staff, setStaff] = useState([]);

  const refreshStaffList = async () => {
    try {
      const staffResponse = await fetchStaff();
      const menuStaff = [
        {
          key: 'g1',
          label: 'Список пользователей',
          type: 'group',
          children: staffResponse.map((member) => ({
            key: String(member.id),
            label: `${member.id} - ${member.fullname}`,
          })),
        }
      ];
      setStaff(menuStaff);
    } catch (error) {
      console.error('Error refreshing staff list:', error);
    }
  };

  useEffect(() => {
    refreshStaffList();
  }, []);

  const onClick = (e) => {
    console.log('click ', e);
  };

  return (
    <div style={{ display: 'flex' }}>
      <UserMenu staff={staff} onClick={onClick} />
      <div style={{ marginLeft: 20, flex: 1 }}>
        <h2>Add User</h2>
        <AddUserForm refreshStaffList={refreshStaffList} />
        <h2 style={{ marginTop: 40 }}>Add Time</h2>
        <AddTimeForm />
      </div>
    </div>
  );
};

export default App;

