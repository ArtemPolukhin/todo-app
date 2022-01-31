import WeekDay from "./WeekDay"
import '../styles/TasksPanel.css'
import Common from "../helpers/common"
import { useState } from "react";

/**
 * Содержит в себе карточки с задачами
 */
export default function TasksPanel({ tasks }) {
  const actions = {
    all: 'ALL',
    active: 'ACTIVE',
    completed: 'COMPLETED'
  }
  
  const [ paneltab, setPaneltab ] = useState(actions.all)
  
  const creationDatesAll = tasks.map(({ creationDateTime }) => {
    const [yyyy, mm, dd] = Common.parseDateTimeLocal(creationDateTime)

    return `${yyyy}-${mm}-${dd}`
  })

  /**
   * Defines which tasks should be rendered
   * @param {string} tab - selected tab (completed, active or all)
   */
  const renderTasksByTab = (tab) => {
    const uniqueDates = Array.from(new Set(creationDatesAll).values())
    const completedTasks = tasks.filter((task) => task.completed)
    const activeTasks = tasks.filter((task) => !task.completed)

    /**
     * Renders tasks divided by tab conditions
     * @param {any[]} tasksTyped - tasks array depending on selected tab
     * @returns array of JSXElements WeekDay
     */
    const renderTasks = (tasksTyped) => {
      console.log('[renderTasks]');
      if (tasksTyped.length === 0 && tab === actions.all) 
          return (<div className="empty-tasks">No tasks</div>)

      if (tasksTyped.length === 0 
          && (tab === actions.active || tab === actions.completed)) 
          return (<div className="empty-tasks">No {tab.toLocaleLowerCase()} tasks</div>)

      const uniqueDatesByTab = uniqueDates.filter((ud) => {
        
        const filtered = tasksTyped.filter(({ creationDateTime }) => {
          return ud === creationDateTime.slice(0, 10)
        })

        return filtered.length !== 0
      })

      return uniqueDatesByTab.reverse().map((uniquedate, index) => {
        return (<WeekDay 
          uniqueDate={uniquedate} 
          tasksTyped={tasksTyped} 
          key={index}
        />)
      })
    }

    switch(tab) {
      case actions.all:
        return renderTasks(tasks)
      case actions.active:
        return renderTasks(activeTasks)
      case actions.completed:
        return renderTasks(completedTasks)
    }
  }

  /**
   * Remove selected class from all tabs
   */
  const removePanelTabSelection = () => {
    document
      .querySelectorAll('.panel-tab > *')
      .forEach((tab) => {
        tab.classList.remove('panel-tab-selected')
      })
  }

  /**
   * Set selected class to currently clicked tab and changes state
   * @param {any} event - SyntheticBaseEvent
   */
  const choosePaneltab = (event) => {
    removePanelTabSelection()

    event.target.classList.add('panel-tab-selected')

    setPaneltab(event.target.getAttribute('data-value'))
  }

  return (
    <div className="TasksPanel">
      <nav className="panel-tab">
        <div 
          className="panel-tab-all panel-tab-selected"
          data-value={actions.all}
          onClick={choosePaneltab}>
          <span>{actions.all}</span>
        </div>
        <div 
          className="panel-tab-active"
          data-value={actions.active}
          onClick={choosePaneltab}>
          <span>{actions.active}</span>
        </div>
        <div 
          className="panel-tab-completed"
          data-value={actions.completed}
          onClick={choosePaneltab}>
          <span>{actions.completed}</span>
          </div>
      </nav>
      {renderTasksByTab(paneltab)}
    </div>
  )
}