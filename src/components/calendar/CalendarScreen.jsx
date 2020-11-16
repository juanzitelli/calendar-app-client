import moment from 'moment'
import 'moment/locale/es'
import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useDispatch, useSelector } from 'react-redux'
import { eventClearActiveEvent, eventSetActive, eventsStartLoading } from '../../actions/events'
import { uiOpenModalAction } from '../../actions/ui'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'
import { Navbar } from '../ui/Navbar'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'


moment.locale('en');
const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {

	const dispatch = useDispatch();

	const { events, activeEvent } = useSelector(state => state.calendar)

	const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month');

	const { uid: userId } = useSelector(state => state.auth)

	const onDoubleClickEventHandler = (e) => {
		dispatch(uiOpenModalAction())
	}
	const onSelectEventHandler = (e) => {
		dispatch(eventSetActive(e))
	}

	const onViewChangeEventHandler = (clickedView) => {
		setlastView(clickedView)
		localStorage.setItem('lastView', clickedView)
	}

	const eventStyleGetter = (event) => {

		const style = {
			backgroundColor: (event.user._id === userId) ? "#367cf7" : "#465660",
			opacity: 0.8,
			display: 'block',
			color: 'white',
		}
		return { style }
	}
	const onSelectSlot = () => {
		dispatch(eventClearActiveEvent())
	}

	useEffect(() => {
		dispatch(eventsStartLoading())
	}, [dispatch])

	return (
		<div className="calendar-screen">
			<Navbar />
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				eventPropGetter={eventStyleGetter}
				components={{ event: CalendarEvent }}
				onDoubleClickEvent={onDoubleClickEventHandler}
				onSelectEvent={onSelectEventHandler}
				onView={onViewChangeEventHandler}
				view={lastView}
				selectable={true}
				onSelectSlot={onSelectSlot}
			/>

			<AddNewFab />
			{activeEvent && <DeleteEventFab />}


			<CalendarModal />

		</div>
	)
}
