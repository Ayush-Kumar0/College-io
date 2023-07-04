import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useState,useEffect } from 'react';
import {  TextField } from '@mui/material'

import { Formik } from "formik";
import * as yup from 'yup';

import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

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

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

       
      </Box>

      
      <Box m="20px">
        
          
        </Box>

     
       











    </Box>
  );
};

export default Dashboard;
