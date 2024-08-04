import React, { useEffect, useState } from 'react';
import { Modal, Input, Select, Button, message } from 'antd';
import axios from 'axios';
import './styles.css'; // Подключение стилей

const { Option } = Select;

const UpdateDepartmentModal = ({ isVisible, onClose, buttonColor }) => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [newDepName, setNewDepName] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/gd/');
        setDepartments(response.data);
      } catch (error) {
        console.error('Ошибка при получении списка отделов:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleUpdateDepartment = async () => {
    try {
      await axios.put(`http://localhost:3000/update_dep/?id=${selectedDepartment}&new_name=${newDepName}`);
      message.success('Отдел успешно обновлен');
      resetForm();
    } catch (error) {
      message.error('Ошибка при обновлении отдела');
    }
  };

  const resetForm = () => {
    setSelectedDepartment(null);
    setNewDepName('');
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
      title={<div className="centered-title">Обновить отдел</div>}
      visible={isVisible}
      onCancel={resetForm}
      footer={null}
      centered
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Select
          className="custom-select" // Применяем кастомные стили для Select
          placeholder="Выберите отдел"
          value={selectedDepartment}
          style={{ marginBottom: '10px', width: '200px' }}
          onChange={(value) => setSelectedDepartment(value)}
        >
          {departments.map((dep) => (
            <Option key={dep.id} value={dep.id}>
              {dep.department}
            </Option>
          ))}
        </Select>
        <Input
          className="custom-input" // Применяем кастомные стили для Input
          placeholder="Новое имя отдела"
          value={newDepName}
          onChange={(e) => setNewDepName(e.target.value)}
          style={{ marginBottom: '10px', width: '200px' }}
        />
        <Button type="primary" style={buttonStyle} onClick={handleUpdateDepartment}>
          Обновить отдел
        </Button>
      </div>
    </Modal>
  );
};

export default UpdateDepartmentModal;
