import React, { useRef, useState } from 'react';
import Calendar, { CalendarRef } from './Calendar';

const InternalCalendar = React.forwardRef(Calendar)

function App() {
  const calendarRef = useRef<CalendarRef>(null)
  const [date, setDate] = useState(new Date())

  return <div>
    {/* 受控模式 */}
    <InternalCalendar ref={calendarRef} value={date} onChange={(date: Date) => {
      console.log(date.toLocaleDateString())
      setDate(date)
    }} />

    {/* 非受控模式 */}
    {/* <InternalCalendar ref={calendarRef} defaultValue={new Date('2024-8-15')} onChange={(date: Date) => {
      alert(date.toLocaleDateString())
    }} /> */}
  </div>
}

export default App;
