import React, { useState, useEffect } from 'react';
import { Button, Modal, Select, DatePicker, message, ConfigProvider } from 'antd';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';
import locale from 'antd/es/locale/ru_RU';

const { Option } = Select;

const DownloadDailyReport = ({ isVisible, onClose, departments }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [fileDate, setFileDate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    moment.locale('ru');
  }, []);

  const downloadFile = async () => {
    if (!selectedDepartment || !fileDate) {
      message.error('Выберите отдел и дату');
      return;
    }

    setLoading(true);

    const day = fileDate.date();
    const month = fileDate.month() + 1; // months are 0-indexed
    const year = fileDate.year();

    const url = `http://localhost:3000/dayx/?department_id=${selectedDepartment}&day=${day}&month=${month}&year=${year}`;

    try {
      const response = await axios.get(url, {
        responseType: 'blob', // important for file download
      });

      // Create a link element, use it to download the file
      const link = document.createElement('a');
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      link.href = fileURL;
      link.setAttribute('download', `report_${day}_${month}_${year}.xlsx`);
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

  return (
    <ConfigProvider locale={locale}>
      <Modal
        title={<div className="centered-title">Скачать отчет за день</div>}
        visible={isVisible}
        onCancel={onClose}
        footer={null}
        centered
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Select
            placeholder="Выберите отдел"
            onChange={(value) => setSelectedDepartment(value)}
            style={{ width: '100%', marginBottom: '20px' }}
          >
            {departments.map((dep) => (
              <Option key={dep.id} value={dep.id}>
                {dep.department}
              </Option>
            ))}
          </Select>
          <DatePicker
            onChange={(date) => setFileDate(date)}
            style={{ width: '100%', marginBottom: '20px' }}
          />
          <Button
            type="primary"
            onClick={downloadFile}
            loading={loading}
            style={{ width: '100%' }}
          >
            Получить файл за день
          </Button>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default DownloadDailyReport;
