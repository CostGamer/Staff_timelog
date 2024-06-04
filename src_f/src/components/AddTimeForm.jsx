// import React from 'react';
// import { Form, Input, Button, DatePicker, TimePicker, message } from 'antd';
// import moment from 'moment';
// import { addTime } from '../api';

// const AddTimeForm = () => {
//     const onFinish = async (values) => {
//         try {
//             await addTime(values.userId, {
//                 time_in: values.time_in.utc().format(),
//                 time_out: values.time_out.utc().format(),
//                 date_set: values.date_set.format('YYYY-MM-DD'),
//                 overtime: values.overtime,
//                 comment: values.comment,
//             });

//             message.success('Time added successfully');
//         } catch (error) {
//             console.error('Error adding time:', error);
//             message.error('Error adding time');
//         }
//     };

//     return (
//         <Form
//             layout="vertical"
//             onFinish={onFinish}
//             style={{ maxWidth: 400 }}
//         >
//             <Form.Item
//                 name="userId"
//                 label="User ID"
//                 rules={[{ required: true, message: 'Please input the User ID!' }]}
//             >
//                 <Input />
//             </Form.Item>
//             <Form.Item
//                 name="date_set"
//                 label="Date"
//                 rules={[{ required: true, message: 'Please select a date!' }]}
//             >
//                 <DatePicker />
//             </Form.Item>
//             <Form.Item
//                 name="time_in"
//                 label="Time In"
//                 rules={[{ required: true, message: 'Please select a time in!' }]}
//             >
//                 <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
//             </Form.Item>
//             <Form.Item
//                 name="time_out"
//                 label="Time Out"
//                 rules={[{ required: true, message: 'Please select a time out!' }]}
//             >
//                 <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
//             </Form.Item>
//             <Form.Item
//                 name="overtime"
//                 label="Overtime"
//                 rules={[{ required: true, message: 'Please input the overtime!' }]}
//             >
//                 <Input />
//             </Form.Item>
//             <Form.Item
//                 name="comment"
//                 label="Comment"
//             >
//                 <Input />
//             </Form.Item>
//             <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                     Add Time
//                 </Button>
//             </Form.Item>
//         </Form>
//     );
// };

// export default AddTimeForm;


import React from 'react';
import { Form, Input, Button, DatePicker, TimePicker, message } from 'antd';
import moment from 'moment';
import { addTime } from '../api';

const AddTimeForm = () => {
  const onFinish = async (values) => {
    try {
      await addTime(values.userId, {
        time_in: values.time_in.utc().format(),
        time_out: values.time_out.utc().format(),
        date_set: values.date_set.format('YYYY-MM-DD'),
        overtime: values.overtime,
        comment: values.comment,
      });

      message.success('Time added successfully');
    } catch (error) {
      console.error('Error adding time:', error);
      message.error('Error adding time');
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>
      <Form.Item
        name="userId"
        label="User ID"
        rules={[{ required: true, message: 'Please input the User ID!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="date_set"
        label="Date"
        rules={[{ required: true, message: 'Please select a date!' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="time_in"
        label="Time In"
        rules={[{ required: true, message: 'Please select a time in!' }]}
      >
        <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
      </Form.Item>
      <Form.Item
        name="time_out"
        label="Time Out"
        rules={[{ required: true, message: 'Please select a time out!' }]}
      >
        <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
      </Form.Item>
      <Form.Item
        name="overtime"
        label="Overtime"
        rules={[{ required: true, message: 'Please input the overtime!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="comment"
        label="Comment"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Time
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTimeForm;
