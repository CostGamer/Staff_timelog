import React, { useState, useEffect } from 'react';
import { Form, Select, Button, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const DeleteUserForm = ({ refreshStaffList, departments }) => {
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (selectedDepartment) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/gs/?department_id=${selectedDepartment}`);
          setUsers(response.data);
        } catch (error) {
          message.error('Ошибка при загрузке пользователей');
        }
      };
      fetchUsers();
    }
  }, [selectedDepartment]);

  const onFinish = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/delete_user/?id=${selectedUser}`);
      message.success('Пользователь удален');
      refreshStaffList();
      setLoading(false);
    } catch (error) {
      message.error('Ошибка при удалении пользователя');
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>
      <Form.Item
        name="department"
        label="Отдел"
        rules={[{ required: true, message: 'Выберите отдел!' }]}
      >
        <Select
          placeholder="Выберите отдел"
          onChange={(value) => {
            setSelectedDepartment(value);
            setUsers([]); // Сброс списка пользователей при выборе нового отдела
          }}
        >
          {departments.map((dep) => (
            <Option key={dep.id} value={dep.id}>
              {dep.department}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {selectedDepartment && (
        <Form.Item
          name="user"
          label="Пользователь"
          rules={[{ required: true, message: 'Выберите пользователя!' }]}
        >
          <Select
            placeholder="Выберите пользователя"
            onChange={(value) => setSelectedUser(value)}
          >
            {users.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.fullname}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Удалить пользователя
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DeleteUserForm;
