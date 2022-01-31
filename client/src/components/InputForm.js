import { useState } from "react"
import '../styles/InputForm.css'

/**
 * рендерит форму с полями ввода для создания задач
 */
export default function InputForm({ addTask }) {
  const [ userInput, setUserInput ] = useState('')
  const [ priority, setPriority ] = useState('')
  const [ completionDateTime, setDateTime ] = useState('')
  const [ categorySelected, setCategorySelected ] = useState('usual task')

  const prioritiesTitles = ['high', 'usual', 'low']
  

  const categories = [
    'question',
    'answer',
    'wikipedia',
    'usual task'
  ]

  /**
   * Удаляет выделение уровня важности
   */
  const removeSelectedPriority = () => {
    document
      .querySelectorAll('.priority-level')
      .forEach((level) => {
        level.classList.remove('selected-priority-level')
      })
  }

  /**
   * Устанавливает важность задачи
   * @param {event} event - событие, которое происходит на целевом элементе 
   */
  const choosePriority = (event) => {
    removeSelectedPriority()
    
    event.target.classList.add('selected-priority-level')

    setPriority(event.target.getAttribute('data-value'))
  }

  const clearInput = () => {
    setUserInput('')
    removeSelectedPriority()
    setPriority('')
    setDateTime('')
    setCategorySelected('usual task')
  }

  const handleAddTask = (event) => {
    event.preventDefault()

    addTask(userInput, completionDateTime, priority, categorySelected)
    clearInput()
  }
  
  return (
    <div className="InputForm">
      <form className="form-create-task">
        <textarea 
          rows="2"
          className="user-input"
          value={userInput} 
          placeholder="start your day with a task!" 
          onChange={(event) => setUserInput(event.target.value)}
        ></textarea>
        <select 
          className="categories"
          value={categorySelected}
          onChange={(event) => setCategorySelected(event.target.value)}
        >
          {categories.map((category, i) => (
            <option key={i} value={category}>{category}</option>
          ))}
        </select>
        <input 
          type="datetime-local" 
          className="datetime"
          value={completionDateTime} 
          onChange={(event) => setDateTime(event.target.value)}
        />
        <div className="priority">
          {prioritiesTitles.map((title, i) => {
            return (
              <div 
                className="priority-level" id={title} data-value={title} 
                onClick={choosePriority} key={i}
              ><span>{title}</span></div>
          )})}
        </div>
        <button 
          className="task-add" 
          onClick={handleAddTask}
        >add task</button>
      </form>
    </div>
  )  
}