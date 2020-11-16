import "@testing-library/jest-dom";
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";
import {} from "./../../actions/auth";

const initState = {
  checking: true,
};

describe("Tests on authReducer", () => {
  test("Should return default state", () => {
    const state = authReducer(initState, {});
    expect(state).toEqual(initState);
  });
  test("Should login", () => {
    const loginAction = {
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "Juan",
      },
    };
    const state = authReducer(initState, loginAction);

    expect(state).toEqual({ checking: false, name: "Juan", uid: "123" });
  });
  test("Should authCheckingFinished", () => {});
  test("Should logout", () => {});
});
