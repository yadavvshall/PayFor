import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import BottomWarning from "../components/BottomWarning";
import { Image } from "../components/Image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react-refresh/only-export-components
export const handleSignup = async ({
  username,
  firstName,
  lastName,
  password,
}) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/signup",
      {
        username,
        firstName,
        lastName,
        password,
      }
    );
    localStorage.setItem("token", response.data.token);
    return true; // Indicate successful signup
  } catch (error) {
    // Handle signup failure if needed
    return false; // Indicate failed signup
  }
};

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignupClick = async () => {
    const success = await handleSignup({
      username,
      firstName,
      lastName,
      password,
    });
    if (success) {
      navigate("/dashboard"); // Navigate to dashboard page
    } else {
      toast.error("Failed! Please Check Credentials");
    }
  };

  return (
    <div className="bg-white h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-gray-800 text-center p-5 h-max px-4 ">
          <Image />
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="Your First Name"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Your Last Name"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Your Email"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Your Password"
            label={"Password"}
          />
          <div className="pt-4 ">
            <Button onClick={handleSignupClick} label={"Sign up"} />
          </div>
          <ToastContainer />
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
