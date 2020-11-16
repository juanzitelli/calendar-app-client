import "@testing-library/jest-dom";
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../../actions/auth';
import { LoginScreen } from '../../../components/auth/LoginScreen';

jest.mock('../../../actions/auth', () => ({
	startLogin: jest.fn(),
	startRegister: jest.fn(),
}))
jest.mock('sweetalert2', () => ({
	fire: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn()
const wrapper = mount(
	<Provider store={store}>
		<LoginScreen />
	</Provider>
);



describe('Tests on LoginScreen component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	})
	test('Should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})

	test('Should call login dispatch', () => {
		wrapper.find('input[name="loginEmail"]').simulate("change", {
			target: {
				name: "loginEmail",
				value: "juan@gmail.com"
			}
		})
		wrapper.find('input[name="loginPassword"]').simulate("change", {
			target: {
				name: "loginPassword",
				value: "abc123"
			}
		})

		// wrapper.find('form').at(0).prop('onSubmit', {
		// 	preventDefault() { }
		// })


		wrapper.find("form").at(0).prop("onSubmit")({
			preventDefault() { },
		});

		expect(startLogin).toHaveBeenCalledWith('juan@gmail.com', 'abc123')
	})

	test('Should not startRegister if passwords do not match', () => {
		wrapper.find('input[name="registerPassword1"]').simulate("change", {
			target: {
				name: "registerPassword1",
				value: "123123"
			}
		})
		wrapper.find('input[name="registerPassword2"]').simulate("change", {
			target: {
				name: "registerPassword2",
				value: "123124"
			}
		})

		wrapper.find("form").at(1).prop("onSubmit")({
			preventDefault() { },
		});


		expect(startRegister).not.toHaveBeenCalled();
		expect(Swal.fire).toHaveBeenCalledWith(
			"Error",
			"Passwords should match",
			"error"
		);
	});
	
	test('Should startRegister if passwords match', () => {
		wrapper.find('input[name="registerPassword1"]').simulate("change", {
			target: {
				name: "registerPassword1",
				value: "123123"
			}
		})
		wrapper.find('input[name="registerPassword2"]').simulate("change", {
			target: {
				name: "registerPassword2",
				value: "123123"
			}
		})
		


		wrapper.find("form").at(1).prop("onSubmit")({
			preventDefault() { },
		});



		

		expect(Swal.fire).not.toHaveBeenCalled()
		
		expect(startRegister).toHaveBeenCalledWith(
			"",
			"123123",
			""
		);;
	})
	
})