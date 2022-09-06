import jwtDecode from "jwt-decode";

const isTokenValid = (token: string) => {
  const currentDate = new Date();
  const decodedToken: any = jwtDecode(token);

  return decodedToken.exp * 1000 > currentDate.getTime();
};

const tokenService = { isTokenValid };

export default tokenService;