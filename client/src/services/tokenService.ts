import jwtDecode from "jwt-decode";

const isTokenValid = (token: string | null | undefined) => {
  //checks if token is an actual string
  if (token === null || token === undefined) {
    return false;
  }

  //get date, decode the token & retrieve user from local storage
  const currentDate = new Date();
  const decodedToken: any = jwtDecode(token);
  const userStr = localStorage.getItem("user");

  if (userStr !== null) {
    // console.log({ decoded: decodedToken, user: JSON.parse(userStr) });

    const user = JSON.parse(userStr);
    //checks if the token belongs to the particular user
    if (user.id !== decodedToken.id) {
      return false;
    }
  }

  //checks if the token isn't expired
  return decodedToken.exp * 1000 > currentDate.getTime();
};

export { isTokenValid };