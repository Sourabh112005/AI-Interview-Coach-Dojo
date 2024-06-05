import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../../reudx/userSlice";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginSubmithandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      dispatch(setAuthUser(res.data));
      console.log(res.data)
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <div className=" w-full py-2 px-4 flex flex-col items-center justify-center xl:flex xl:flex-col xl:items-start xl:justify-center ">
        <div className="logo w-fit flex flex-col items-center">
          <img className="w-20" src="/src/assets/DojoLogo.png" alt="" />
          <h3 className="text-white font-semibold">DOJOAI</h3>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center py-10 px-2">
        <div className="login relative w-full h-full flex flex-col items-center justify-center md:w-[50vw] lg:w-[50vw] xl:w-[50vw] xl:h-[40vw] rounded-xl shadow-lg  shadow-slate-900  p-2  bg-[#222222]  ">
          <h1 className="text-4xl mb-10 text-white">AI Interview Coach </h1> <h2> Welcome Back!</h2>
          <form
            className="flex flex-col gap-5 items-center"
            onSubmit={LoginSubmithandler}
          >
            <div className="w-[80vw]  flex flex-col xl:w-[23vw] lg:w-[25vw] md:w-[30vw]  items-center gap-5">
              <input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
                placeholder="Email"
                className="input  input-bordered input-primary w-full "
              />
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                placeholder="Password"
                className="input input-bordered input-primary w-full "
              />
            </div>
            <div className="button w-full">
              <button className="btn btn-outline w-full btn-primary">
                Login
              </button>
            </div>
            <div className="divider">OR</div>

            <p className="absolute bottom-2">
              Don't have an account ?{" "}
              <Link to="/register" className=" cursor-pointer text-blue-400">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
