import React, { useState } from 'react';
import { Button, Modal, Select, DatePicker, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const DownloadMonthlyReport = ({ isVisible, onClose, departments }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <Modal
      title="Скачать отчет за месяц"
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
          picker="month"
          onChange={(date) => setSelectedDate(date)}
          style={{ width: '100%', marginBottom: '20px' }}
          format="MMMM YYYY" // Optional: To display month and year format
        />
        <Button
          type="primary"
          onClick={downloadFile}
          loading={loading}
          style={{ width: '100%' }}
        >
          Получить файл за месяц
        </Button>
      </div>
    </Modal>
  );
};

export default DownloadMonthlyReport;
