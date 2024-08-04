// import React, { useState, useEffect } from 'react';
// import { Button, Modal, message } from 'antd';
// import axios from 'axios';
// import './styles.css';
// import AddDepartmentModal from './AddDepartmentModal';
// import DepartmentList from './GetDepartmentsList';
// import UpdateDepartmentModal from './UpdateDepartmentModal';
// import AddUserForm from './AddUserForm';
// import DeleteUserForm from './DeleteUserForm';
// import UserListForm from './UserListForm';
// import SetTimeForm from './SetTimeForm';
// import SetTimeUpdateForm from './SetTimeUpdateForm';
// import DownloadDailyReport from './DownloadDailyReport';
// import DownloadMonthlyReport from './DownloadMonthlyReport';

// const ActionButtons = () => {
//   const [isDepartmentModalVisible, setDepartmentModalVisible] = useState(false);
//   const [isDepartmentListModalVisible, setDepartmentListModalVisible] = useState(false);
//   const [isAddDepartmentModalVisible, setAddDepartmentModalVisible] = useState(false);
//   const [isUpdateDepartmentModalVisible, setUpdateDepartmentModalVisible] = useState(false);
//   const [isExcelModalVisible, setExcelModalVisible] = useState(false);
//   const [isUserModalVisible, setUserModalVisible] = useState(false);
//   const [isAddUserModalVisible, setAddUserModalVisible] = useState(false);
//   const [isDeleteUserModalVisible, setDeleteUserModalVisible] = useState(false);
//   const [isUserListModalVisible, setUserListModalVisible] = useState(false);
//   const [isSetTimeModalVisible, setSetTimeModalVisible] = useState(false);
//   const [isUpdateTimeModalVisible, setUpdateTimeModalVisible] = useState(false);
//   const [isDownloadDailyReportVisible, setDownloadDailyReportVisible] = useState(false);
//   const [isDownloadMonthlyReportVisible, setDownloadMonthlyReportVisible] = useState(false);
//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/gd');
//         setDepartments(response.data);
//       } catch (error) {
//         message.error('Ошибка при загрузке отделов');
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const buttonStyle = {
//     width: '100%',
//     maxWidth: '400px',
//     height: '4em',
//     fontSize: '1em',
//     marginBottom: '0.5em',
//     backgroundColor: '#8E0612',
//     color: '#fff',
//     border: 'none', // Удаляет стандартную рамку
//     outline: 'none', // Удаляет стандартный эффект фокуса
//   };

//   const buttonFocusStyle = {
//     boxShadow: 'none', // Удаляет стандартный эффект фокуса
//   };

//   const modalStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100vh',
//       overflow: 'hidden' // Обеспечивает, чтобы контейнер не выходил за пределы окна
//     }}>
//       <div style={{
//         padding: '1em',
//         textAlign: 'center',
//         backgroundColor: '#f0f2f5',
//         borderBottom: '1px solid #e8e8e8'
//       }}>
//         <h1 style={{ color: '#525152', margin: 0 }}>Журнал учета времени</h1>
//       </div>
      
//       <div style={{
//         flex: 1,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         overflowY: 'auto', // Добавлено для вертикальной прокрутки
//         padding: '1em'
//       }}>
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           width: '100%',
//           maxWidth: '400px',
//           gap: '1em',
//           alignItems: 'center',
//         }}>
//           <Button
//             type="primary"
//             style={{ ...buttonStyle, ...buttonFocusStyle }}
//             onClick={() => setDepartmentModalVisible(true)}
//           >
//             Отдел
//           </Button>
//           <Button
//             type="primary"
//             style={{ ...buttonStyle, ...buttonFocusStyle }}
//             onClick={() => setExcelModalVisible(true)}
//           >
//             Excel
//           </Button>
//           <Button
//             type="primary"
//             style={{ ...buttonStyle, ...buttonFocusStyle }}
//             onClick={() => setUserModalVisible(true)}
//           >
//             Пользователь
//           </Button>
//           <Button
//             type="primary"
//             style={{ ...buttonStyle, ...buttonFocusStyle }}
//             onClick={() => setUserListModalVisible(true)}
//           >
//             Получить список пользователей
//           </Button>
//           <Button
//             type="primary"
//             style={{ ...buttonStyle, ...buttonFocusStyle }}
//             onClick={() => setSetTimeModalVisible(true)}
//           >
//             Установить время
//           </Button>
//           <Button
//             type="primary"
//             style={{ ...buttonStyle, ...buttonFocusStyle }}
//             onClick={() => setUpdateTimeModalVisible(true)}
//           >
//             Обновить время
//           </Button>
//         </div>
//       </div>

//       {/* Department Modal */}
//       <Modal
//         title={<div className="centered-title">Отдел</div>}
//         open={isDepartmentModalVisible}
//         onCancel={() => setDepartmentModalVisible(false)}
//         footer={null}
//         centered
//       >
//         <div style={modalStyle}>
//           <Button type="primary" style={{ ...buttonStyle, ...buttonFocusStyle }} onClick={() => {
//             setDepartmentModalVisible(false);
//             setDepartmentListModalVisible(true);
//           }}>
//             Список отделов
//           </Button>
//           <Button type="primary" style={{ ...buttonStyle, ...buttonFocusStyle }} onClick={() => {
//             setDepartmentModalVisible(false);
//             setAddDepartmentModalVisible(true);
//           }}>
//             Добавить отдел
//           </Button>
//           <Button type="primary" style={{ ...buttonStyle, ...buttonFocusStyle }} onClick={() => {
//             setDepartmentModalVisible(false);
//             setUpdateDepartmentModalVisible(true);
//           }}>
//             Обновить отдел
//           </Button>
//         </div>
//       </Modal>

//       {/* Department List Modal */}
//       <Modal
//         title={<div className="centered-title">Список отделов</div>}
//         open={isDepartmentListModalVisible}
//         onCancel={() => setDepartmentListModalVisible(false)}
//         footer={null}
//         centered
//       >
//         <DepartmentList departments={departments} />
//       </Modal>

//       {/* Add Department Modal */}
//       <AddDepartmentModal
//         isVisible={isAddDepartmentModalVisible}
//         onClose={() => setAddDepartmentModalVisible(false)}
//         updateDepartments={(newDepartments) => setDepartments(newDepartments)}
//       />

//       {/* Update Department Modal */}
//       <UpdateDepartmentModal
//         isVisible={isUpdateDepartmentModalVisible}
//         onClose={() => setUpdateDepartmentModalVisible(false)}
//         updateDepartments={(newDepartments) => setDepartments(newDepartments)}
//       />

//       {/* Excel Modal */}
//       <Modal
//         title={<div className="centered-title">Excel</div>}
//         open={isExcelModalVisible}
//         onCancel={() => setExcelModalVisible(false)}
//         footer={null}
//         centered
//       >
//         <div style={modalStyle}>
//           <Button type="primary" style={{ ...buttonStyle, ...buttonFocusStyle }} onClick={() => setDownloadMonthlyReportVisible(true)}>
//             Получить файл за месяц
//           </Button>
//           <Button type="primary" style={{ ...buttonStyle, ...buttonFocusStyle }} onClick={() => setDownloadDailyReportVisible(true)}>
//             Получить файл за день
//           </Button>
//         </div>
//       </Modal>

//       {/* User Modal */}
//       <Modal
//         title={<div className="centered-title">Пользователь</div>}
//         open={isUserModalVisible}
//         onCancel={() => setUserModalVisible(false)}
//         footer={null}
//         centered
//       >
//         <div style={modalStyle}>
//           <Button type="primary" style={{ ...buttonStyle, ...buttonFocusStyle }} onClick={() => {
//             setUserModalVisible(false);
//             setAddUserModalVisible(true);
//           }}>
//             Добавить пользователя
//           </Button>
//           <Button type="primary" style={{ ...buttonStyle, ...buttonFocusStyle }} onClick={() => {
//             setUserModalVisible(false);
//             setDeleteUserModalVisible(true);
//           }}>
//             Удалить пользователя
//           </Button>
//         </div>
//       </Modal>

//       {/* Add User Modal */}
//       <Modal
//         title={<div className="centered-title">Добавить пользователя</div>}
//         open={isAddUserModalVisible}
//         onCancel={() => setAddUserModalVisible(false)}
//         footer={null}
//         centered
//       >
//         <AddUserForm departments={departments} />
//       </Modal>

//       {/* Delete User Modal */}
//       <Modal
//         title={<div className="centered-title">Удалить пользователя</div>}
//         open={isDeleteUserModalVisible}
//         onCancel={() => setDeleteUserModalVisible(false)}
//         footer={null}
//         centered
//       >
//         <DeleteUserForm departments={departments} />
//       </Modal>

//       {/* User List Modal */}
//       <Modal
//         title={<div className="centered-title">Список пользователей</div>}
//         open={isUserListModalVisible}
//         onCancel={() => setUserListModalVisible(false)}
//         footer={null}
//         centered
//       >
//         <UserListForm departments={departments} />
//       </Modal>

//       {/* Set Time Modal */}
//       <Modal
//         title={<div className="centered-title">Установить время</div>}
//         open={isSetTimeModalVisible}
//         onCancel={() => setSetTimeModalVisible(false)}
//         footer={null}
//         centered
//       >
//         <SetTimeForm departments={departments} isUpdateMode={false} />
//       </Modal>

//       {/* Update Time Modal */}
//       <Modal
//         title={<div className="centered-title">Обновить время</div>}
//         open={isUpdateTimeModalVisible}
//         onCancel={() => setUpdateTimeModalVisible(false)}
//         footer={null}
//         centered
//       >
//         <SetTimeUpdateForm departments={departments} isUpdateMode={true} />
//       </Modal>

//       {/* Download Daily Report Modal */}
//       <DownloadDailyReport
//         isVisible={isDownloadDailyReportVisible}
//         onClose={() => setDownloadDailyReportVisible(false)}
//         departments={departments}
//       />

//       {/* Download Monthly Report Modal */}
//       <DownloadMonthlyReport
//         isVisible={isDownloadMonthlyReportVisible}
//         onClose={() => setDownloadMonthlyReportVisible(false)}
//         departments={departments}
//       />
//     </div>
//   );
// };

// export default ActionButtons;



import React, { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import axios from 'axios';
import './styles.css';
import AddDepartmentModal from './AddDepartmentModal';
import DepartmentList from './GetDepartmentsList';
import UpdateDepartmentModal from './UpdateDepartmentModal';
import AddUserForm from './AddUserForm';
import DeleteUserForm from './DeleteUserForm';
import UserListForm from './UserListForm';
import SetTimeForm from './SetTimeForm';
import SetTimeUpdateForm from './SetTimeUpdateForm';
import DownloadDailyReport from './DownloadDailyReport';
import DownloadMonthlyReport from './DownloadMonthlyReport';

const ActionButtons = () => {
  const [isDepartmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [isDepartmentListModalVisible, setDepartmentListModalVisible] = useState(false);
  const [isAddDepartmentModalVisible, setAddDepartmentModalVisible] = useState(false);
  const [isUpdateDepartmentModalVisible, setUpdateDepartmentModalVisible] = useState(false);
  const [isExcelModalVisible, setExcelModalVisible] = useState(false);
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [isAddUserModalVisible, setAddUserModalVisible] = useState(false);
  const [isDeleteUserModalVisible, setDeleteUserModalVisible] = useState(false);
  const [isUserListModalVisible, setUserListModalVisible] = useState(false);
  const [isSetTimeModalVisible, setSetTimeModalVisible] = useState(false);
  const [isUpdateTimeModalVisible, setUpdateTimeModalVisible] = useState(false);
  const [isDownloadDailyReportVisible, setDownloadDailyReportVisible] = useState(false);
  const [isDownloadMonthlyReportVisible, setDownloadMonthlyReportVisible] = useState(false);

  const [addDepartmentData, setAddDepartmentData] = useState({});
  const [updateDepartmentData, setUpdateDepartmentData] = useState({});
  const [addUserData, setAddUserData] = useState({});
  const [deleteUserData, setDeleteUserData] = useState({});
  const [setTimeData, setSetTimeData] = useState({});
  const [updateTimeData, setUpdateTimeData] = useState({});
  
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/gd');
        setDepartments(response.data);
      } catch (error) {
        message.error('Ошибка при загрузке отделов');
      }
    };

    fetchDepartments();
  }, []);

  const handleModalClose = (closeModalFunc, resetStateFunc) => {
    closeModalFunc(false);
    resetStateFunc();
  };

  const buttonStyle = {
    width: '100%',
    maxWidth: '400px',
    height: '4em',
    fontSize: '1em',
    marginBottom: '0.5em',
    backgroundColor: '#8E0612',
    color: '#fff',
    border: 'none',
    outline: 'none',
  };

  const buttonFocusStyle = {
    boxShadow: 'none',
  };

  const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '1em',
        textAlign: 'center',
        backgroundColor: '#f0f2f5',
        borderBottom: '1px solid #e8e8e8',
      }}>
        <h1 style={{ color: '#525152', margin: 0 }}>Журнал учета времени</h1>
      </div>
      
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
        padding: '1em',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '400px',
          gap: '1em',
          alignItems: 'center',
        }}>
          <Button
            type="primary"
            style={{ ...buttonStyle, ...buttonFocusStyle }}
            onClick={() => setDepartmentModalVisible(true)}
          >
            Отдел
          </Button>
          <Button
            type="primary"
            style={{ ...buttonStyle, ...buttonFocusStyle }}
            onClick={() => setExcelModalVisible(true)}
          >
            Excel
          </Button>
          <Button
            type="primary"
            style={{ ...buttonStyle, ...buttonFocusStyle }}
            onClick={() => setUserModalVisible(true)}
          >
            Пользователь
          </Button>
          <Button
            type="primary"
            style={{ ...buttonStyle, ...buttonFocusStyle }}
            onClick={() => setUserListModalVisible(true)}
          >
            Получить список пользователей
          </Button>
          <Button
            type="primary"
            style={{ ...buttonStyle, ...buttonFocusStyle }}
            onClick={() => setSetTimeModalVisible(true)}
          >
            Установить время
          </Button>
          <Button
            type="primary"
            style={{ ...buttonStyle, ...buttonFocusStyle }}
            onClick={() => setUpdateTimeModalVisible(true)}
          >
            Обновить время
          </Button>
        </div>
      </div>

      {/* Department Modal */}
      <Modal
        title={<div className="centered-title">Отдел</div>}
        open={isDepartmentModalVisible}
        onCancel={() => handleModalClose(setDepartmentModalVisible, () => {})}
        footer={null}
        centered
      >
        <div style={modalStyle}>
          <Button type="primary" style={{ ...buttonStyle, ...buttonFocusStyle }} onClick={() => {
            setDepartmentModalVisible(false);
            setDepartmentListModalVisible(true);
          }}>
            Список отделов
          </Button>
          <Button type="primary" style={{ ...buttonStyle, ...buttonFocusStyle }} onClick={() => {
            setDepartmentModalVisible(false);
            setAddDepartmentModalVisible(true);
          }}>
            Добавить отдел
          </Button>
          <Button type="primary" style={{ ...buttonStyle, ...buttonFocusStyle }} onClick={() => {
            setDepartmentModalVisible(false);
            setUpdateDepartmentModalVisible(true);
          }}>
            Обновить отдел
          </Button>
        </div>
      </Modal>

      {/* Department List Modal */}
      <Modal
        title={<div className="centered-title">Список отделов</div>}
        open={isDepartmentListModalVisible}
        onCancel={() => handleModalClose(setDepartmentListModalVisible, () => {})}
        footer={null}
        centered
      >
        <DepartmentList departments={departments} />
      </Modal>

      {/* Add Department Modal */}
      <AddDepartmentModal
        isVisible={isAddDepartmentModalVisible}
        onClose={() => handleModalClose(setAddDepartmentModalVisible, () => setAddDepartmentData({}))}
        updateDepartments={(newDepartments) => setDepartments(newDepartments)}
        formData={addDepartmentData}
        setFormData={setAddDepartmentData}
      />

      {/* Update Department Modal */}
      <UpdateDepartmentModal
        isVisible={isUpdateDepartmentModalVisible}
        onClose={() => handleModalClose(setUpdateDepartmentModalVisible, () => setUpdateDepartmentData({}))}
        updateDepartments={(newDepartments) => setDepartments(newDepartments)}
        formData={updateDepartmentData}
        setFormData={setUpdateDepartmentData}
      />

      {/* Excel Modal */}
      <Modal
        title={<div className="centered-title">Excel</div>}
        open={isExcelModalVisible}
        onCancel={() => handleModalClose(setExcelModalVisible, () => {})}
        footer={null}
        centered
      >
        <div style={modalStyle}>
          <Button type="primary" style={{ ...buttonStyle, ...buttonFocusStyle }} onClick={() => setDownloadMonthlyReportVisible(true)}>
            Получить файл за месяц
          </Button>
          <Button type="primary" style={{ ...buttonStyle, ...buttonFocusStyle }} onClick={() => setDownloadDailyReportVisible(true)}>
            Получить файл за день
          </Button>
        </div>
      </Modal>

      {/* User Modal */}
      <Modal
        title={<div className="centered-title">Пользователь</div>}
        open={isUserModalVisible}
        onCancel={() => handleModalClose(setUserModalVisible, () => {})}
        footer={null}
        centered
      >
        <div style={modalStyle}>
          <Button type="primary" style={{ ...buttonStyle, ...buttonFocusStyle }} onClick={() => {
            setUserModalVisible(false);
            setAddUserModalVisible(true);
          }}>
            Добавить пользователя
          </Button>
          <Button type="primary" style={{ ...buttonStyle, ...buttonFocusStyle }} onClick={() => {
            setUserModalVisible(false);
            setDeleteUserModalVisible(true);
          }}>
            Удалить пользователя
          </Button>
        </div>
      </Modal>

      {/* Add User Modal */}
      <Modal
        title={<div className="centered-title">Добавить пользователя</div>}
        open={isAddUserModalVisible}
        onCancel={() => handleModalClose(setAddUserModalVisible, () => setAddUserData({}))}
        footer={null}
        centered
      >
        <AddUserForm departments={departments} formData={addUserData} setFormData={setAddUserData} />
      </Modal>

      {/* Delete User Modal */}
      <Modal
        title={<div className="centered-title">Удалить пользователя</div>}
        open={isDeleteUserModalVisible}
        onCancel={() => handleModalClose(setDeleteUserModalVisible, () => setDeleteUserData({}))}
        footer={null}
        centered
      >
        <DeleteUserForm departments={departments} formData={deleteUserData} setFormData={setDeleteUserData} />
      </Modal>

      {/* User List Modal */}
      <Modal
        title={<div className="centered-title">Список пользователей</div>}
        open={isUserListModalVisible}
        onCancel={() => handleModalClose(setUserListModalVisible, () => {})}
        footer={null}
        centered
      >
        <UserListForm departments={departments} />
      </Modal>

      {/* Set Time Modal */}
      <Modal
        title={<div className="centered-title">Установить время</div>}
        open={isSetTimeModalVisible}
        onCancel={() => handleModalClose(setSetTimeModalVisible, () => setSetTimeData({}))}
        footer={null}
        centered
      >
        <SetTimeForm departments={departments} isUpdateMode={false} formData={setTimeData} setFormData={setSetTimeData} />
      </Modal>

      {/* Update Time Modal */}
      <Modal
        title={<div className="centered-title">Обновить время</div>}
        open={isUpdateTimeModalVisible}
        onCancel={() => handleModalClose(setUpdateTimeModalVisible, () => setUpdateTimeData({}))}
        footer={null}
        centered
      >
        <SetTimeUpdateForm departments={departments} isUpdateMode={true} formData={updateTimeData} setFormData={setUpdateTimeData} />
      </Modal>

      {/* Download Daily Report Modal */}
      <DownloadDailyReport
        isVisible={isDownloadDailyReportVisible}
        onClose={() => handleModalClose(setDownloadDailyReportVisible, () => {})}
        departments={departments}
      />

      {/* Download Monthly Report Modal */}
      <DownloadMonthlyReport
        isVisible={isDownloadMonthlyReportVisible}
        onClose={() => handleModalClose(setDownloadMonthlyReportVisible, () => {})}
        departments={departments}
      />
    </div>
  );
};

export default ActionButtons;
