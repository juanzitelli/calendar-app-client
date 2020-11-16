
import "@testing-library/jest-dom";
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import moment from 'moment';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from 'sweetalert2';
import { eventClearActiveEvent, startEventAddNew, startEventUpdate } from '../../../actions/events';
import { CalendarModal } from './../../../components/calendar/CalendarModal';



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).second(0).add(1, 'hours');
const nowPlusOneHour = now.clone().add(1, 'hours')

const initState = {
	calendar: {
		events: [],
		activeEvent: {
			title: "Hola Mundo",
			notes: "Algunas notas",
			start: now.toDate(),
			end: nowPlusOneHour.toDate(),
		},
	},
	auth: {
		uid: "123",
		name: "Fernando",
	},
	ui: {
		modalOpen: true,
	},
};
const store = mockStore(initState);

jest.mock("../../../actions/events/", () => ({
	startEventUpdate: jest.fn(),
	eventClearActiveEvent: jest.fn(),
	startEventAddNew: jest.fn(),
}))
jest.mock("sweetalert2", () => ({
	fire: jest.fn(),
}));

store.dispatch = jest.fn();

const wrapper = mount(<Provider store={store} >
	<CalendarModal />
</Provider>)
describe('Tests on CalendarModal component', () => {

	beforeEach(() => {
		jest.clearAllMocks()
	})

	test('Should show modal', () => {
		expect(wrapper.find('Modal').prop('isOpen')).toBe(true)
	})

	test('Should call update action and close modal', () => {
		wrapper.find('form').simulate('submit', {
			preventDefault() { }
		})

		expect(startEventUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
		expect(eventClearActiveEvent).toHaveBeenCalled();
	})

	test('Should show error if title is missing', () => {
		wrapper.find('form').simulate('submit', {
			preventDefault() { }
		})
		// expect(startEventUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
		expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
	})

	test('Should create a new event', () => {
		const initState = {
			calendar: {
				events: [],
				activeEvent: null
			},
			auth: {
				uid: null,
				name: "Juan",

			},
			ui: {
				modalOpen: true,
			}
		};
		let store = mockStore(initState);

		jest.mock("../../../actions/events/", () => ({
			startEventUpdate: jest.fn(),
			eventClearActiveEvent: jest.fn()
		}))

		store.dispatch = jest.fn();

		const wrapper = mount(
			<Provider store={store} >
				<CalendarModal />
			</Provider>)

		wrapper.find('input[name="title"]').simulate('change', {
			target: {
				name: 'title',
				value: 'Hola pruebas'
			}
		})
		wrapper.find('form').simulate('submit', {
			preventDefault() { }
		})


		expect(startEventAddNew).toHaveBeenCalledWith({
			end: expect.anything(),
			start: expect.anything(),
			title: 'Hola pruebas',
			notes: '',
		});
		expect(eventClearActiveEvent).toHaveBeenCalled();
	})

	test('Should validate dates', () => {
		wrapper.find('input[name="title"]').simulate("change", {
			target: {
				name: "title",
				value: "Hola pruebas",
			},
		});

		const hoy = new Date();

		act(() => {
			wrapper.find("DateTimePicker").at(1).prop("onChange")(hoy);
		});

		wrapper.find("form").simulate("submit", {
			preventDefault() { },
		});

		expect(Swal.fire).toHaveBeenCalledWith(
			"Error", "End date shouldn't be lower than start date", "error"
		);
	})

})
