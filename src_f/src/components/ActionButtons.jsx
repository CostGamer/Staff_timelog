import React from 'react';
import { Button, message } from 'antd';

const ActionButtons = ({ setShowAddUser, setShowAddTime, setShowUserList, setShowDateInput, setShowMonthInput, setShowUpdateTime }) => {
  const handleGenerateExcelMonth = () => {
    setShowMonthInput(true);
  };

  const handleGetUserList = () => {
    setShowUserList(true);
  };

  const buttonStyle = {
    width: '250px',
    height: '60px',
    fontSize: '16px',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
      }}
    >
      <Button type="primary" style={buttonStyle} onClick={handleGetUserList}>
        Список пользователей
      </Button>
      <Button type="primary" style={buttonStyle} onClick={() => setShowAddUser(true)}>
        Добавить пользователя
      </Button>
      <Button type="primary" style={buttonStyle} onClick={() => setShowAddTime(true)}>
        Указать время
      </Button>
      <Button type="primary" style={buttonStyle} onClick={() => setShowDateInput(true)}>
        Получить excel за день
      </Button>
      <Button type="primary" style={buttonStyle} onClick={handleGenerateExcelMonth}>
        Получить excel за месяц
      </Button>
      <Button type="primary" style={buttonStyle} onClick={() => setShowUpdateTime(true)}>
        Исправить время
      </Button>
    </div>
  );
};

export default ActionButtons;
