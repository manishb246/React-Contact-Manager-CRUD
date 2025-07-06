import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ContactService from "../../services/ContactService";
import Spinner from "../Spinner/Spinner";

const EditContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const [contactRes, groupsRes] = await Promise.all([
          ContactService.getContact(contactId),
          ContactService.getGroups(),
        ]);
        setState((prev) => ({
          ...prev,
          loading: false,
          contact: contactRes.data,
          groups: groupsRes.data,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          errorMessage: error.message,
        }));
      }
    };

    fetchData();
  }, [contactId]);

  const updateInput = (e) => {
    setState((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await ContactService.updateContact(state.contact, contactId);
      navigate("/contacts/list");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        errorMessage: error.message,
      }));
    }
  };

  const { loading, contact, groups, errorMessage } = state;

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="add-contact p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 text-primary">Edit Contact</p>
                  <p className="fst-italic">
                    Update the contact details below.
                  </p>
                </div>
              </div>

              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}

              <div className="row align-items-center">
                <form className="col-md-4" onSubmit={submitForm}>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="name"
                      value={contact.name}
                      onChange={updateInput}
                      placeholder="Name"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-2">
                    <input
                      type="text"
                      name="photo"
                      value={contact.photo}
                      onChange={updateInput}
                      placeholder="Photo URL"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-2">
                    <input
                      type="number"
                      name="mobile"
                      value={contact.mobile}
                      onChange={updateInput}
                      placeholder="Mobile"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-2">
                    <input
                      type="email"
                      name="email"
                      value={contact.email}
                      onChange={updateInput}
                      placeholder="Email"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-2">
                    <input
                      type="text"
                      name="company"
                      value={contact.company}
                      onChange={updateInput}
                      placeholder="Company"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-2">
                    <input
                      type="text"
                      name="title"
                      value={contact.title}
                      onChange={updateInput}
                      placeholder="Title"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-2">
                    <select
                      name="groupId"
                      value={contact.groupId}
                      onChange={updateInput}
                      className="form-control"
                    >
                      <option value="">Select a group</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <input
                      type="submit"
                      value="Update"
                      className="btn btn-primary"
                    />
                    <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                      Cancel
                    </Link>
                  </div>
                </form>
                <div className="col-md-6">
                  <img
                    src={contact.photo || "https://via.placeholder.com/150"}
                    alt="contact"
                    className="contact-img"
                  />
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </div>
  );
};

export default EditContact;
