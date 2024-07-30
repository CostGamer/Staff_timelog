import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Typography, Card } from 'antd';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/gd/');
        setDepartments(response.data);
      } catch (error) {
        console.error('Ошибка при получении списка отделов:', error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div style={{ height: '50vh', overflow: 'auto', padding: '20px' }}>
      <List
        dataSource={departments}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{
                width: '100%',
                margin: '1px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#8E0612',
              }}
              bodyStyle={{ padding: '3px' }}
            >
              <Typography.Text style={{ fontSize: '18px', color: '#fff', textAlign: 'center', width: '100%' }}>
                {item.department}
              </Typography.Text>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default DepartmentList;
