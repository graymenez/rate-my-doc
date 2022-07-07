import RmdApi from "../api";

async function getUser(setCurrUser, id) {
  let res = await RmdApi.getUserById(id);
  setCurrUser(res);
  return res;
}

function logout(navigate) {
  localStorage.clear();
}

export default { getUser, logout };
