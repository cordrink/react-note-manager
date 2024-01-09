import {createSlice} from "@reduxjs/toolkit";

export const noteSlice  = createSlice({
    name:"noteSlice",
    initialState: {
        noteList : []
    },
    reducers: {
        setNoteList : (currentSlice, action)=> {
            currentSlice.noteList = action.payload;
        },
        addNote : (currentSlice, action)=> {
            currentSlice.noteList.push(action.payload);
        },
        updateNote: (currentSlice, action)=> {
            const indexToUpdate = currentSlice.noteList.findIndex(note => note.id === action.payload.id);
            currentSlice.noteList[indexToUpdate] = action.payload;
        },
        deleteNote: (currentSlice, action)=> {
            const filterNoteList = currentSlice.noteList.filter(note => note.id !== action.payload.id);
            currentSlice.noteList = filterNoteList;
        },
    }
});

export const noteReducer = noteSlice.reducer;

export const { deleteNote,updateNote, setNoteList,addNote } = noteSlice.actions;