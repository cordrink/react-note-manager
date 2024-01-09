import React from 'react';
import s from './style.module.css';
import {Search} from "react-bootstrap-icons";

function SearchBar({placeholder, onTextChange}) {
    return (
        <>
            <Search size={25} className={s.icon} />
            <input
                type="text"
                className={s.input}
                onChange={e => onTextChange(e.target.value)}
                placeholder={placeholder}
            />
        </>
    );
}

export default SearchBar;