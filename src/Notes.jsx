import { React, useState, useEffect } from "react";
import CreateNote from "./CreateNote";
import { v4 as uuid } from "uuid";
import "./Note.css";
import Note from "./Note"
export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [inputText, setInputText] = useState("");
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Notes"));
        if (data) {
            setNotes(data);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("Notes", JSON.stringify(notes));
    }, [notes]);
    const textHandler = ({ target }) => {
        setInputText(target.value);
    };
    const saveHandler = () => {
        setNotes((prevState) => [
            ...prevState,
            {
                id: uuid(),
                text: inputText,
            },
        ]);
        setInputText("");
    };
    const deleteNote = (id) => {
        const filteredNotes = notes.filter((note) => note.id !== id);
        setNotes(filteredNotes);
    };
    return (
        <div className="notes">
            {notes.map((note) => (
                <Note
                    key={note.id}
                    id={note.id}
                    text={note.text}
                    deleteNote={deleteNote}
                />
            ))}

            <CreateNote
                textHandler={textHandler}
                saveHandler={saveHandler}
                inputText={inputText} />
        </div>
    );
}
