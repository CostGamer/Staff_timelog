import React from 'react';
import { Form, Input, Button, DatePicker, TimePicker, message, ConfigProvider } from 'antd';
import { updateTime } from '../api';
import locale from 'antd/es/locale/ru_RU';
import 'moment/locale/ru';

const UpdateTimeForm = () => {
  const onFinish = async (values) => {
    try {
      const payload = {
        time_in: values.time_in.format('HH:mm:ss'),
        time_out: values.time_out.format('HH:mm:ss'),
        date_set: values.date_set.format('YYYY-MM-DD'),
        overtime: values.overtime ? Number(values.overtime) : 0,
        comment: values.comment || '',
      };

      await updateTime(Number(values.userId), payload);

      message.success('Время успешно обновлено');
    } catch (error) {
      console.error('Ошибка обновления времени:', error);
      message.error('Ошибка обновления времени');
    }
  };

  const formItemStyle = {
    width: '100%',
  };

  return (
    <ConfigProvider locale={locale}>
      <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>
        <Form.Item
          name="userId"
          label="ID Пользователя"
          rules={[
            { required: true, message: 'Пожалуйста, введите ID пользователя!' },
            { type: 'number', transform: value => Number(value), message: 'ID пользователя должен быть числом!' },
          ]}
          style={formItemStyle}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date_set"
          label="Дата"
          rules={[{ required: true, message: 'Пожалуйста, выберите дату!' }]}
          style={formItemStyle}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="time_in"
          label="Время Начала"
          rules={[{ required: true, message: 'Пожалуйста, выберите время начала!' }]}
          style={formItemStyle}
        >
          <TimePicker format="HH:mm:ss" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="time_out"
          label="Время Окончания"
          rules={[{ required: true, message: 'Пожалуйста, выберите время окончания!' }]}
          style={formItemStyle}
        >
          <TimePicker format="HH:mm:ss" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="overtime"
          label="Сверхурочные"
          rules={[
            { required: true, message: 'Пожалуйста, введите количество сверхурочных!' },
            { type: 'number', transform: value => Number(value), message: 'Сверхурочные должны быть числом!' },
          ]}
          style={formItemStyle}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="comment"
          label="Комментарий"
          style={formItemStyle}
        >
          <Input />
        </Form.Item>
        <Form.Item style={formItemStyle}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Обновить Время
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default UpdateTimeForm;
