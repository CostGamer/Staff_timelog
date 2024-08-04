import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AddUserForm = ({ refreshStaffList, departments, isVisible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Используем объект формы для управления состоянием

  useEffect(() => {
    if (!isVisible) {
      form.resetFields(); // Сброс полей формы при закрытии модального окна
    }
  }, [isVisible, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const staff = await axios.get(`http://localhost:3000/gs/?department_id=${values.department}`); // Измените URL здесь

      const userExists = staff.data.some(
        (member) =>
          member.name === values.name && member.surname === values.surname
      );

      if (userExists) {
        message.error('Пользователь уже существует');
        setLoading(false);
        return;
      }

      await axios.post(`http://localhost:3000/add/?id=${values.department}`, {
        name: values.name,
        surname: values.surname,
        fathername: values.fathername,
        bid: values.bid,
      });

      message.success('Пользователь добавлен');

      // Проверка наличия функции refreshStaffList перед вызовом
      if (typeof refreshStaffList === 'function') {
        refreshStaffList();
      }

      form.resetFields(); // Сброс полей формы

    } catch (error) {
      console.error('Ошибка при добавлении пользователя:', error);
      message.error('Ошибка при добавлении пользователя');
    } finally {
      setLoading(false);
    }
  };

  const buttonStyle = {
    backgroundColor: '#8E0612', // Цвет кнопки
    borderColor: '#8E0612', // Цвет границы кнопки
    color: '#fff', // Цвет текста кнопки
    outline: 'none', // Убираем контур фокуса
    boxShadow: 'none', // Убираем тень активации
    WebkitTapHighlightColor: 'transparent', // Убирает цвет подсветки на мобильных устройствах
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 400 }}
    >
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
      <Form.Item
        name="fathername"
        label="Отчество"
        rules={[{ required: true, message: 'Напишите отчество!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="department"
        label="Отдел"
        rules={[{ required: true, message: 'Выберите отдел!' }]}
      >
        <Select>
          {departments.map((dep) => (
            <Option key={dep.id} value={dep.id}>
              {dep.department}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="bid"
        label="bid"
        rules={[{ required: true, message: 'Выберите bid!' }]}
      >
        <Select>
          {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((value) => (
            <Option key={value} value={value}>
              {value}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={buttonStyle}
        >
          Добавить пользователя
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;
