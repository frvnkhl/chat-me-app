import { Button, Navbar, Typography } from "@material-tailwind/react";
import { useAppSelector } from "../redux/hooks";
import { logoutUser } from "../services/authService";

const Nav = () => {
  const isAuthenticated = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Navbar className="mx-auto bg-[#eeeeee] max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-indigo-900">
        <Typography
          as="a"
          href="/"
          variant="h4"
          className="mr-4 cursor-pointer py-1.5 font-display"
        >
          <span>Chat Me App</span>
        </Typography>
        {isAuthenticated && (
          <Button color="red" onClick={handleLogout}>
            <span>Logout</span>
          </Button>
        )}
      </div>
    </Navbar>
  );
};

export default Nav;
