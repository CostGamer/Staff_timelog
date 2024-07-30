import React, { useEffect, useState } from 'react';
import { Modal, Input, Select, Button, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const UpdateDepartmentModal = ({ isVisible, onClose }) => {
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
      onClose();
    } catch (error) {
      message.error('Ошибка при обновлении отдела');
    }
  };

  return (
    <Modal
      title="Обновить отдел"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Select
          placeholder="Выберите отдел"
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
          placeholder="Новое имя отдела"
          value={newDepName}
          onChange={(e) => setNewDepName(e.target.value)}
          style={{ marginBottom: '10px', width: '200px' }}
        />
        <Button type="primary" onClick={handleUpdateDepartment}>
          Обновить отдел
        </Button>
      </div>
    </Modal>
  );
};

export default UpdateDepartmentModal;
