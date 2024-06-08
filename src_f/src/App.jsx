// import React, { useState, useEffect } from 'react';
// import { fetchStaff } from './api';
// import UserMenu from './components/UserMenu';
// import AddUserForm from './components/AddUserForm';
// import AddTimeForm from './components/AddTimeForm';
// import ActionButtons from './components/ActionButtons';
// import DateInputModal from './components/DateInputModal';
// import MonthInputModal from './components/MonthInputModal';
// import { Modal } from 'antd';

// const App = () => {
//   const [staff, setStaff] = useState([]);
//   const [showAddUser, setShowAddUser] = useState(false);
//   const [showAddTime, setShowAddTime] = useState(false);
//   const [showUserList, setShowUserList] = useState(false);
//   const [showDateInput, setShowDateInput] = useState(false);
//   const [showMonthInput, setShowMonthInput] = useState(false);

//   const refreshStaffList = async () => {
//     try {
//       const staffResponse = await fetchStaff();
//       const menuStaff = staffResponse.map((member) => ({
//         key: String(member.id),
//         label: `${member.id} - ${member.fullname}`,
//       }));
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
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//       <h1>Журнал учета времени</h1>
//       <ActionButtons
//         setShowAddUser={setShowAddUser}
//         setShowAddTime={setShowAddTime}
//         setShowUserList={setShowUserList}
//         setShowDateInput={setShowDateInput}
//         setShowMonthInput={setShowMonthInput}
//       />
//       <Modal
//         title="Добавить пользователя"
//         open={showAddUser}
//         onCancel={() => setShowAddUser(false)}
//         footer={null}
//       >
//         <AddUserForm refreshStaffList={refreshStaffList} />
//       </Modal>
//       <Modal
//         title="Установить время"
//         open={showAddTime}
//         onCancel={() => setShowAddTime(false)}
//         footer={null}
//       >
//         <AddTimeForm />
//       </Modal>
//       <Modal
//         title="Список пользователей"
//         open={showUserList}
//         onCancel={() => setShowUserList(false)}
//         footer={null}
//         centered
//       >
//         <UserMenu staff={staff} onClick={onClick} />
//       </Modal>
//       <DateInputModal show={showDateInput} onClose={() => setShowDateInput(false)} />
//       <MonthInputModal show={showMonthInput} onClose={() => setShowMonthInput(false)} />
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { fetchStaff } from './api';
import UserMenu from './components/UserMenu';
import AddUserForm from './components/AddUserForm';
import AddTimeForm from './components/AddTimeForm';
import UpdateTimeForm from './components/UpdateTimeForm';
import ActionButtons from './components/ActionButtons';
import DateInputModal from './components/DateInputModal';
import MonthInputModal from './components/MonthInputModal';
import { Modal } from 'antd';

const App = () => {
  const [staff, setStaff] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddTime, setShowAddTime] = useState(false);
  const [showUpdateTime, setShowUpdateTime] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);
  const [showMonthInput, setShowMonthInput] = useState(false);

  const refreshStaffList = async () => {
    try {
      const staffResponse = await fetchStaff();
      const menuStaff = staffResponse.map((member) => ({
        key: String(member.id),
        label: `${member.id} - ${member.fullname}`,
      }));
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Журнал учета времени</h1>
      <ActionButtons
        setShowAddUser={setShowAddUser}
        setShowAddTime={setShowAddTime}
        setShowUpdateTime={setShowUpdateTime}
        setShowUserList={setShowUserList}
        setShowDateInput={setShowDateInput}
        setShowMonthInput={setShowMonthInput}
      />
      <Modal
        title="Add User"
        open={showAddUser}
        onCancel={() => setShowAddUser(false)}
        footer={null}
      >
        <AddUserForm refreshStaffList={refreshStaffList} />
      </Modal>
      <Modal
        title="Set Time"
        open={showAddTime}
        onCancel={() => setShowAddTime(false)}
        footer={null}
      >
        <AddTimeForm />
      </Modal>
      <Modal
        title="Update Time"
        open={showUpdateTime}
        onCancel={() => setShowUpdateTime(false)}
        footer={null}
      >
        <UpdateTimeForm />
      </Modal>
      <Modal
        title="User List"
        open={showUserList}
        onCancel={() => setShowUserList(false)}
        footer={null}
      >
        <UserMenu onClick={onClick} staff={staff} />
      </Modal>
      <DateInputModal
        show={showDateInput}
        onClose={() => setShowDateInput(false)} // Закрыть модальное окно при нажатии на кнопку "Закрыть"
      />
      <MonthInputModal
        show={showMonthInput}
        onClose={() => setShowMonthInput(false)} // Закрыть модальное окно при нажатии на кнопку "Закрыть"
      />
    </div>
  );
};

export default App;
