import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"

const SignUpPage = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const RegisterSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/register`,user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials : true,
        }
      )
      if(res.data.success){
        navigate("/")
        toast.success(res.data.message)
      }
      
    } catch (error) {
      // toast.error(error.response.data.message)
      console.log(error)
    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <div className=" w-full py-2 px-4 flex flex-col items-center justify-center xl:flex xl:flex-col xl:items-start xl:justify-center ">
        <div className="logo w-fit flex flex-col items-center">
          <img className="w-20" src="/src/assets/DojoLogo.png" alt="" />
          <h3 className="text-white font-semibold">DOJOAI</h3>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center py-10 px-2">
        <div className="signup relative w-full h-full flex flex-col items-center justify-center md:w-[50vw] lg:w-[50vw] xl:w-[50vw] xl:h-[40vw] rounded-xl shadow-lg  shadow-slate-900  lg:flex lg:flex-col lg:items-center lg:justify-center p-4  bg-[#222222]  ">
          <h1 className="text-4xl mb-10 text-white">Join Us</h1>
          <form className="flex flex-col gap-5 items-center" onSubmit={RegisterSubmitHandler}>
            <div className="flex gap-5 items-center justify-between">
              <input
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                type="text"
                placeholder="Firstname"
                className="input input-bordered input-primary w-1/2 xl:w-[12vw] "
              />
              <input
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                type="text"
                placeholder="Lastname"
                className="input input-bordered input-primary w-1/2 xl:w-[12vw] "
              />
            </div>
            <div className="flex flex-col w-full  items-center gap-5">
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
                placeholder="Create Password"
                className="input input-bordered input-primary w-full "
              />
              <input
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered input-primary w-full "
              />
            </div>
            <div className="button w-full mb-5">
              <button className="btn btn-outline w-full btn-primary">
                Join Us
              </button>
            </div>
            <div className="divider">OR</div>
            <p className="absolute bottom-0">
              Already have an account ?{" "}
              <Link to="/" className=" cursor-pointer text-blue-500">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
