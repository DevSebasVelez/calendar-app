import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours} from "date-fns";

import { CalendarEvent, CalendarModal, NavBar } from "../index"

import { localizer, getMessagesES } from '../../helpers';


const events = [{
  title: 'Cumpleanos Jefe',
  notes: 'Hay que festejar',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '12345',
    name: 'Sebastian'
  }
}]


export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    console.log(event)
  }

  const onSelect = (event) => {
    console.log(event)
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
    setLastView( event )
  }

  return (
    <>
      <NavBar/>

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal/>

    </>
  )
}