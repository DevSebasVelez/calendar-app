import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from "../store";
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );


    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }


    const startSavingEvent = async( calendarEvent ) => {

        try {
            if( calendarEvent.id ) {

                await calendarApi.put( `/events/${calendarEvent.id}`, calendarEvent );
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;

            }

            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );

        } catch (error) {
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
            console.log(error)
        }

    }


    const startDeleteEvent = async( calendarEvent ) => {

        try {

            await calendarApi.delete(`/events/${calendarEvent.id}`);
            dispatch( onDeleteEvent() );

        } catch (error) {
            Swal.fire('Error al eliminar evento', error.response.data.msg, 'error')
            console.log(error)
        }

    }


    const startLoadingEvents = async() => {

        try {

            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.events );
            dispatch( onLoadEvents( events ) )


        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)
        }
    }


    return {
        //*Properties
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //*Methods
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents
    }
}