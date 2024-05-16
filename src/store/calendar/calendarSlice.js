import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const temporalEvent = {
//     _id: new Date().getTime(),
//     title: 'Bienvenidos a CalendarApp',
//     notes: 'NOTA BLOQUEADA',
//     start: new Date(),
//     end: addHours( new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//         _id: '1234',
//         name: 'Sebastian'
//     }
// }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [],
        isLoadingEvents: true,
        activeEvent: null
    },
    reducers: {

        onSetActiveEvent: ( state, { payload }) => {
            state.activeEvent = payload;
        },

        onAddNewEvent: ( state, { payload }) => {
            state.events.push( payload );
            state.activeEvent = null;
        },

        onUpdateEvent: ( state, { payload }) => {
            state.events = state.events.map( event => {
                if ( event.id === payload.id ) {
                    return payload;
                }

                return event;
            })
        },

        onDeleteEvent: ( state ) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter( event => event.id !== state.activeEvent.id );
                state.activeEvent = null;
            }
        },

        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;

            payload.forEach( event => {
                const exist = state.events.some( dbEvent => dbEvent.id === event.id );
                if( !exist ) {
                    state.events.push( event );
                }
            })
        },

        onLogoutCalendar: (state) => {
            state.events = [],
            state.isLoadingEvents = true,
            state.activeEvent = null
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions;