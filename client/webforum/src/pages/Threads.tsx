import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import ThreadModal from "../components/ThreadModal";
import { Thread, initialThread } from "../context/ThreadsContext";
import ThreadList from "../components/ThreadList";
import { tagsContain } from "../helpers/tags"; 
import useGetThreads from "../hooks/threads/useGetThreads";
import { useThreadsContext } from "../hooks/threads/useThreadsContext";

export default function Threads() {
    const { threadsState } = useThreadsContext();
    const [filteredThreads, setFilteredThreads] = useState<Thread[]>(threadsState.threads);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortBy, setSortBy] = useState("recent");
    const [selectedThread, setSelectedThread] = useState<Thread>(initialThread);
    const [openModal, setOpenModal] = useState<boolean>(false);
    useGetThreads();

    useEffect(() => {
        setFilteredThreads(threadsState.threads?.filter((thread) => {
            const matchesTitle = thread.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesBody = thread.body.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTags = tagsContain(thread.tags, searchQuery);

            return matchesTitle || matchesBody || matchesTags;
        })
        .sort(dateComparator as CompareFn));
    }, [searchQuery, threadsState]);

    type CompareFn = ((a: Thread, b: Thread) => number);

    const dateComparator = (a: Thread, b: Thread) => {
        if (sortBy === "recent") {
            const dateA = new Date(a.time_created);
            const dateB = new Date(b.time_created);
            if (dateB < dateA) {
                return 1;
            } else if (dateA < dateB) {
                return -1;
            }
        }
        
        return 0;
    }

  return (
    <Container maxWidth="lg" sx={{ alignItems: "center", justifyContent: "center", flex: 1, flexGrow: 1, height: "100%"}}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ py: "2vh"}} >
        Community Discussions
      </Typography>

      <Stack spacing={3} mb={4}>
        <TextField
          fullWidth
          placeholder="Search threads by title, tags, or content"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              input={<OutlinedInput label="Sort By" />}
            >
              <MenuItem value="recent">Most Recent</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <ThreadList filteredThreads={filteredThreads} setSelectedThread={setSelectedThread} setOpenModal={setOpenModal} />
      <ThreadModal thread={selectedThread} open={openModal} onClose={() => {setOpenModal(false)}} />
    </Container>
  );
};
