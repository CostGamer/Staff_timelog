import React, { useState, useEffect } from 'react';
import { Form, Select, Button, message, TimePicker, DatePicker, Input, Radio } from 'antd';
import axios from 'axios';

const { Option } = Select;

const SetTimeForm = ({ departments }) => {
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hasOvertimeOrder, setHasOvertimeOrder] = useState(null);

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

  const onFinish = async (values) => {
    setLoading(true);

    const timeData = {
      time_in: values.time_in.format('HH:mm:ss'),
      time_out: values.time_out.format('HH:mm:ss'),
      date_set: values.date_set.format('YYYY-MM-DD'),
      overtime: hasOvertimeOrder === 'yes' ? values.overtime : 0,
      comment: values.comment || '',
    };

    const url = `http://localhost:3000/update_time/?id=${selectedUser}`;

    try {
      console.log('Sending request to URL:', url);
      console.log('Request data:', timeData);

      console.log('Selected User:', selectedUser);

      const response = await axios.put(url, timeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response data:', response.data);

      message.success('Время успешно установлено');
    } catch (error) {
      console.error('Ошибка при установке времени:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      message.error('Ошибка при установке времени');
    } finally {
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
      {selectedUser && (
        <>
          <Form.Item
            name="time_in"
            label="Время входа"
            rules={[{ required: true, message: 'Выберите время входа!' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="time_out"
            label="Время выхода"
            rules={[{ required: true, message: 'Выберите время выхода!' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="date_set"
            label="Дата установки"
            rules={[{ required: true, message: 'Выберите дату установки!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="hasOvertimeOrder"
            label="У вас есть приказ на сверхурочные?"
            rules={[{ required: true, message: 'Пожалуйста, выберите вариант' }]}
          >
            <Radio.Group onChange={(e) => setHasOvertimeOrder(e.target.value)}>
              <Radio value="yes">Да</Radio>
              <Radio value="no">Нет</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="overtime"
            label="Сверхурочные"
            initialValue={0}
          >
            <Input 
              type="number" 
              min={0} 
              disabled={hasOvertimeOrder !== 'yes'}
            />
          </Form.Item>
          <Form.Item name="comment" label="Комментарий">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Установить время
            </Button>
          </Form.Item>
        </>
      )}
    </Form>
  );
};

export default SetTimeForm;
