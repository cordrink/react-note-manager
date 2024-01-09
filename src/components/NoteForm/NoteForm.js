import s from './style.module.css';
import {PencilFill, TrashFill} from "react-bootstrap-icons";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import {useState} from "react";
import {FromValidators} from "../../services/From-validators";
import FieldError from "../FieldError/FieldError";
import note from "../../containers/Note/Note";

const VALIDATORS = {
    title : (value) => {
        return FromValidators.min(value, 3) || FromValidators.max(value, 20)
    },
    content : (value) => {
        return FromValidators.min(value, 3);
    }
}

function NoteForm({ isEditable=true , note, title, onClickEdit, onClickTrash, onSubmit}) {
    const [formValues, setFormValues] = useState({
        title: note?.title || "",
        content: note?.content || ""
    });
    const [formErrors, setFormErrors] = useState({
        title: note?.title ? undefined : "",
        content: note?.content ? undefined : ""
    });

    // Verifie l'etat de formError pour activer et desactiver le button submit
    let hasError = () => {
        return Object.values(formErrors).some((error) => error !== undefined)
    }

    const updateFormValues = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})

        validate(e.target.name, e.target.value);
    };

    const validate = (fieldName, fieldValue) => {
        setFormErrors({...formErrors, [fieldName]:VALIDATORS[fieldName](fieldValue)})
    }

    const actionIcons =  (
        <>
            <div className="col-1">
                {onClickEdit && <PencilFill onClick={onClickEdit} className={s.icon}/>}
            </div>
            <div className="col-1">
                {onClickTrash && <TrashFill onClick={onClickTrash} className={s.icon}/>}
            </div>
        </>
    );

    const titleInput =  (
        <div className={`mb-5`}>
            <label className="form-label">Title</label>
            <input
                onChange={updateFormValues}
                type="text"
                name="title"
                className="form-control"
                value={formValues.title}
            />
            <FieldError msg={formErrors.title} />
        </div>
    );

    const contentInput = (
        <div className={`mb-5`}>
            <label className="form-label">Content</label>
            <textarea
                onChange={updateFormValues}
                type="text"
                name="content"
                className="form-control"
                rows="5"
                value={formValues.content}
            />
            <FieldError msg={formErrors.content} />
        </div>
    );

    const submitButton = (
        <div className={s.submit_btn}>
            <ButtonPrimary
                isDisabled={hasError()}
                onClick={() => onSubmit(formValues)}
            >
                Submit
            </ButtonPrimary>
        </div>
    );

    return (
        <form className={s.container}>
            <div className="row justify-content-space-between">
                <div className="col-10">
                    <h2 className="mb-3">{title}</h2>
                </div>
                {actionIcons}
            </div>
            <div className={`mb-3 ${s.title_input_container}`}>{isEditable && titleInput}</div>
            {isEditable ? contentInput : <pre>{note.content}</pre> }
            {onSubmit && submitButton}
        </form>
    );
}

export default NoteForm;