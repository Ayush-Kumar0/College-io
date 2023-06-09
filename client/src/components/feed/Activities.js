import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Collapse } from '@mui/material';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ActivityDetails from './ActivityDetails';

const StyledCard = styled(Card)`
  && {
    width: 100%;
    margin: 10px auto;
    background-color: #222;
    color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    position: relative;
  }
`;

const CardTitle = styled(Typography)`
  && {
    font-weight: bold;
    margin-bottom: 8px;
  }
`;

const ExpandIcon = styled(ExpandMoreIcon)`
  && {
    color: #fff;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: ${({ expanded }) => (expanded ? 'rgba(255, 255, 255, 0.1)' : 'transparent')};
    border-radius: 50%;
    font-size: 32px;
    z-index: 10;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ExpandedContent = styled.div`
  padding: 10px;
`;


const Activities = ({ activities }) => {
    const [expandedActivity, setExpandedActivity] = useState(null);

    const handleExpandActivity = (index) => {
        setExpandedActivity(index === expandedActivity ? null : index);
    };

    return (
        <>
            {activities.map((activity, index) => (
                <StyledCard key={index}>
                    <CardContent>
                        <CardTitle variant="h6">{activity.title}</CardTitle>
                        <Typography variant="body2">{activity.type}</Typography>
                        <Typography variant="body2">Created by: {activity.createdBy}</Typography>
                        <Typography variant="body2">Creation time: {activity.creationTime}</Typography>
                        <Typography variant="body2">Active till: {activity.activeTill}</Typography>
                        <ExpandIcon
                            expanded={(index === expandedActivity).toString()}
                            onClick={() => handleExpandActivity(index)}
                        />
                    </CardContent>
                    <Collapse in={index === expandedActivity}>
                        <ExpandedContent>
                            <ActivityDetails description={activity.description} />
                        </ExpandedContent>
                    </Collapse>
                </StyledCard>
            ))}
        </>
    );
};


export default Activities;
