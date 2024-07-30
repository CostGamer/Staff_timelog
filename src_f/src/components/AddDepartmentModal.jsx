import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import axios from 'axios';

const AddDepartmentModal = ({ isVisible, onClose }) => {
  const [depName, setDepName] = useState('');

  const handleAddDepartment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/dep/', {
        dep_name: depName,
      });
      message.success(`Отдел ${response.data.name} добавлен с ID: ${response.data.id}`);
      onClose();
    } catch (error) {
      message.error('Ошибка при добавлении отдела');
    }
  };

  return (
    <Modal
      title="Добавить отдел"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Input
          placeholder="Имя отдела"
          value={depName}
          onChange={(e) => setDepName(e.target.value)}
          style={{ marginBottom: '10px', width: '200px' }}
        />
        <Button type="primary" onClick={handleAddDepartment}>
          Добавить отдел
        </Button>
      </div>
    </Modal>
  );
};

export default AddDepartmentModal;
