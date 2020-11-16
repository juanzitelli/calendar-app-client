import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import { types } from "../../types/types";
import * as fetchModule from "./../../helpers/fetch";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);
Storage.prototype.setItem = jest.fn();
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

let token = "";

describe("Tests on auth actions", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });
  test("StartLogin should behave as expected if login is successful", async () => {
    await store.dispatch(startLogin("juanzitelli@gmail.com", "abc123"));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "x-token",
      expect.any(String)
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );

    token = localStorage.setItem.mock.calls[0][1];
  });

  test("StartLogin should behave as expected if login is unsuccessful", async () => {
    //Password incorrecto
    await store.dispatch(startLogin("juanzitelli@gmail.com", "abc12312312321"));
    let actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      expect.any(String),
      "error"
    );

    await store.dispatch(startLogin("juanzitelli@gmail.com", "abc12312312321"));
    actions = store.getActions();
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      expect.any(String),
      "error"
    );
  });

  test("StartRegister should behave as expected if register is successful ", async () => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "carlos",
          token: "abc123abc",
        };
      },
    }));
    await store.dispatch(startRegister("test1@test.com", "123456", "test"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "carlos",
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "x-token",
      expect.any(String)
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("StartChecking correct", async () => {
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "carlos",
          token: "ABC123ABC",
        };
      },
    }));
    await store.dispatch(startChecking());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      payload: { name: "carlos", uid: "123" },
      type: types.authLogin,
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "x-token",
      expect.any(String)
    );
  });
});
