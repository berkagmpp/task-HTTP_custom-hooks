import useHttp from '../../hooks/use-http';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
    const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

    const creatTask = (taskText, taskData) => {
        const generatedId = taskData.name; // firebase-specific => "name" contains generated id
        const createdTask = { id: generatedId, text: taskText };
        props.onAddTask(createdTask);
    };

    const enterTaskHandler = async (taskText) => {      // does't need useEffect() or useCallback() because only calling sendTaskRequest() in this fn
        sendTaskRequest(
            {
                url: 'https://react-http-custom-hook-ae7a6-default-rtdb.firebaseio.com/tasks.json',
                method: 'POST',
                body: { text: taskText },
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            creatTask.bind(null, taskText)
        );
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;
