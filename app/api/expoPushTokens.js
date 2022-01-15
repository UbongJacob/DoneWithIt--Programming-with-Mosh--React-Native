import client from "./client";

const register = (pushToken) =>
  client.post("/expoPushTOkens", { token: pushToken });

export default {
  register,
};
