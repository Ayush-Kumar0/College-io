import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import Activities from './Activities';
import styled from 'styled-components';


const Activitylist = () => {
    const activities = [
        {
            title: 'Activity 1',
            type: 'Type A',
            createdBy: 'User 1',
            creationTime: '2023-06-01',
            activeTill: '2023-06-10',
        },
        {
            title: 'Activity 1',
            type: 'Type A',
            createdBy: 'User 1',
            creationTime: '2023-06-01',
            activeTill: '2023-06-10',
        },
        {
            title: 'Activity 1',
            type: 'Type A',
            createdBy: 'User 1',
            creationTime: '2023-06-01',
            activeTill: '2023-06-10',
        },
        {
            title: 'Activity 1',
            type: 'Type A',
            createdBy: 'User 1',
            creationTime: '2023-06-01',
            activeTill: '2023-06-10',
        },
        // Add more activity objects as needed
    ];

    return (
        <Container>
            <Activities activities={activities} />
        </Container>
    );
};

const Container = styled.div`
    overflow-y: scroll;
    height: calc(100vh - 88px);
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
`;

export default Activitylist;
