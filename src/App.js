import React, { useEffect, useState } from 'react';

import useHttp from './hooks/use-http';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
    const [tasks, setTasks] = useState([]);

    const transformTask = (tasksObj) => {
        const loadedTasks = [];

            for (const taskKey in tasksObj) {
                loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
            }

            setTasks(loadedTasks);
    };

    const { isLoading, error, sendRequest: fetchTasks } = useHttp({   // should call return obj of useHTTP / sendRequest is fn, so named differently: fetchTasks
        url: 'https://react-task-add-76dca-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
        // other requestConfig (method, body ...) are not needed because this request is 'GET',
        // and we set requestConfig obj is flexible if there are not existing other requestConfig in useHTTP using '?'
        transformTask
    });

    useEffect(() => {
        fetchTasks();
    }, []);     // React doesn't know fetchTasks fn, so should add a dependancy

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <React.Fragment>
            <NewTask onAddTask={taskAddHandler} />
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </React.Fragment>
    );
}

export default App;
