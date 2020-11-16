const { fetchSinToken, fetchConToken } = require("../../helpers/fetch");

describe("Tests on fetch functions", () => {
  let token = "";
  test("FetchSinToken function should work", async () => {
    const payload = {
      email: "juanzitelli@gmail.com",
      password: "abc123",
    };
    const response = await fetchSinToken("auth", payload, "POST");
    expect(response instanceof Response).toBe(true);
    const body = await response.json();
    expect(body.ok).toBe(true);
    token = body.token;
  });

  test("FetchConToken should work", async () => {
    localStorage.setItem("x-token", token);
    const response = await fetchConToken(
      "events/5fad853854c339001756b027",
      {},
      "DELETE"
    );
    const body = await response.json();

    expect(body.msg).toBe("No existe un evento con el ID enviado");
  });
});
