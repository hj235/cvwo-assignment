import React, { useState, useCallback, useMemo, MouseEventHandler } from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Button,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
  CircularProgress
} from "@mui/material";
import { styled } from "@mui/system";
import { format } from "date-fns";
// import { IoClose } from "react-icons/io5";
import CloseIcon from '@mui/icons-material/Close';
// import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Thread } from "../context/ThreadsContext";
import { Comment } from "../context/CommentsContext";
import CommentSection from "./CommentSection";
import { useCommentsContext } from "../hooks/threads/useCommentsContext";
import StringAvatar from "./StringAvatar";

type ThreadModalProps = {
  open: boolean,
  onClose: MouseEventHandler<HTMLButtonElement>,
  thread: Thread,
};

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const ModalContent = styled(Paper)(({ theme }) => ({
  position: "relative",
  width: "90%",
  maxWidth: 900,
  maxHeight: "90vh",
  overflow: "auto",
  padding: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "100%",
    maxHeight: "100vh"
  }
}));

const ThreadHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3)
}));

const MetadataContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(1)
}));

const AuthorSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2)
}));

// const CommentSection = styled(Box)(({ theme }) => ({
//   marginTop: theme.spacing(4)
// }));

const ThreadModal = ({
  open,
  onClose,
  // threadId,
  // title = "Default Thread Title",
  // body = "Default thread body content",
  // authorName = "John Doe",
  // authorAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  // createdAt = new Date().toISOString(),
  // tags = ["discussion", "general"],
  thread,
}: ThreadModalProps) => {
  const theme = useTheme();
  const { commentsState } = useCommentsContext();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const [comments, setComments] = useState(initialComments);
  // const [newComment, setNewComment] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [likedComments, setLikedComments] = useState(new Set());

  // const handleCommentSubmit = useCallback(async () => {
  //   if (!newComment.trim()) return;

  //   setIsSubmitting(true);
  //   try {
  //     const comment = {
  //       id: String(Date.now()),
  //       text: newComment.trim(),
  //       author: "Current User",
  //       authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  //       timestamp: new Date().toISOString()
  //     };
  //     setComments(prev => [...prev, comment]);
  //     setNewComment("");
  //   } catch (error) {
  //     console.error("Failed to submit comment:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // }, [newComment]);

  // const toggleLike = useCallback((commentId) => {
  //   setLikedComments(prev => {
  //     const newSet = new Set(prev);
  //     if (newSet.has(commentId)) {
  //       newSet.delete(commentId);
  //     } else {
  //       newSet.add(commentId);
  //     }
  //     return newSet;
  //   });
  // }, []);

  // const commentsList = useMemo(() => (
  //   <List>
  //     {comments.map((comment) => (
  //       <ListItem
  //         key={comment.id}
  //         alignItems="flex-start"
  //         sx={{ borderBottom: 1, borderColor: "divider" }}
  //       >
  //         <ListItemAvatar>
  //           <Avatar
  //             src={comment.authorAvatar}
  //             alt={comment.author}
  //             imgProps={{
  //               loading: "lazy",
  //               onError: (e) => {
  //                 e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
  //               }
  //             }}
  //           />
  //         </ListItemAvatar>
  //         <ListItemText
  //           primary={
  //             <Box display="flex" justifyContent="space-between" alignItems="center">
  //               <Typography variant="subtitle1" component="span">
  //                 {comment.author}
  //               </Typography>
  //               <Typography variant="caption" color="text.secondary">
  //                 {format(new Date(comment.timestamp), "PPp")}
  //               </Typography>
  //             </Box>
  //           }
  //           secondary={
  //             <Box mt={1}>
  //               <Typography variant="body1" color="text.primary">
  //                 {comment.text}
  //               </Typography>
  //               <IconButton
  //                 size="small"
  //                 onClick={() => toggleLike(comment.id)}
  //                 aria-label={likedComments.has(comment.id) ? "Unlike" : "Like"}
  //               >
  //                 {likedComments.has(comment.id) ? <FaHeart color="#f44336" /> : <FaRegHeart />}
  //               </IconButton>
  //             </Box>
  //           }
  //         />
  //       </ListItem>
  //     ))}
  //   </List>
  // ), [comments, likedComments, toggleLike]);

  return (
    <StyledModal
      open={open}
      // onClose={onClose}
      aria-labelledby="forum-thread-modal"
      aria-describedby="forum-thread-discussion"
      onClose={onClose}
    >
      <ModalContent>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          aria-label="close modal"
        >
          {/* <IoClose /> */}
          <CloseIcon/>
        </IconButton>

        <ThreadHeader>
          <Typography variant="h4" component="h1" gutterBottom>
            {thread?.title}
          </Typography>

          <MetadataContainer>
            <Typography variant="body2" color="text.secondary">
              {thread.time_created && format(new Date(thread.time_created), "PPp")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {commentsState.comments?.length} comments
            </Typography>
            {/* {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
            ))} */}
          </MetadataContainer>

          <AuthorSection>
            {/* <Avatar
              src={authorAvatar}
              alt={authorName}
              imgProps={{
                loading: "lazy",
                onError: (e) => {
                  e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
                }
              }}
            /> */}
            <StringAvatar name={thread.author.String} />
            <Typography variant="subtitle1">{thread.author.String}</Typography>
          </AuthorSection>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {thread.body}
          </Typography>
        </ThreadHeader>

        <CommentSection threadId={thread.id} />
      </ModalContent>
    </StyledModal>
  );
};

export default ThreadModal;