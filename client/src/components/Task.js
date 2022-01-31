import '../styles/Task.css'
import { months } from './storage/date'
import { useContext, useEffect } from 'react'
import Common from '../helpers/common.js'
import { TaskFunctions } from '../components/App'

/**
 * Создает карточку задания с текстом
 */
export default function Task({ task }) {
  const { 
    toggleCompletion, writeResult, deleteTask 
  } = useContext(TaskFunctions)

  const { text, category, completionDateTime } = task
  const taskDOM_ID = `tdi-${task.id}`
  
  useEffect(() => {
    const setPriority = (pr) => {
      document.querySelector(`#${taskDOM_ID}`).classList.add(pr)
    }

    setPriority(task.priority === '' ? 'priority-usual' : `priority-${task.priority}`)
    setTaskCompletion(findButtonComplete(`#${taskDOM_ID}`))
  })

  /**
   * Находит HMTL текущего задания
   * @param {string} id - DOM-селектор указанного задания  
   * @returns {object} HTML-элементы задания и кнопки "Complete"
   */
  const findButtonComplete = (id) => {
    const taskElement = document.querySelector(id)
    const buttonComplete = taskElement.querySelector('.button-complete')

    return { taskElement, buttonComplete }
  }

  /**
   * Toggle task completion status
   * @param {object} taskHTML - объект с HTML элементами задания
   */
  const setTaskCompletion = ({ taskElement }) => {
    if (task.completed) {
      taskElement.classList.add('completed')
    } else {
      taskElement.classList.remove('completed')
    }
  }

  const handleCompletion = () => {
    setTaskCompletion(findButtonComplete(`#${taskDOM_ID}`))
    toggleCompletion(task.id)
    
    task.completed ? writeResult(task.id) : task.result = ''
  }

  const [ 
    year, 
    month, 
    day, 
    hour, 
    minute 
  ] = Common.parseDateTimeLocal(completionDateTime)

  const showResult = (text) => {
    return (<div className="result">{text}</div>)
  }

  /**
   * Shows how much time left before expirational date (years are not intended)
   * @returns JSX.Element
   */
  const showTimeLeft = () => {
    if (!completionDateTime) return

    const msdate = new Date(completionDateTime).getTime()
    const now = Date.now()

    const left = msdate - now
    
    const renderTime = (ms) => {
      const hours = Math.floor(ms / 1000 / 60 / 60)
      const days = Math.floor(ms / 1000 / 60 / 60 / 24)
      const months = Math.floor(ms / 1000 / 60 / 60 / 24 / 30.5)

      console.log('%chours', 'color: orange', hours)
      console.log('%cdays', 'color: orange', days)
      console.log('%cmonths', 'color: orange', months)

      if (days === 0 & hours > 0) return (
        <div className="time-left">{hours} hours left</div>
      )

      if (days < 0 && hours < 0) return (
        <div className="time-left">expired</div>
      )

      if (hours < 0) return (
        <div className="time-left">almost expired</div>
      )

      if (months > 0) return (
        <div className="time-left">{months} months left</div>
      )

      return (<div className="time-left">{days} days left</div>)
    }

    return renderTime(left)
  }

  return (
    <div id={taskDOM_ID} className="Task" onDoubleClick={handleCompletion}>
      <div className="text">{text}</div>
      
      <div className="bottom-block">
        {task.result && showResult(task.result)}
        <div className="category">{category}</div>
        {showTimeLeft()}
        {completionDateTime && (
          <div className="datetime-completion">
          <div className="datetime-completion-date">
            <div className="day">{day}</div>
            <div className="month">{Object.keys(months)[parseInt(month) - 1]}</div>
            <div className="year">{year.replace('20', '\'')}</div>
          </div>
          <div className="datetime-completion-time">
            <div className="hour">{hour}</div>
            <div className="divider">:</div>
            <div className="minutes">{minute}</div>
          </div>
        </div>
        )}
      </div>

      <div className="buttons">
        <button 
          className="button-delete" 
          onClick={() => deleteTask(task.id)}
        >+</button>
      </div>

    </div>
  )
}

/* 
const [ crYear, crMo, crDay, crHr, crMin ] = Common.parseDateTimeLocal(creationDateTime)
*/

/* 
<div className="datetime-creation">
  <div className="datetime-creation-date">
    <div className="title-creation">created :</div>
    <div className="day">{crDay}</div>
    <div className="month">{Object.keys(months)[parseInt(crMo) - 1]}</div>
    <div className="year">{crYear.replace('20', '\'')}</div>
  </div>
  <div className="datetime-creation-time">
    <div className="hour"> {crHr}</div>
    <div className="divider">:</div>
    <div className="minutes">{crMin}</div>
  </div>
</div>
*/

/* 
        <div className="category">
          <img src={categoryIcon} alt={category}></img>
        </div>
*/