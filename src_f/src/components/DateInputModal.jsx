import React, { useState } from 'react';
import { Modal, DatePicker, Button, message, ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import { generateExcelDay } from '../api';

moment.locale('ru');

const DateInputModal = ({ show, onClose }) => {
  const [date, setDate] = useState(null);

  const handleDownload = async () => {
    if (!date) {
      message.error('Пожалуйста, выберите дату');
      return;
    }
    
    const formattedDate = date.format('YYYY-MM-DD');
    
    try {
      const response = await generateExcelDay(formattedDate);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `отчет_персонала_${formattedDate}.xlsx`);
      document.body.appendChild(link);
      link.click();

      message.success('Excel за день успешно сгенерирован и загружен');
      onClose();
    } catch (error) {
      message.error('Ошибка при генерации Excel за день');
      console.error(error);
    }
  };

  return (
    <ConfigProvider locale={ruRU}>
      <Modal
        title="Выберите дату"
        open={show}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Отмена
          </Button>,
          <Button key="download" type="primary" onClick={handleDownload}>
            Скачать
          </Button>,
        ]}
        centered
      >
        <DatePicker onChange={(value) => setDate(value)} />
      </Modal>
    </ConfigProvider>
  );
};

export default DateInputModal;
