export const getStore = (id) => localStorage.getItem(id);
export const setStore = (id, val) => localStorage.setItem(id, val);
export const config = {
  apiURL: window.apiURL || "https://gitlab.com",
  baseURL: window.baseURL || '',
  token: getStore("workflow.token"),
  triggers: {},
};
