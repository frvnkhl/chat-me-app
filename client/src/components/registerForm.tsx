import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Input, Typography } from "@material-tailwind/react";
import { color } from "@material-tailwind/react/types/components/select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { registerUser } from "../services/authService";
import LoadingSpinner from "./micro/loadingSpinner";

type UserRegisterForm = {
  username: string;
  password: string;
  confirmPassword: string;
};

interface ISubmitMessage {
  message: string;
  color: color;
}

const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<ISubmitMessage>();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters!")
      .max(40, "Password must not exceed 40 characters!"),
    confirmPassword: Yup.string()
      .required("You must confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords do not match!"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserRegisterForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: UserRegisterForm) => {
    setLoading(true);
    const registerData = { username: data.username, password: data.password };
    console.log({ data: registerData });
    await registerUser(registerData)
      .then((res) => {
        setSubmitMessage({
          message: res.data.message,
          color: "green",
        });
      })
      .catch((err) => {
        console.log({ err: err });
        setSubmitMessage({
          message: err.response.data.message,
          color: "red",
        });
      });
    setLoading(false);
    reset();
  };

  return (
    <div className="bg-[#eeeeee] rounded-xl p-3 my-5 mx-auto shadow-md md:w-[50%]">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Typography variant="h3" className="m-3">
            Create new account
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {submitMessage !== undefined && (
              <Alert color={submitMessage.color} className="p-2 mb-2">
                {submitMessage.message}
              </Alert>
            )}
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
            <div className="m-3">
              {errors.password && (
                <Alert color="red" className="p-1 mb-2">
                  {errors.password.message}
                </Alert>
              )}

              <Input
                label="Confirm password"
                type="password"
                color="indigo"
                {...register("confirmPassword")}
                error={errors.password ? true : false}
              />
            </div>
            <Button color="indigo" type="submit" className="m-3">
              Register
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default RegisterForm;
