import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Typography,
} from 'antd';

const { Title } = Typography;

const CreateTask = (props) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState("to-do");
  const [description, setDescription] = useState('');

  const generateRandomId = () => {
    return '_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  const handleSubmitForm = () => {
    props.addNewTask({
        id: generateRandomId(),
        title: name,
        status, 
        description
    }, true);
    setName('');
    setStatus('');
    setDescription('');
  };

  return (
    <Form
      style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        border: '1px solid black',
        borderRadius: 10,
      }}
    >
      <Title level={3}>Add New Task</Title>
      <Form.Item label="Task Name">
        <Input value={name} onChange={e => setName(e.target.value)} />
      </Form.Item>
      <Form.Item label="Status">
        <Select value={status} onChange={value => setStatus(value)}>
          <Select.Option value="to-do">To-Do</Select.Option>
          <Select.Option value="in-progress">In-Progress</Select.Option>
          <Select.Option value="done">Done</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Description">
        <Input value={description} onChange={e => setDescription(e.target.value)} />
      </Form.Item>
      <Button type="primary" onClick={handleSubmitForm}>Create Task</Button>
    </Form>
  );
};
export default CreateTask;
