// // src/AddUserForm.jsx

// import React from 'react';
// import { Form, Input, Button, message } from 'antd';
// import { addStaff, fetchStaff } from './api';

// const AddUserForm = ({ refreshStaffList }) => {
//   const onFinish = async (values) => {
//     try {
//       const staff = await fetchStaff();

//       // Check if user already exists
//       const userExists = staff.some(
//         (member) =>
//           member.name === values.name && member.surname === values.surname
//       );

//       if (userExists) {
//         message.error('User already exists');
//         return;
//       }

//       // Add new user
//       await addStaff({
//         name: values.name,
//         surname: values.surname,
//       });

//       message.success('User added successfully');
//       refreshStaffList(); // Refresh the staff list after adding a new user
//     } catch (error) {
//       message.error('Error adding user');
//     }
//   };

//   return (
//     <Form
//       layout="vertical"
//       onFinish={onFinish}
//       style={{ maxWidth: 400 }}
//     >
//       <Form.Item
//         name="name"
//         label="Name"
//         rules={[{ required: true, message: 'Please input the name!' }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         name="surname"
//         label="Surname"
//         rules={[{ required: true, message: 'Please input the surname!' }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Add User
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default AddUserForm;


import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { addStaff, fetchStaff } from '../api';

const AddUserForm = ({ refreshStaffList }) => {
  const onFinish = async (values) => {
    try {
      const staff = await fetchStaff();

      const userExists = staff.some(
        (member) =>
          member.name === values.name && member.surname === values.surname
      );

      if (userExists) {
        message.error('User already exists');
        return;
      }

      await addStaff({
        name: values.name,
        surname: values.surname,
      });

      message.success('User added successfully');
      refreshStaffList();
    } catch (error) {
      message.error('Error adding user');
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="surname"
        label="Surname"
        rules={[{ required: true, message: 'Please input the surname!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;
