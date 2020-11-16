const { types } = require("../../types/types");

describe("Tests on types file", () => {
  test("Types object should remain equal", () => {
    const testTypes = {
      // UI Modal action types
      uiOpenModal: "[UI] Open modal",
      uiCloseModal: "[UI] Close modal",

      // Events CRUD action types
      eventAddNew: "[Events] Add new event",
      eventStartAddNew: "[Events] Start add new event",
      eventStartUpdating: "[Events] Start event update",
      eventUpdated: "[Events] Event updated",
      eventDeleted: "[Events] Event deleted",
      eventLogout: "[Events] Event logout",

      // Active event action types
      eventSetActive: "[Events] Set active",
      eventClearActiveEvent: "[Events] Clear active event",

      // Load events
      eventsLoaded: "[Events] Events loaded",
      // eventsLoaded: "[Events] Events loaded",

      // Auth login action types
      authChecking: "[Auth] Checking login state",
      authCheckingFinished: "[Auth] Finished checking login state",
      authStartLogin: "[Auth] Start login",
      authLogin: "[Auth] Login",

      // Auth logout action types
      authLogout: "[Auth] Start logout",

      // Auth register action types
      authStartRegister: "[Auth] Start register",
      authRegister: "[Auth] Register",

      // Auth renew token action types
      authStartTokenRenew: "[Auth] Start token renewal",
	};
	
	expect(types).toEqual(testTypes)
  });
});
