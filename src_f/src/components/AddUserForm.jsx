import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { addStaff, fetchStaff } from '../api';

const AddUserForm = ({ refreshStaffList }) => {
  const onFinish = async (values) => {
    try {
      const staff = await fetchStaff();

      const userExists = staff.some(
        (member) =>
          member.name === values.name && member.surname === values.surname
      );

      if (userExists) {
        message.error('Пользователь уже существует');
        return;
      }

      await addStaff({
        name: values.name,
        surname: values.surname,
      });

      message.success('Пользователь добавлен');
      refreshStaffList();
    } catch (error) {
      message.error('Пользователь уже существует');
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>
      <Form.Item
        name="name"
        label="Имя"
        rules={[{ required: true, message: 'Напишите имя!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="surname"
        label="Фамилия"
        rules={[{ required: true, message: 'Напишите фамилию!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить пользователя
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;
