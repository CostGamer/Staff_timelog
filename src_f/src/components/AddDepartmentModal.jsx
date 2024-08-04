import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import axios from 'axios';
import './styles2.css';

const AddDepartmentModal = ({ isVisible, onClose, buttonColor }) => {
  const [depName, setDepName] = useState('');

  const handleAddDepartment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/dep/', {
        dep_name: depName,
      });
      message.success(`Отдел ${response.data.name} добавлен с ID: ${response.data.id}`);
      resetForm();
    } catch (error) {
      message.error('Ошибка при добавлении отдела');
    }
  };

  const resetForm = () => {
    setDepName('');
    onClose();
  };

  const buttonStyle = {
    backgroundColor: buttonColor || '#8E0612', // Основной цвет кнопки
    borderColor: buttonColor || '#8E0612',
    color: '#fff',
    outline: 'none', // Убирает контур фокуса
    boxShadow: 'none', // Убирает тень активации
    WebkitTapHighlightColor: 'transparent', // Убирает цвет подсветки на мобильных устройствах
  };

  return (
    <Modal
      title={<div className="centered-title">Добавить отдел</div>}
      visible={isVisible}
      onCancel={resetForm}
      footer={null}
      centered
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Input
          className="custom-input" // Применяем стили для изменения цвета обводки
          placeholder="Имя отдела"
          value={depName}
          onChange={(e) => setDepName(e.target.value)}
          style={{ marginBottom: '10px', width: '200px' }}
        />
        <Button type="primary" style={buttonStyle} onClick={handleAddDepartment}>
          Добавить отдел
        </Button>
      </div>
    </Modal>
  );
};

export default AddDepartmentModal;
