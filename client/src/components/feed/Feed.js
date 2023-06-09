import React from 'react';
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
    return (
        <>
            <Navbar page="Feed" />
            <ThemeProvider theme={darkTheme}>
                <Container>
                    <Sort />
                    <Activitylist />
                </Container>
            </ThemeProvider>
        </>
    );
};

const Container = styled.div`
    display: flex;
    flexDirection: column;
`;

export default Feed;