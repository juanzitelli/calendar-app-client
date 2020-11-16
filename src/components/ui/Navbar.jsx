import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { eventsLogout } from '../../actions/events';

export const Navbar = () => {
	const { name } = useSelector(state => state.auth)
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(startLogout())
		dispatch(eventsLogout());
	}
	return (
		<div className="navbar navbar-dark bg-dark">
			<span className="navbar-brand">
				{name}'s calendar 📅
			</span>
			<button className="btn btn-outline-danger">

				<span onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Exit</span>
			</button>
		</div>
	)
}
