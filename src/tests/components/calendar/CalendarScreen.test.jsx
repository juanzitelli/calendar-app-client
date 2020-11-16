import "@testing-library/jest-dom";
import { mount } from 'enzyme';
import React from 'react';
import { act } from "react-dom/test-utils";
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { eventSetActive } from "../../../actions/events";
import { types } from "../../../types/types";
// import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
// import { startEventDelete } from '../../../actions/events';
// import { startEventDelete } from '../../../actions/events';
import { CalendarScreen } from './../../../components/calendar/CalendarScreen';



const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
	calendar: {
		events: []
	},
	auth: {
		uid: null,
		name: "Juan	",

	},
	ui: {
		modalOpen: false,
	}
};
const store = mockStore(initState);
jest.mock("../../../actions/events/", () => ({
	eventSetActive: jest.fn(),
	eventsStartLoading: jest.fn(),
}))

Storage.prototype.setItem = jest.fn();
store.dispatch = jest.fn();

const wrapper = mount(<Provider store={store} ><CalendarScreen /></Provider>)

describe('Should render correctly', () => {

	test('Should match snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	})

	test('Tests on calendar interactions', () => {
		const calendar = wrapper.find('Calendar')
		// console.log(calendar.html())
		calendar.prop('onDoubleClickEvent')();
		expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal })

		calendar.prop('onSelectEvent')({ start: "Hola" });
		expect(eventSetActive).toHaveBeenCalledWith({ start: "Hola" })

		act(() => {
			calendar.prop('onView')('week');
			expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week')
		})
	})

});

