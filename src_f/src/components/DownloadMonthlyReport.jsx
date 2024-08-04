import React, { useState, useEffect } from 'react';
import { Button, Modal, Select, DatePicker, message, ConfigProvider } from 'antd';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';
import locale from 'antd/es/locale/ru_RU';
import './styles2.css'; // Подключаем стили

const { Option } = Select;

const DownloadMonthlyReport = ({ isVisible, onClose, departments, buttonColor }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    moment.locale('ru'); // Установка локали для moment на русский язык
  }, []);

  // Функция для сброса состояния формы
  const resetForm = () => {
    setSelectedDepartment(null);
    setSelectedDate(null);
    onClose();
  };

  const downloadFile = async () => {
    if (!selectedDepartment || !selectedDate) {
      message.error('Выберите отдел и дату');
      return;
    }

    setLoading(true);

    const month = selectedDate.month() + 1; // months are 0-indexed
    const year = selectedDate.year();

    const url = `http://localhost:3000/monthx/?department_id=${selectedDepartment}&year=${year}&month=${month}`;

    try {
      const response = await axios.get(url, {
        responseType: 'blob', // important for file download
      });

      // Create a link element, use it to download the file
      const link = document.createElement('a');
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      link.href = fileURL;
      link.setAttribute('download', `report_${month}_${year}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      message.success('Файл успешно скачан');
    } catch (error) {
      console.error('Ошибка при скачивании файла:', error);
      message.error('Ошибка при скачивании файла');
    } finally {
      setLoading(false);
    }
  };

  const buttonStyle = {
    backgroundColor: buttonColor || '#8E0612', // Основной цвет кнопки
    borderColor: buttonColor || '#8E0612',
    color: '#fff',
    outline: 'none', // Убирает контур фокуса
    boxShadow: 'none', // Убирает тень активации
    WebkitTapHighlightColor: 'transparent', // Убирает цвет подсветки на мобильных устройствах
  };

  return (
    <ConfigProvider locale={locale}>
      <Modal
        title={<div className="centered-title">Скачать отчет за месяц</div>}
        visible={isVisible}
        onCancel={resetForm} // Сброс состояния при закрытии модального окна
        footer={null}
        centered
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Select
            className="custom-select" // Применяем кастомные стили для Select
            placeholder="Выберите отдел"
            value={selectedDepartment}
            style={{ marginBottom: '20px', width: '100%' }}
            onChange={(value) => setSelectedDepartment(value)}
          >
            {departments.map((dep) => (
              <Option key={dep.id} value={dep.id}>
                {dep.department}
              </Option>
            ))}
          </Select>
          <DatePicker
            picker="month"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            style={{ marginBottom: '20px', width: '100%' }}
            format="MMMM YYYY" // Формат отображения месяца и года
            placeholder="Выберите месяц" // Текст по умолчанию в поле ввода
          />
          <Button
            type="primary"
            onClick={downloadFile}
            loading={loading}
            style={{ width: '100%', ...buttonStyle }}
          >
            Получить файл за месяц
          </Button>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default DownloadMonthlyReport;
