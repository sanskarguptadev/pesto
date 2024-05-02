import React, { useState } from 'react'
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CreateTask from './createTask';
import { Button } from 'antd';
import TaskCard from './taskCards';

const Home = () => {
    const [addNew, setAddNew] = useState(true);
    const [filter, setFilter] = useState('all');
    const [todo, setTodo] = useState([]);
    const [progress, setProgress] = useState([]);
    const [done, setDone] = useState([]);
    const [all, setAll] = useState([]);

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser === undefined) {
          navigate('/login');
        }
    }, [currentUser, navigate]);
    
    const handleShowForm = () => {
        setAddNew(!addNew);
    }

    const addNewTask = (value, close) => {
        setAll([...all, value]);
        setAddNew(close);
    };

    const deleteTask = (id) => {
        const filteredData = all.filter(card => card?.id !== id);
        setAll(filteredData);
    };

    const updateTask = (id, value) => {
        const repData = [...all];
        const updateData = repData.map((data) => {
            if(data.id === id) {
                data.status = value;
            };
            return data;
        })
        setAll(updateData);
    }

    const handleFilter = value => {
        if (value === 'to-do') {
            const filteredData = all.filter(card => card.status === value)
            setTodo(filteredData);
        } else if (value === 'in-progress') {
            const filteredData = all.filter(card => card.status === value)
            setProgress(filteredData);
        } else if (value === 'done') {
            const filteredData = all.filter(card => card.status === value)
            setDone(filteredData);
        }
        setFilter(value);
    };

    const getData = (value) => {
        if (value === 'to-do') {
            return todo;
        } else if (value === 'in-progress') {
            return progress;
        } else if (value === 'done') {
            return done;
        } else {
            return all;
        }
    };

    console.log(all);
    return (
        <div className='text-2xl font-bold pt-14'>
            <p>
                {currentUser ? `Hello ${currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.`: null}
            </p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Button onClick={() => handleShowForm()}>{ addNew ? 'Add New Task': 'Close' }</Button>
                {!addNew && <CreateTask addNewTask={addNewTask} />}
                <div style={{ display: 'flex', marginTop: '2%' }}>
                    <Button onClick={() => handleFilter('all')}>All</Button>
                    <Button onClick={() => handleFilter('to-do')}>ToDo</Button>
                    <Button onClick={() => handleFilter('in-progress')}>Progress</Button>
                    <Button onClick={() => handleFilter('done')}>Done!</Button>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                {getData(filter).map((card) => {
                    return <TaskCard key={card.id} updateTask={updateTask} task={card} deleteTask={deleteTask} />
                })}
            </div>
        </div>
    )
}

export default Home