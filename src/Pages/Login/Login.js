import React, { useContext, useState } from "react";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { CiFacebook } from "react-icons/ci";
import Loader from "../../Shared/Loader/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const { providerLogin, forgotPassword, signIn, updateUserProfile } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [createUserEmail, setCreateUserEmail] = useState("");

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    setLoading(true);
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;

        // console.log(user);
        const currentUser = {
          displayName: user.displayName,
          email: user.email,
        };

        updateUserProfile(currentUser)
          .then(() => {
            saveUser(user.displayName, user.email, user.photoURL);
            setLoading(false);
            navigate(from, { replace: true });
          })
          .catch((error) => console.error(error));

        // console.log(currentUser);
        // setError("");
      })

      .catch((error) => console.error(error, error.message));
  };

  const handleFacebookSignIn = () => {
    const facebookProvider = new FacebookAuthProvider();

    setLoading(true);
    providerLogin(facebookProvider)
      .then((result) => {
        const user = result.user;
        const currentUser = {
          displayName: user.displayName,
          email: user.email,
        };

        updateUserProfile(currentUser)
          .then(() => {
            saveUser(user.displayName, user.email, user.photoURL);
            setLoading(false);
            navigate(from, { replace: true });
          })
          .catch((error) => console.error(error));

        console.log(currentUser);
        // setError("");
      })

      .catch((error) => console.error(error, error.message));
  };
  const saveUser = (displayName, email, photoURL) => {
    let myuuid = uuidv4();
    const currentDate = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
      timeZone: "Asia/Dhaka", // Set the time zone to Bangladesh
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      currentDate
    );
    const user = {
      name: displayName,
      email,
      uid: myuuid,
      img: photoURL,
      role: "user",
      createdAt: formattedDate,
    };
    fetch("https://shadin-organic-server.vercel.app/adduser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCreateUserEmail(user.email);
        // console.log(user.email);
        toast("Login success", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const handleEmailLogin = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(result);
        const currentUser = {
          email: user.email,
        };
        // console.log(currentUser);

        setError("");
        toast("login success", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate(from, { replace: true });
      })
      .catch((e) => {
        // console.error(e);
        // console.error(e.message);

        setError(e.message);
      });
  };

  const handleEmailBlur = (event) => {
    const form = event.target;
    const email = form.value;
    setUserEmail(email);
    // console.log(email);
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();

    // console.log(userEmail);

    forgotPassword(userEmail)
      .then(() => {
        setError("");
        toast("reset mail sent. Check Your mail box", {
          position: toast.POSITION.TOP_CENTER,
        });
        // alert('sent reset link')
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="mt-20">
        {/* <h2 className='text-center text-3xl '>Welcome To Login Page</h2> */}
        <div className="w-full justify-around lg:flex my-auto">
          <div className=" text-xl text-center font-bold m-auto ">
            <img
              className="w-full "
              src="https://i.ibb.co/njKWbpV/hello-login.gif"
              alt=""
            />
          </div>

          <div className=" bg-red-5 md:px-10 px-4 py-4 my-8 lg:w-1/2">
            <h1 className="text-black text-5xl text-center font-bold mb-5 ">
              Login
            </h1>
            <form
              onSubmit={handleSubmit(handleEmailLogin)}
              className="flex flex-col gap-4"
            >
              <div>
                {/* Email */}
                <div className="relative w-full mb-6 group">
                  <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    className={`block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none pl-2 focus:ring-0  peer ${
                      errors.email
                        ? "focus:border-red-500 border-red-500"
                        : "focus:border-secondary"
                    }`}
                    placeholder=" "
                    {...register("email", { required: true })}
                  />

                  <label
                    for="floating_email"
                    className="pl-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email
                  </label>
                  {errors.email && (
                    <span className="text-xs text-red-500">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <div>
                {/* password  */}
                <div className="relative w-full mb-6 group">
                  <input
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    className={`block shadow-md shadow-primary/10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none pl-2 focus:ring-0  peer ${
                      errors.password
                        ? "focus:border-red-500 border-red-500"
                        : "focus:border-secondary"
                    }`}
                    placeholder=" "
                    {...register("password", { required: true })}
                  />

                  <label
                    for="floating_password"
                    className="pl-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Enter your password
                  </label>
                  {errors.password && (
                    <span className="text-xs text-red-500">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              {/* Error show  */}
              <p className="text-red-500">{error}</p>

              <Button
                className=" lg:mx-auto w-full bg-secondary hover:bg-orange-500"
                type="submit"
              >
                Login
              </Button>
            </form>

            <p className="mt-6">
              Don't have an account?{" "}
              <Link className="text-blue-500 underline" to="/register">
                Register
              </Link>
            </p>
            <div className="flex justify-between  py-8">
              <div className="flex w-full">
                <div className="flex flex-col w-full border-opacity-50">
                  <div className="divider text-xl font-bold text-black">
                    Or continue with
                  </div>
                  <div className="grid h-20 card  rounded-box place-items-center ">
                    <div className="flex gap-4 w-full">
                      <Button
                        outline={true}
                        className="hover:text-white text-3xl w-full bg-secondary"
                        onClick={handleGoogleSignIn}
                      >
                        <span className="flex items-center justify-center font-bold hover:text-white focus:text-white w-full">
                          <FcGoogle className="mr-2 text-xl" />
                          Google
                        </span>
                      </Button>
                      <Button
                        outline={true}
                        className="hover:text-white text-3xl w-full bg-secondary"
                        onClick={handleFacebookSignIn}
                      >
                        <span className="flex items-center justify-center font-bold hover:text-white focus:text-white w-full">
                          <FaFacebook className="mr-2 text-xl text-blue-700" />
                          Facebook
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
