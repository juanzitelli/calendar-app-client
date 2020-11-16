import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModalAction } from '../../actions/ui'

export const AddNewFab = () => {
	const dispatch = useDispatch()
	const onClickEventHandler = () => {
		dispatch(uiOpenModalAction());
	}
	return (
		<button className="btn btn-primary fab" onClick={onClickEventHandler}>
			<i className="fas fa-plus"></i>
		</button>
	)
}
