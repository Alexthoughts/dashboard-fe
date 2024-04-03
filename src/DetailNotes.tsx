import { Box, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { FC, useEffect, useState } from "react";

const textAreaStyle = {
  "& label": {
    color: "rgba(255, 255, 255, 0.8)",
  },
  "& label.Mui-focused": {
    color: "rgba(255, 255, 255, 0.8)",
  },
  "& .MuiOutlinedInput-input": {
    color: "rgba(255, 255, 255, 0.8)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgba(255, 214, 0, 0.5)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(955, 555, 9, 0.2)",
    },
    "&:hover fieldset": {
      border: "2px solid rgba(955, 555, 9, 0.3)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(255, 214, 0, 0.5)",
    },
  },
};

const textAreaStyleReadonly = {
  "& .MuiFilledInput-input": {
    color: "rgba(255, 255, 255, 0.8)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgba(255, 214, 0, 0.5)",
  },
  "& .MuiFilledInput-root": {
    backgroundColor: "rgba(192, 192, 192, 0.05)",
    paddingTop: "8px",
    "&::before": {
      borderColor: "rgba(955, 555, 9, 0.2)",
    },
    "&::after": {
      border: "1px solid rgba(255, 214, 0, 0.5)",
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 0, 0.05)",
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: "rgba(255, 214, 0, 0.5)",
    },
  },
};

type Note = {
  id: number;
  text: string;
};

type DetailNotesProps = {
  className?: string;
};

export const DetailNotes: FC<DetailNotesProps> = ({ className }) => {
  const localStorageKey = "Notes list";
  const [newNoteText, setNewNoteText] = useState<string>("");
  const [notesList, setNotesList] = useState<Note[]>([]);

  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem(localStorageKey);
    if (dataFromLocalStorage) {
      const convertedData = JSON.parse(dataFromLocalStorage);
      setNotesList(convertedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(notesList));
  }, [notesList.toString()]);

  const handleChangeNewNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNoteText(e.target.value);
  };

  const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleClickAddNewNote();
    }
  };

  const handleClickAddNewNote = () => {
    if (newNoteText.length > 0) {
      const newNote = { id: new Date().getTime(), text: newNoteText };
      setNotesList([...notesList, newNote]);
      setNewNoteText("");
    }
  };

  const handleClickDeleteNote = (noteToDelete: Note) => {
    const newNotesList = notesList.filter((note) => {
      return note.id !== noteToDelete.id;
    });
    setNotesList(newNotesList);
  };

  const renderedNotes = notesList.map((note) => {
    if (!note) return;
    return (
      <Box
        sx={{
          display: "flex",
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
        key={note.id}
      >
        <TextField
          multiline
          maxRows={2}
          fullWidth
          value={note.text}
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
          sx={textAreaStyleReadonly}
        />
        <IconButton
          aria-label="delete"
          size="large"
          sx={{ "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.2)" } }}
          onClick={() => handleClickDeleteNote(note)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Box>
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "100%",
      }}
      className={className}
    >
      {/* NEW NOTE */}
      <Box
        sx={{
          display: "flex",
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          marginBottom: "3rem",
        }}
      >
        <TextField
          label="New Note"
          multiline
          maxRows={2}
          fullWidth
          sx={textAreaStyle}
          onChange={handleChangeNewNote}
          value={newNoteText}
          onKeyDown={handleEnterClick}
        />
        <IconButton
          aria-label="add"
          size="large"
          sx={{ "&:hover": { backgroundColor: "rgba(955, 555, 9, 0.2)" } }}
          onClick={handleClickAddNewNote}
        >
          <AddIcon fontSize="inherit" sx={{ color: "rgba(255, 214, 0, 0.5)" }} />
        </IconButton>
      </Box>

      {/* NOTES LIST */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          pt: 2,
          overflowY: "auto",
        }}
      >
        {renderedNotes}
      </Box>
    </Box>
  );
};
