import { Box, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { FC, useEffect, useState } from 'react';
import axios from '../../api/axios';
import SaveIcon from '@mui/icons-material/Save';
import ExpandIcon from '@mui/icons-material/Expand';
import { textAreaStyle, textAreaStyleReadonly } from './NotesStyles';

type Note = {
    id: number;
    text: string;
    isExpanded?: boolean;
};

type DetailNotesProps = {
    className?: string;
};

type SavedNote = {
    id: number;
    isSavedSuccessfully: boolean;
};

export const DetailNotes: FC<DetailNotesProps> = ({ className }) => {
    const [newNoteText, setNewNoteText] = useState<string>('');
    const [notesList, setNotesList] = useState<Note[]>([]);
    const [editableNote, setEditableNote] = useState<Note>();
    const [editableNoteSaved, setEditableNoteSaved] = useState<SavedNote>();

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        const notes = await axios.get('note/get-notes');
        setNotesList(notes.data);
    };

    const handleChangeNewNote = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewNoteText(e.target.value);
    };

    const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleClickAddNewNote();
        }
    };

    const handleClickAddNewNote = async () => {
        if (newNoteText.length > 0) {
            const newNote = await axios.post('note/create-note', { text: newNoteText });
            setNotesList([...notesList, newNote.data]);
            setNewNoteText('');
        }
    };

    const onClickEditNote = (note: Note) => {
        setEditableNote(note);
        setEditableNoteSaved(undefined);
    };

    const handleChangeEditableNote = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editableNote) {
            const note = { id: editableNote.id, text: e.target.value };
            setEditableNote(note);
        }
    };

    const handleKeyEditNote = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleClickSaveEditableNote();
        }
    };

    const handleClickSaveEditableNote = async () => {
        if (editableNote) {
            await axios
                .patch('note/update-note', editableNote)
                .then(() => setEditableNoteSaved({ id: editableNote.id, isSavedSuccessfully: true }));
            const updatedNotesList = notesList.map((note) =>
                note.id === editableNote.id ? { ...note, text: editableNote.text } : note,
            );
            setNotesList(updatedNotesList);
            setEditableNote(undefined);
        }
    };

    const handleClickExpandEditableNote = (expandedNote: Note) => {
        const updatedNotesList = notesList.map((note) =>
            note.id === expandedNote.id ? { ...note, isExpanded: !expandedNote.isExpanded } : note,
        );
        setNotesList(updatedNotesList);
    };

    const handleClickDeleteNote = async (noteToDelete: Note) => {
        axios.delete(`note/delete-note/${noteToDelete.id}`);
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
                    display: 'flex',
                    width: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                }}
                key={note.id}
            >
                <TextField
                    multiline
                    maxRows={note.isExpanded ? 10 : 2}
                    fullWidth
                    value={note.id === editableNote?.id ? editableNote?.text : note.text}
                    variant="filled"
                    onChange={handleChangeEditableNote}
                    onBlur={handleClickSaveEditableNote}
                    onClick={() => onClickEditNote(note)}
                    onKeyDown={handleKeyEditNote}
                    InputProps={{
                        endAdornment: (
                            <>
                                <IconButton
                                    aria-label="expand"
                                    sx={{ color: 'rgba(255, 214, 0, 0.5)' }}
                                    onClick={() => handleClickExpandEditableNote(note)}
                                >
                                    <ExpandIcon fontSize="inherit" />
                                </IconButton>
                                {note.id === editableNoteSaved?.id && editableNoteSaved?.isSavedSuccessfully ? (
                                    <IconButton
                                        aria-label="save"
                                        sx={{ color: 'rgba(0, 255, 55, 0.5)' }}
                                        onClick={handleClickSaveEditableNote}
                                    >
                                        <SaveIcon fontSize="inherit" />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        aria-label="save"
                                        sx={{ color: 'rgba(255, 214, 0, 0.5)' }}
                                        onClick={handleClickSaveEditableNote}
                                    >
                                        <SaveIcon fontSize="inherit" />
                                    </IconButton>
                                )}
                            </>
                        ),
                    }}
                    sx={textAreaStyleReadonly}
                />
                <IconButton
                    aria-label="delete"
                    size="large"
                    sx={{
                        '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.2)' },
                        color: 'rgba(255, 214, 0, 0.5)',
                    }}
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
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                height: '100%',
            }}
            className={className}
        >
            {/* NEW NOTE */}
            <Box
                sx={{
                    display: 'flex',
                    width: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                    marginBottom: '3rem',
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
                    sx={{ '&:hover': { backgroundColor: 'rgba(955, 555, 9, 0.2)' } }}
                    onClick={handleClickAddNewNote}
                >
                    <AddIcon fontSize="inherit" sx={{ color: 'rgba(255, 214, 0, 0.5)' }} />
                </IconButton>
            </Box>

            {/* NOTES LIST */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    pt: 2,
                    overflowY: 'auto',
                }}
            >
                {renderedNotes}
            </Box>
        </Box>
    );
};
