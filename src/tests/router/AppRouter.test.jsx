import { mount } from 'enzyme';
import React from 'react'
import { Provider } from 'react-redux';
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { AppRouter } from '../../router/AppRouter';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// store.dispatch = jest.fn();

describe('Tests on AppRouter component', () => {

	beforeEach(() => {
		jest.clearAllMocks();
	})

	test('Should show  <<Loading>>', () => {
		const initState = {
			auth: {
				checking: true
			}
		};
		const store = mockStore(initState);
		const wrapper = mount(<Provider store={store}>
			<AppRouter />
		</Provider>);

		expect(wrapper.find('h5').exists()).toBe(true)
	})

	test('Should show the public route', () => {
		const initState = {
			auth: {
				checking: false,
				uid: null
			}
		};
		const store = mockStore(initState);
		const wrapper = mount(<Provider store={store}>
			<AppRouter />
		</Provider>);

		expect(wrapper.find('.login-container').exists()).toBe(true);
	})
	test('Should show the private route', () => {
		const initState = {
			calendar: {
				events: []
			},
			ui: {
				modalOpen: false
			},
			auth: {
				checking: false,
				uid: '123',
				name: 'Juan Carlos'
			}
		};

		const store = mockStore(initState);
		const wrapper = mount(<Provider store={store}>
			<AppRouter />
		</Provider>);


		expect(wrapper.find('.calendar-screen').exists()).toBe(true)
	})

})
