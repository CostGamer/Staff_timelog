import React from 'react';
import { ConfigProvider, Form, Input, Button, DatePicker, TimePicker, message } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import 'moment/locale/ru';
import moment from 'moment';
import { addTime } from '../api';

moment.locale('ru');

const AddTimeForm = () => {
  const onFinish = async (values) => {
    try {
      const payload = {
        time_in: values.time_in.format('HH:mm:ss'),
        time_out: values.time_out.format('HH:mm:ss'),
        date_set: values.date_set.format('YYYY-MM-DD'),
        overtime: values.overtime !== undefined ? Number(values.overtime) : undefined, // Оставляем undefined, если поле пустое
        comment: values.comment || '',
      };

      await addTime(Number(values.userId), payload);

      message.success('Время добавлено');
    } catch (error) {
      console.error('Ошибка при добавлении времени:', error);
      message.error('Ошибка при добавлении времени');
    }
  };

  return (
    <ConfigProvider locale={ruRU}>
      <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>
        <Form.Item
          name="userId"
          label="ID Пользователя"
          rules={[
            { required: true, message: 'Добавьте ID!' },
            { type: 'number', transform: value => Number(value), message: 'ID должен быть цифрой!' }
          ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="date_set"
          label="Дата"
          rules={[{ required: true, message: 'Выберите дату!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="time_in"
          label="Время прихода"
          rules={[{ required: true, message: 'Добавьте время прихода!' }]}
        >
          <TimePicker format="HH:mm:ss" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="time_out"
          label="Время ухода"
          rules={[{ required: true, message: 'Добавьте время ухода!' }]}
        >
          <TimePicker format="HH:mm:ss" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="overtime"
          label="Сверхурочные"
          rules={[
            { required: true, message: 'Пожалуйста, введите количество сверхурочных!' },
            { type: 'number', transform: value => Number(value), message: 'Сверхурочные должны быть числом!' }
          ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="comment"
          label="Комментарий"
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Добавить время
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default AddTimeForm;
