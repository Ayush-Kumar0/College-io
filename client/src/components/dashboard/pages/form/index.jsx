import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect, useContext } from "react";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Tag, setTag] = useState("");
  const [Deadline, setDeadline] = useState("");
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleTag = (e) => {
    setTag(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleDeadline = (e) => {
    setDeadline(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      heading: Title,
      description: Description,
      tag: Tag,
      deadline: Deadline,
    };
    let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/feed/create`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.status === 200) {
      console.log("data is inserted");
      setTag("");
      setDescription("")
      setTitle("")
      setDeadline("")



    } else {
      console.log("error occured");
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE NEW FEED" subtitle="Whats on your mind?" />

      <form onSubmit={handleFormSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Title of Feed"
            value={Title}
            onChange={handleTitle}
            name="heading"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Description"
            value={Description}
            onChange={handleDescription}
            name="description"
            sx={{ gridColumn: "span 4" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tag"
            value={Tag}
            onChange={handleTag}
            name="tag"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Active Duration"
            value={Deadline}
            onChange={handleDeadline}
            name="deadline"
            sx={{ gridColumn: "span 2" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
