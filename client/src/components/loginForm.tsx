import { Alert, Button, Input, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { setUser } from "../redux/features/userSlice";
import { loginUser } from "../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import LoadingSpinner from "./micro/loadingSpinner";
import { setIsAuthenticated } from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/hooks";

type UserLoginForm = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(props.UI.loading);
//   }, [props.UI]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please, enter your username!"),
    password: Yup.string().required("Please, enter your password!"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLoginForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: UserLoginForm) => {
    console.log({ data: data });
    setLoading(true);
    await loginUser(data).then((res) => {
        console.log({res: res});
        dispatch(setUser(res.user));
        dispatch(setIsAuthenticated(true));
        navigate('/');
    }).catch((err) => {
      console.log({err: err});
      
    })
  };

  return (
    <div className="bg-[#eeeeee] rounded-xl p-3 my-5 mx-3 shadow-md flex flex-col justify-center">
      {loading ? (
        <LoadingSpinner/>
      ) : (
        <>
          <Typography variant="h3" className="m-3">Login to your account</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-3">
              {errors.username && (
                <Alert color="red" className="p-1 mb-2">
                  {errors.username.message}
                </Alert>
              )}
              <Input
                label="Username"
                color="indigo"
                {...register("username")}
                error={errors.username ? true : false}
              />
            </div>
            <div className="m-3">
              {errors.password && (
                <Alert color="red" className="p-1 mb-2">
                  {errors.password.message}
                </Alert>
              )}

              <Input
                label="Password"
                type="password"
                color="indigo"
                {...register("password")}
                error={errors.password ? true : false}
              />
            </div>
            <Button color="indigo" type="submit" className="m-3">
              Login
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginForm;