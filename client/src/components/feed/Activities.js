import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Collapse, Box } from '@mui/material';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ActivityDetails from './ActivityDetails';

const ActivityBox = styled(Box)`
  ${'' /* height: ${({ expanded }) => (expanded === 'true' ? 'calc(100vh - 108px)' : 'initial')}; */}
`;

const StyledCard = styled(Card)`
  && {
    width: 100%;
    height: 100%;
    margin: 10px auto;
    background-color: rgb(22 201 147 / 44%);
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
    background-color: transparent;
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

  const handleExpandActivity = (e, index) => {
    setExpandedActivity(index);
  };

  const handleCollapseActivity = (e, index) => {
    setExpandedActivity(null);
  };

  return (
    <>
      {activities && activities.map((activity, index) => (
        <ActivityBox key={index} expanded={(index === expandedActivity).toString()}>
          <StyledCard>
            <CardContent>
              <CardTitle variant="h6">{activity.title}</CardTitle>
              <Typography variant="body2">{activity.type}</Typography>
              <Typography variant="body2">Created by: {activity.createdBy}</Typography>
              <Typography variant="body2">Creation time: {activity.creationTime}</Typography>
              <Typography variant="body2">Active till: {activity.activeTill}</Typography>
              {index !== expandedActivity ?
                <ExpandIcon
                  expanded={(index === expandedActivity).toString()}
                  onClick={(e) => handleExpandActivity(e, index)}
                />
                : null
              }
            </CardContent>
            <Collapse in={index === expandedActivity}>
              <ExpandedContent>
                <ActivityDetails description={activity.description} handleCollapseActivity={handleCollapseActivity} index={index} expandedActivity={expandedActivity} />
              </ExpandedContent>
            </Collapse>
          </StyledCard>
        </ActivityBox>
      ))}
    </>
  );
};


export default Activities;
