import React from 'react';
import s from './style.module.css'
import {useDispatch, useSelector} from "react-redux";
import TextCard from "../TextCard/TextCard";
import {useNavigate} from "react-router-dom";
import {NoteApi} from "../../api/note-api";
import {deleteNote} from "../../store/note/note-slice";

function NoteList({notelist}) {
    const noteList = useSelector(store => store.NOTE.noteList);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteNote_ = (note) => {

        if (window.confirm("Supprimer la note ?")) {
            NoteApi.deleteById(note.id);
            dispatch(deleteNote(note));
        }
    }
    return (
        <div className={`row justify-content-center`}>
            {
                notelist.map(note => {
                    return (
                        <div key={note.id} className={s.card_container}>
                            <TextCard
                                title={note.title}
                                subtitle={note.created_at}
                                content={note.content}
                                onClick={() => navigate("/note/"+note.id)}
                                onClickTrash={() => deleteNote_(note)}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default NoteList;