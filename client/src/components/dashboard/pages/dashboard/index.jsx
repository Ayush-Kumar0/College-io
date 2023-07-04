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

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

<<<<<<< HEAD
       
      </Box>

      
      <Box m="20px">
        
          
        </Box>

     
       











=======
        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* Users details */}
>>>>>>> 48e6ee52efc323d7d33e1a7bf8fc5e34c0931eda
    </Box>
  );
};

export default Dashboard;
