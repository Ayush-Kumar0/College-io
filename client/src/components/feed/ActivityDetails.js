import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Avatar, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  height: 100%;
`;

const CommentSection = styled.div`
  ${'' /* margin-top: 16px; */}
`;

const Comments = styled.div`
    height: 18rem;
    overflow-y: scroll;
    background-color: #13192a;
    padding-left: 5px;
    border-radius: 5px;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const CommentAvatar = styled(Avatar)`
  && {
    margin-right: 8px;
    background-color: rgb(81 105 109);
  }
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const CommentUsername = styled(Typography)`
  && {
    font-weight: bold;
    margin-right: 8px;
  }
`;

const CommentTime = styled(Typography)`
  && {
    color: #888;
    font-size: 12px;
  }
`;

const CommentText = styled(Typography)`
  && {
    margin-bottom: 8px;
  }
`;

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    }
  }
});

const CommentWritingBox = styled(Box)`
  && {
    margin-top: 16px;
    padding: 8px;
    ${'' /* background-color: #f0f0f0; */}
    background-color: #13192a;
    border-radius: 4px;
  }
`;

const CommentSubmit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const CollapseIcon = styled(ExpandMoreIcon)`
  && {
    color: #fff;
    position: relative;
    vertical-align: bottom;
    rotate: -180deg;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: rgba(34,34,34,0.8);
    border-radius: 50%;
    font-size: 32px;
    z-index: 10;
  }

  &:hover {
    background-color: rgba(34,34,34,1);
  }
`;

const ActivityDetails = ({ description, handleCollapseActivity, index, expandedActivity }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    // Handle comment submission here
    console.log('Submitted comment:', newComment);
    setNewComment('');
  };

  useEffect(() => {
    if (expandedActivity !== null && index === expandedActivity) {
      // Scrolling to the bottom  comment
      let x = document.getElementsByClassName('comments')[expandedActivity];
      x.scrollTop = x.scrollHeight;
    }
  }, [expandedActivity, index]);

  return (
    <>
      <DetailsContainer>

        <Typography variant="body1">{description}</Typography>

        <CommentSection>
          {/* Render comments */}
          <Comments className='comments'>
            <CommentContainer className='xy'>
              <CommentAvatar src="avatar1.jpg" alt="John Doe" />
              <CommentContent>
                <CommentHeader>
                  <CommentUsername variant="body2">John Doe</CommentUsername>
                  <CommentTime variant="caption">2 hours ago</CommentTime>
                </CommentHeader>
                <CommentText variant="body2">Great activity! I enjoyed it a lot.</CommentText>
              </CommentContent>
            </CommentContainer>
            <CommentContainer>
              <CommentAvatar src="avatar1.jpg" alt="John Doe" />
              <CommentContent>
                <CommentHeader>
                  <CommentUsername variant="body2">John Doe</CommentUsername>
                  <CommentTime variant="caption">2 hours ago</CommentTime>
                </CommentHeader>
                <CommentText variant="body2">Great activity! I enjoyed it a lot.</CommentText>
              </CommentContent>
            </CommentContainer>
            <CommentContainer>
              <CommentAvatar src="avatar1.jpg" alt="John Doe" />
              <CommentContent>
                <CommentHeader>
                  <CommentUsername variant="body2">John Doe</CommentUsername>
                  <CommentTime variant="caption">2 hours ago</CommentTime>
                </CommentHeader>
                <CommentText variant="body2">Great activity! I enjoyed it a lot.</CommentText>
              </CommentContent>
            </CommentContainer>
            <CommentContainer>
              <CommentAvatar src="avatar1.jpg" alt="John Doe" />
              <CommentContent>
                <CommentHeader>
                  <CommentUsername variant="body2">John Doe</CommentUsername>
                  <CommentTime variant="caption">2 hours ago</CommentTime>
                </CommentHeader>
                <CommentText variant="body2">Great activity! I enjoyed it a lot.</CommentText>
              </CommentContent>
            </CommentContainer>
            <CommentContainer>
              <CommentAvatar src="avatar1.jpg" alt="John Doe" />
              <CommentContent>
                <CommentHeader>
                  <CommentUsername variant="body2">John Doe</CommentUsername>
                  <CommentTime variant="caption">2 hours ago</CommentTime>
                </CommentHeader>
                <CommentText variant="body2">Great activity! I enjoyed it a lot.</CommentText>
              </CommentContent>
            </CommentContainer>
            <CommentContainer>
              <CommentAvatar src="avatar1.jpg" alt="John Doe" />
              <CommentContent>
                <CommentHeader>
                  <CommentUsername variant="body2">John Doe</CommentUsername>
                  <CommentTime variant="caption">2 hours ago</CommentTime>
                </CommentHeader>
                <CommentText variant="body2">Great activity! I enjoyed it a lot.</CommentText>
              </CommentContent>
            </CommentContainer>
            <CommentContainer>
              <CommentAvatar src="avatar2.jpg" alt="Jane Smith" />
              <CommentContent>
                <CommentHeader>
                  <CommentUsername variant="body2">Jane Smith</CommentUsername>
                  <CommentTime variant="caption">1 hour ago</CommentTime>
                </CommentHeader>
                <CommentText variant="body2">
                  Thanks for organizing this. It was a wonderful experience.
                </CommentText>
              </CommentContent>
            </CommentContainer>
          </Comments>

          {/* Comment writing box */}
          <CommentWritingBox>
            <CssTextField
              fullWidth
              multiline
              // rows={1}
              maxRows={5}
              minRows={1}
              variant="outlined"
              placeholder="Write a comment..."
              value={newComment}
              onChange={handleCommentChange}
            />

            <CommentSubmit>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleCommentSubmit}
                disabled={!newComment}
                style={{ marginTop: '8px' }}
                sx={{
                  background: "#1976d2",
                  color: "white",
                  "&.Mui-disabled": {
                    background: "white",
                    color: "rgb(0 0 0 / 45%)"
                  }
                }}
              >
                Post Comment
              </Button>
              <CollapseIcon onClick={handleCollapseActivity} />
            </CommentSubmit>
          </CommentWritingBox>

        </CommentSection>

      </DetailsContainer>
    </>
  );
};

export default ActivityDetails;
