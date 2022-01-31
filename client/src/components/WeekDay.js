import { months } from './storage/date'
import Task from './Task'
import '../styles/Weekday.css'
import { dayOfWeek } from './storage/date'

export default function WeekDay({ uniqueDate, tasksTyped }) {

  const [ year, month, day ] = uniqueDate.split('-')

  const uniqueTasks = tasksTyped.filter(({ creationDateTime }) => {
    return uniqueDate === creationDateTime.slice(0, 10)
  })

  /**
   * Renders string 'Today' || 'Yesterday' deending on current day
   * @returns JSX.Element or empty string
   */
  const renderYesterdayToday = () => {
    /**
     * Pick day, month and year from Date object
     * @param {object} dateObject - any instance of object Date
     * @returns object with separated day, month and year
     */
    const getDate = (dateObject) => {
      return {
        day: dateObject.getDate(), 
        month: dateObject.getMonth(), 
        year: dateObject.getFullYear()
      }
    }

    const ud = getDate(new Date(uniqueDate))
    const ref = getDate(new Date())
    const isYearMonthEqual = (ud.year === ref.year && ud.month === ref.month)

    /**
     * Creates JSX.Element for adding today or yesterday 
     * @param {string} str - what will be rendered after matching with conditions
     * @returns JSX.Element
     */
    const getHTML = (str) => {
      return (<div className="weekday-today-yesterday">{str}</div>)
    }

    if (isYearMonthEqual && ud.day === ref.day) return getHTML('Today')
    if (isYearMonthEqual && ((ref.day - ud.day) === 1)) return getHTML('Yesterday')

    return ''
  }

  return (
    <div className="weekday">
      <div className="weekday-title">
        {renderYesterdayToday()}
        <div className="weekday-short">{dayOfWeek[new Date(uniqueDate).getDay()]}</div>
        <div className="weekday-day">{day}</div>
        <div className="weekday-months">{Object.keys(months)[parseInt(month) - 1]}</div>
        <div className="weekday-year">{year}</div>

      </div>

      {uniqueTasks.map((task, index) => {
        return (<Task key={task.id + index} task={task} />)
      })}

    </div>
 )   
}

