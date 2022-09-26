import { store } from "../redux/store";

const authHeader = () => {  
  //set the token either by global state or localstorage
  const token = store.getState().token || localStorage.getItem('token');
  
  //create auth header if token isn't null
  if (token) {    
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

export { authHeader };
