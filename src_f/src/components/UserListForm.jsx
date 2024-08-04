import React, { useState, useEffect } from 'react';
import { Form, Select, Button, List, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const UserListForm = ({ departments }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = async (departmentId) => {
    try {
      const response = await axios.get(`http://localhost:3000/gs/?department_id=${departmentId}`);
      setUsers(response.data);
    } catch (error) {
      message.error('Ошибка при загрузке пользователей');
    }
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    fetchUsers(value);
  };

  return (
    <div>
      <Form layout="vertical" style={{ maxWidth: 400 }}>
        <Form.Item
          name="department"
          label="Отдел"
          rules={[{ required: true, message: 'Выберите отдел!' }]}
        >
          <Select
            placeholder="Выберите отдел"
            onChange={handleDepartmentChange}
          >
            {departments.map((dep) => (
              <Option key={dep.id} value={dep.id}>
                {dep.department}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      {selectedDepartment && (
        <List
          bordered
          dataSource={users}
          renderItem={(user) => (
            <List.Item key={user.id}>{user.fullname}</List.Item>
          )}
        />
      )}
    </div>
  );
};

export default UserListForm;


