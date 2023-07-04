import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth/authContext";
// import { Tooltip } from '@mui/material';

function Signup() {
  const nav = useNavigate();
  const [login, setLogin] = useContext(AuthContext);

  const [options, setOptions] = useState([]);
  useEffect(() => {
    console.log(options);
    (async function () {
      let res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/fetchCollegeNames`
      );
      let data = await res.clone().json();
      setOptions(data);
    })();
  }, []);

  const [name, setName] = useState(
    sessionStorage.getItem("name") ? sessionStorage.getItem("name") : ""
  );
  const handleName = (e) => {
    sessionStorage.setItem("name", e.target.value);
    setName(e.target.value);
  };
   
  const [email, setEmail] = useState(
    sessionStorage.getItem("email") ? sessionStorage.getItem("email") : ""
  );
  const handleEmail = (e) => {
    sessionStorage.setItem("email", e.target.value);
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const [password2, setPassword2] = useState("");
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const [selected, setSelected] = useState(
    sessionStorage.getItem("selected")
      ? sessionStorage.getItem("selected")
      : "-1"
  );
  const handleCollege = (e) => {
    sessionStorage.setItem("selected", e.target.value);
    setSelected(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      confirm_password: password2,
      college_id: selected,
    };
    let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/create`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.status === 200) {
      setLogin(true);
      window.location.href = "/";
    } else {
      let result = await res.clone().json();
      console.log("Could not authenticate");
    }
  };

  const shouldEnable = () => {
    if (
      name !== "" &&
      password !== "" &&
      password2 !== "" &&
      selected !== "-1" &&
      email.match("[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+.[a-zA-Z]{2,4}")
    )
      return true;
    else return false;
  };

  return (
    <div className="bg-transparent flex flex-col justify-center w-screen h-screen absolute top-0 left-0">
      <form className="w-[90%] sm:w-[600px] md:w-[700px] mx-auto rounded-lg bg-gray-900 p-8 px-8 flex flex-col items-center">
        <h2 className="text-4xl dark:text-white font-bold text-center">
          SIGN UP
        </h2>
        {/* Name */}
        <div className="w-[90%] sm:w-[280px] md:w-[340px] flex flex-col text-gray-400 py-2">
          <label>Name</label>
          <input
            name="name"
            value={name}
            onChange={handleName}
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="text"
          />
        </div>
        {/* Email */}
        <div className="w-[90%] sm:w-[280px] md:w-[340px] flex flex-col text-gray-400 py-2">
          <label>Email</label>
          <input
            name="email"
            value={email}
            onChange={handleEmail}
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="email"
          />
        </div>
        {/* Password */}
        <div className="w-[90%] sm:w-[280px] md:w-[340px] flex flex-col text-gray-400 py-2">
          <label className="w-fit">Password</label>
          {/* <Tooltip title='Both passwords should be different'>
                        <img src='/assets/images/exclamation.svg' alt='Err' />
                    </Tooltip> */}
          <input
            name="password"
            value={password}
            onChange={handlePassword}
            className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="password"
          />
        </div>
        {/* Confirm Password */}
        <div className="w-[90%] sm:w-[280px] md:w-[340px] flex flex-col text-gray-400 py-2">
          <label>Confirm Password</label>
          <input
            name="confirm_password"
            value={password2}
            onChange={handlePassword2}
            className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="password"
          />
        </div>
        {/* College */}
        <div className="main w-[90%] sm:w-[360px] md:w-[440px]">
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="inputCollege">College</label>
            <select
              onChange={handleCollege}
              value={selected}
              id="inputCollege"
              name="collegeName"
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            >
              <option
                className="collegeOptions text-[10px] md:text-sm"
                value={"-1"}
              >
                Select Your College
              </option>
              {options.map((opt) => (
                <option
                  className="collegeOptions text-[10px] md:text-sm overflow-x-scroll"
                  key={opt.id}
                  value={opt.id}
                >
                  {opt.name + ", " + opt.city}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Submit */}
        {shouldEnable() ? (
          <button
            onClick={handleSubmit}
            className="w-20 sm:w-30 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
          >
            SIGNUP
          </button>
        ) : (
          <button
            disabled
            className="brightness-50 w-20 sm:w-30 my-5 py-2 bg-teal-500  text-white font-semibold rounded-lg"
          >
            SIGNUP
          </button>
        )}
      </form>
    </div>
  );
}

export { Signup };
