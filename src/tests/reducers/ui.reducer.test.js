import "@testing-library/jest-dom";
import { uiCloseModalAction, uiOpenModalAction } from "../../actions/ui";
const { uiReducer } = require("../../reducers/uiReducer");

const initState = {
  modalOpen: false,
};

describe("Tests on uiReducer", () => {
  test("Should return default state ", () => {
    const state = uiReducer(initState, {});
    expect(state).toEqual(initState);
  });
  test("Should open and close modal ", () => {
    const modalOpen = uiOpenModalAction();
    const stateOpen = uiReducer(initState, modalOpen);
    expect(stateOpen.modalOpen).toBe(true);
    const modalClose = uiCloseModalAction();
    const stateClose = uiReducer(initState, modalClose);
    expect(stateClose.modalOpen).toBe(false);
  });
});
