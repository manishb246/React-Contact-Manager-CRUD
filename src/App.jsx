import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ContactList from "./components/ContactList/ContactList";
import AddContact from "./components/AddContact/AddContact";
import EditContact from "./components/EditContact/EditContact";
import ViewContact from "./components/ViewContact/ViewContact";
import NavBar from "./components/NavBar";
import Spinner from "./components/Spinner/Spinner";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to={"/contacts/list"} />} />
        <Route path="/contacts/list" element={<ContactList />} />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/view/:contactId" element={<ViewContact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
      </Routes>
    </div>
  );
};

export default App;
