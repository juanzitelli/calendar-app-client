import { mount } from 'enzyme';
import React from 'react'
import { Provider } from 'react-redux';
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { startEventDelete } from '../../../actions/events';
// import { startEventDelete } from '../../../actions/events';



const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);
jest.mock("../../../actions/events/", () => ({
	startEventDelete: jest.fn(),
}))

store.dispatch = jest.fn();


describe('Tests on DeleteEventFab component', () => {
	const wrapper = mount(<Provider store={store} >
		<DeleteEventFab />
	</Provider>)
	beforeEach(() => {
		store = mockStore(initState);
		jest.clearAllMocks();
	});
	test('Should match snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	})
	test('Should call eventStartDelete on click event', () => {
		wrapper.find("button").prop('onClick')();
		expect(startEventDelete).toHaveBeenCalled();
	})

});


