import React, { useState } from 'react';
import { Typography, TextField, Button, Avatar, Box } from '@mui/material';
import styled from 'styled-components';

const CommentSection = styled.div`
  margin-top: 16px;
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

const CommentWritingBox = styled(Box)`
  && {
    margin-top: 16px;
    padding: 8px;
    background-color: #f0f0f0;
    border-radius: 4px;
  }
`;

const ActivityDetails = ({ description }) => {
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = () => {
        // Handle comment submission here
        console.log('Submitted comment:', newComment);
        setNewComment('');
    };

    return (
        <div>
            <Typography variant="body1">{description}</Typography>
            <CommentSection>
                {/* Render comments */}
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

                {/* Comment writing box */}
                <CommentWritingBox>
                    <TextField
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
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleCommentSubmit}
                        disabled={!newComment}
                        style={{ marginTop: '8px' }}
                    >
                        Post Comment
                    </Button>
                </CommentWritingBox>
            </CommentSection>
        </div>
    );
};

export default ActivityDetails;
