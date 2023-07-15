import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Navbar } from '../navbar/Navbar';
import Sort from './Sort';
import Activitylist from './Activitylist';
import { createTheme } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});




function Feed() {
    const [feed ,setFeed] = useState([]);
    useEffect(async ()=>{
        const url = "http://localhost:8000/feed";
        const response = await fetch(url, {
            method: "GET", 
          });
        const result = await response.json();
          setFeed(result);
    },[])
    return (
        <>
            <Navbar page="Feed" />
            <ThemeProvider theme={darkTheme}>
                <Container>
                    <Sort />
                    <Activitylist feed = {feed} />
                </Container>
            </ThemeProvider>
        </>
    );
};

const Container = styled.div`
    display: flex;
    flexDirection: column;
    min-height: 500px;
`;

export default Feed;