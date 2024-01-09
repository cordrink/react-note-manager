import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "App";
import { StrictMode } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PageNotFound from "./containers/PageNotFound/PageNotFound";
import Note from "./containers/Note/Note";
import NoteCreate from "./containers/NoteCreate/NoteCreate";
import NoteBrowse from "./containers/NoteBrowse/NoteBrowse";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/" element={<NoteBrowse />} />
                    <Route path="/note/:noteId" element={<Note />} />
                    <Route path="/note/new" element={<NoteCreate />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    </Provider>
  </StrictMode>
);
