import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import Activities from './Activities';
import styled from 'styled-components';


const Activitylist = (props) => {
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
            <Activities feeds={props.feed} />
        </Container>
    );
};

const Container = styled.div`
    overflow-y: scroll;
    height: calc(100vh - 88px);
    min-height: 500px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
`;

export default Activitylist;
