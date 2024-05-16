import { useAuthStore, useCalendarStore } from "../../hooks"

export const FabDelete = () => {

    const { startDeleteEvent, hasEventSelected, activeEvent } = useCalendarStore();


    const onClickDelete = () => {
        startDeleteEvent( activeEvent );
    }

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={ onClickDelete }
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"/>
        </button>
    )
}
