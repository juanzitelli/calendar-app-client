import React from 'react'

export const CalendarEvent = ({ event }) => {
	const { title, user } = event;

	return (
		<div>
			<span>{title} <strong>- {user.name}</strong></span>
		</div>
	)
}
