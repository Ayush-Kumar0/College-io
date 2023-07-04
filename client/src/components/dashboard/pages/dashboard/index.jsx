import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material'

import { Formik } from "formik";
import * as yup from 'yup';

import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Dashboard = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


  const [userdata, setData] = useState([]);
  useEffect(() => {
    console.log(userdata);
    (async function () {
      let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/fetchUser`);
      let data = await res.clone().json();
      setData(data);
    })();
  }, []);




  const initialValues = {
    firstName: `${userdata.firstname}`,
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
  };


  return (
    <Box m="20px">
      {/* HEADER */}
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

    </Box>
  );
};

export default Dashboard;
