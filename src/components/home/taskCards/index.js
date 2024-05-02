import React, { useState } from 'react';
import { Card, Select } from 'antd';
import { DeleteOutlined, EditFilled, SaveFilled } from '@ant-design/icons';

const TaskCard = ({task, updateTask, deleteTask}) => {
    const [editing, setEditing] = useState(true);
    const [updatedStatus, setUpdateStatus] = useState(true);

    const handleDeleteTask = (id) => {
        deleteTask(id);
    }

    const handleUpdate = () => {
        updateTask(task.id, updatedStatus);
        setEditing(true);
    };

    return (
            <Card key={task.id} style={{ width: 300, marginTop: '1%' }}>
                <p>Title: {task.title}</p>
                <>
                {editing? 
                    <p>Status: {task.status}</p> :
                    <Select style={{ width: '100%'}} value={updatedStatus || task.status} onChange={(value) =>  setUpdateStatus(value)}>
                      <Select.Option value="to-do">To-Do</Select.Option>
                      <Select.Option value="in-progress">In-Progress</Select.Option>
                      <Select.Option value="done">Done</Select.Option>
                    </Select>
                } 
                </>
                <p>Description: {task.description}</p>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {editing ? <button onClick={() => setEditing(false)}><EditFilled /></button> :  <button onClick={() => handleUpdate(task.id)}><SaveFilled /></button>}
                    <button onClick={() => handleDeleteTask(task.id)}><DeleteOutlined /></button>
                </div>
            </Card>
    )
};

export default TaskCard;