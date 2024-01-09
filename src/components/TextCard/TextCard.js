import React, {useState} from 'react';
import s from "./Style.module.css"
import {Trash} from "react-bootstrap-icons";

function TextCard({title, content, subtitle, onClickTrash, onClick}) {
    const [isCardHover, setIsCardHover] = useState(false);
    const [isTrashHover, setIsTrashHover] = useState(false);

    const onClickTrash_ = (e) => {
        onClickTrash();
        e.stopPropagation();
    }

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsCardHover(true)}
            onMouseLeave={() => setIsCardHover(false)}
            className={`card ${s.container}`}
            style={{borderColor: isCardHover ? "#0d6efd" : "transparent"}}
        >
            <div className="card-bod">
                <div className={s.title_row}>
                    <h5 className="card-title">{title}</h5>
                    <Trash
                        size={20}
                        onMouseEnter={() => setIsTrashHover(true)}
                        onMouseLeave={() => setIsTrashHover(false)}
                        style={{ color: isTrashHover ? "#ff7373" : "#b8b8b8" }}
                        onClick={onClickTrash_}
                    />
                </div>

                <h6 className="card-suvbtitle mb-2 text-muted">{subtitle}</h6>
                <p className={`card-text ${s.text_content}`}>{content}</p>
            </div>
        </div>
    );
}

export default TextCard;