import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => async dispatch => {
  const respuesta = await fetchSinToken("auth", { email, password }, "POST");
  const body = await respuesta.json();
  if (body.ok) {
    localStorage.setItem("x-token", body.token);
    localStorage.setItem("token-init-date", new Date().getTime());
    dispatch(login({ uid: body.uid, name: body.name }));
  } else {
    Swal.fire("Error", body.msg, "error");
  }
};

export const login = user => ({
  type: types.authLogin,
  payload: user,
});

export const startRegister = (email, password, name) => async dispatch => {
  const respuesta = await fetchSinToken(
    "auth/new",
    { email, password, name },
    "POST"
  );
  const body = await respuesta.json();
  if (body.ok) {
    localStorage.setItem("x-token", body.token);
    localStorage.setItem("token-init-date", new Date().getTime());
    dispatch(login({ uid: body.uid, name: body.name }));
  } else {
    Swal.fire("Error", body.msg, "error");
  }
};

export const startChecking = () => async dispatch => {
  const respuesta = await fetchConToken("auth/renew");
  const body = await respuesta.json();
  if (body.ok) {
    localStorage.setItem("x-token", body.token);
    localStorage.setItem("token-init-date", new Date().getTime());
    dispatch(login({ uid: body.uid, name: body.name }));
  } else {
    dispatch(checkingFinished());
  }
};

const checkingFinished = () => ({
  type: types.authCheckingFinished,
});

export const startLogout = () => async dispatch => {
  localStorage.clear();
  dispatch(logout());
};

export const logout = () => ({
  type: types.authLogout,
});
