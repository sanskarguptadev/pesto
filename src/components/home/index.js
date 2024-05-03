import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

import CreateTask from './createTask';
import { Button } from 'antd';
import TaskCard from './taskCards';

function convertToDesiredFormat(data) {
    const result = [];
    for (const [id, task] of Object.entries(data)) {
        const formattedTask = {
            id: id,
            description: task.description,
            status: task.status,
            title: task.title
        };
        result.push(formattedTask);
    }
    return result;
}

const Home = () => {
    const [addNew, setAddNew] = useState(true);
    const [filter, setFilter] = useState('all');
    const [todo, setTodo] = useState([]);
    const [progress, setProgress] = useState([]);
    const [done, setDone] = useState([]);
    const [all, setAll] = useState([]);

    useEffect(() => {    
        fetchData();
    }, []);

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

    const addNewTaskFirebase = (value) => {
        const res = fetch(`https://pesto-6986e-default-rtdb.firebaseio.com/${currentUser.uid}/tasks.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        })

        if(res) {
            alert('New Task Added!');
        }
    }

    const fetchData = async () => {
        try {
          const response = await fetch(`https://pesto-6986e-default-rtdb.firebaseio.com/${currentUser.uid}/tasks.json`);
          const jsonData = await response.json();
          const data = jsonData !== null ? convertToDesiredFormat(jsonData): [];
          setAll(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const addNewTask = (value, close) => {
        addNewTaskFirebase(value);
        setAddNew(close);
        fetchData();
    };

    const deleteTask = async(id) => {
        try {
            await fetch(`https://pesto-6986e-default-rtdb.firebaseio.com/${currentUser.uid}/tasks/${id}.json`, {
                method: "DELETE",
            });
            fetchData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        fetchData();
    };

    const updateTask = async (id ,value) => {
         try {
            await fetch(`https://pesto-6986e-default-rtdb.firebaseio.com/${currentUser.uid}/tasks/${id}.json`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
            fetchData();
          } catch (error) {
            console.error('Error fetching data:', error);
          }
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
                {all.length > 0 && getData(filter).map((card) => {
                    return <TaskCard key={card.id} updateTask={updateTask} task={card} deleteTask={deleteTask} />
                })}
            </div>
        </div>
    )
}

export default Home