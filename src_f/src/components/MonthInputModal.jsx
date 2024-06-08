import React, { useState } from 'react';
import { Modal, DatePicker, Button, message, ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import { generateExcelMonth } from '../api';

moment.locale('ru');

const MonthInputModal = ({ show, onClose }) => {
  const [date, setDate] = useState(null);

  const handleDownload = async () => {
    if (!date) {
      message.error('Пожалуйста, выберите месяц и год');
      return;
    }

    const year = date.format('YYYY');
    const month = date.format('MM');

    try {
      const response = await generateExcelMonth(year, month);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `отчет_персонала_${year}-${month}.xlsx`);
      document.body.appendChild(link);
      link.click();

      message.success('Excel за месяц успешно сгенерирован и загружен');
      onClose();
    } catch (error) {
      message.error('Ошибка при генерации Excel за месяц');
      console.error(error);
    }
  };

  return (
    <ConfigProvider locale={ruRU}>
      <Modal
        title="Выберите месяц и год"
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
        <DatePicker
          picker="month"
          onChange={(value) => setDate(value)}
          style={{ width: '100%' }}
        />
      </Modal>
    </ConfigProvider>
  );
};

export default MonthInputModal;
