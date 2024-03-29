// import Bingo from "./Components/ButtonObj";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { useState } from "react";
import "./App.css";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
// import AddNote from "./pages/AddNote/AddNote";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";

export interface INote {
  id: string;
  userId: string;
  title: string;
  username: string;
  content: string;
  isImportant: boolean;
}

function App() {
  const [notesList, setNotesList] = useState<INote[] | null>(null);
  return (
    <div className="App">
      <Router>
        <Navbar notesList={notesList} setNotesList={setNotesList} />
        <Routes>
          <Route
            path="/notepad"
            element={<Main notesList={notesList} setNotesList={setNotesList} />}
          />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/notepad/login" element={<Login />} />
          {/* <Route path="/add-note" element={<AddNote />} /> */}
          {/* <Redirect to="/" /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
