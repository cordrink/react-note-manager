import s from './style.module.css';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import NoteForm from "../../components/NoteForm/NoteForm";
import {useState} from "react";
import {NoteApi} from "../../api/note-api";
import {deleteNote, updateNote} from "../../store/note/note-slice";

function Note(props) {
    const [isEditable, setIsEditable] = useState(false);
    const dispatch = useDispatch();
    const { noteId } = useParams();
    const nav = useNavigate();

    // const [searchParams] = useSearchParams();
    const note = useSelector(store => store.NOTE.noteList.find(note => note.id === noteId));

    const submit = async (formValues) => {
        const updatedNote = await NoteApi.update({...formValues, id: note.id});
        // Mise a jour du store pour les valeurs changé
        dispatch(updateNote(updatedNote));
        setIsEditable(false);
    };

    const deleteNote_ = (note) => {
        if (window.confirm("Supprimer la note ?")) {
            NoteApi.deleteById(note.id);
            dispatch(deleteNote(note));
            nav("/");
        }
    }
    return (
        <>
            {note && (
                <NoteForm
                    isEditable={isEditable}
                    title={isEditable ? "Edit note" : note.title}
                    note={note}
                    onClickEdit={() => setIsEditable(!isEditable)}
                    onClickTrash={() => deleteNote_(note)}
                    onSubmit={isEditable && submit}
                />
            )}
        </>
    );
}

export default Note;