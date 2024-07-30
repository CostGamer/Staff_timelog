import React, { useState } from 'react';
import ActionButtons from './components/ActionButtons';
import 'antd/dist/reset.css';
import './index.css';
import backgroundImage from './77da4af49f74.jpg'; // Импортируем изображение

const App = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddTime, setShowAddTime] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);
  const [showMonthInput, setShowMonthInput] = useState(false);
  const [showUpdateTime, setShowUpdateTime] = useState(false);

  return (
    <div
      className="container mx-auto flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // Адаптируем изображение к размеру экрана
        backgroundRepeat: 'no-repeat', // Предотвращаем повторение изображения
        backgroundPosition: 'center', // Центрируем изображение
        overflow: 'hidden', // Отключаем прокрутку страницы
      }}
    >
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Белый полупрозрачный фон
        borderRadius: '0em', // Скругленные углы
        padding: '0em', // Отступы вокруг кнопок
        marginTop: '0em', // Отступ сверху
        marginRight: '0em', // Отступ справа
        marginBottom: '0em', // Отступ снизу
        marginLeft: '0em', // Отступ слева
      }}>
        <ActionButtons
          setShowAddUser={setShowAddUser}
          setShowAddTime={setShowAddTime}
          setShowUserList={setShowUserList}
          setShowDateInput={setShowDateInput}
          setShowMonthInput={setShowMonthInput}
          setShowUpdateTime={setShowUpdateTime}
        />
        {showAddUser && <div>Добавить пользователя</div>}
        {showAddTime && <div>Указать время</div>}
        {showUserList && <div>Список пользователей</div>}
        {showDateInput && <div>Получить excel за день</div>}
        {showMonthInput && <div>Получить excel за месяц</div>}
        {showUpdateTime && <div>Исправить время</div>}
      </div>
    </div>
  );
};

export default App;
