import InputForm from './InputForm';
import TasksPanel from './TasksPanel';
import '../styles/App.css';
import { useState } from 'react';
import UUID from './Uuid'
import Common from '../helpers/common';
import { useEffect } from 'react';
import { createContext } from 'react';

export const TaskFunctions = createContext(null)

export default function App() {
  const [ tasks, setTasks ] = useState([])
  const URL = 'http://localhost:9000/'

  useEffect(() => {
    if (tasks.length !== 0) Common.fetchPost(URL, tasks)
  }, [tasks])

  useEffect(() => {
    Common.fetchGet(URL).then((data) => setTasks(data))
  }, [])

  /**
   * Создает новое задание и добавляет его в массив заданий
   * @param {string} text - текст задания 
   * @param {string} completionDateTime - крайний срок выполнения задания 
   * @param {string} priority - приоритет
   * @param {string} category - категория
   */
  const addTask = (text, completionDateTime, priority, category) => {
    if (text === '') return

    /**
     * Рассчитывает текущее время
     * @returns {string} строка по аналогии с datetime-local
     */
    const getCreationDate = () => {
      const dt = {
        y: new Date().getFullYear(),
        mo: Common.addLeadingZero(new Date().getMonth() + 1),
        d: Common.addLeadingZero(new Date().getDate()),
        h: Common.addLeadingZero(new Date().getHours()),
        mi: Common.addLeadingZero(new Date().getMinutes())
      }

      return `${dt.y}-${dt.mo}-${dt.d}T${dt.h}:${dt.mi}`
    }

    const task = {
      id: UUID.generate(),
      creationDateTime: getCreationDate(),
      completed: false,
      completionDateTime,
      category,
      priority,
      text,
      result: '',
    }

    setTasks([...tasks, task])
  }

  const writeResult = (id) => {
    const index = tasks.findIndex((task) => task.id === id)

    tasks[index].result = prompt('Please write result of completed task')

    setTasks([...tasks])
  }
  
  /**
   * Переключает состояние задачи по двойному клику и клику на кнопке "Завершить"
   * @param {number} id - номер задачи 
   */
  const toggleCompletion = (id) => {
    const index = tasks.findIndex((task) => task.id === id)

    tasks[index].completed = !tasks[index].completed

    setTasks([...tasks])
  }

  /**
   * Удаляет задачу по клику на кнопке "Удалить"
   * @param {number} id - номер задачи 
   */
  const deleteTask = async (id) => {
    const deltasks = tasks.filter((task) => task.id !== id)

    setTasks(deltasks)

    Common.fetchPost('http://localhost:9000/', deltasks)
  }


  const taskFunctions = {
    addTask, writeResult, toggleCompletion, deleteTask
  }

  return (
    <div className="App">
      <InputForm addTask={addTask}/>
      <TaskFunctions.Provider value={taskFunctions}>
        <TasksPanel tasks={tasks} />
      </TaskFunctions.Provider>
    </div>
  );
}


