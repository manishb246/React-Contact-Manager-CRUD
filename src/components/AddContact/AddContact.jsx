import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContactService from "../../services/ContactService";

const AddContact = () => {
  let navigate = useNavigate();
  let [state, Setstate] = useState({
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

  let updateInput = (event) => {
    Setstate({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        Setstate((prevState) => ({
          ...prevState,
          loading: true,
        }));
        let response = await ContactService.getGroups();
        Setstate((prevState) => ({
          ...prevState,
          loading: false,
          groups: response.data,
        }));
      } catch (error) {
        Setstate((prevState) => ({
          ...prevState,
          loading: false,
          errorMessage: error.message,
        }));
      }
    };

    fetchGroups();
  }, []);

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.createContact(state.contact);
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      Setstate({ ...state, errorMessage: error.message });
      navigate("/contacts/add", { replace: false });
    }
  };

  let { loading, contact, groups, errorMessage } = state;
  return (
    <div>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success">Create Contact</p>
              <p className="fst-italic">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
                atque animi modi id praesentium ut voluptate! Laudantium
                voluptas reprehenderit, blanditiis quidem iure ipsa neque enim
                quasi odio fuga minus recusandae!
              </p>
            </div>
            <div className="row">
              <form className="col-md-4" onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    name="name"
                    value={contact.name}
                    onChange={updateInput}
                    required={true}
                    type="text"
                    placeholder="Name"
                    className="form-control"
                  />
                </div>

                <div className="mb-2">
                  <input
                    name="photo"
                    value={contact.photo}
                    onChange={updateInput}
                    required={true}
                    type="text"
                    placeholder="photo Url"
                    className="form-control"
                  />
                </div>

                <div className="mb-2">
                  <input
                    name="mobile"
                    value={contact.mobile}
                    onChange={updateInput}
                    required={true}
                    type="number"
                    placeholder="Mobile"
                    className="form-control"
                  />
                </div>

                <div className="mb-2">
                  <input
                    name="email"
                    value={contact.email}
                    onChange={updateInput}
                    required={true}
                    type="email"
                    placeholder="Email"
                    className="form-control"
                  />
                </div>

                <div className="mb-2">
                  <input
                    name="company"
                    value={contact.company}
                    onChange={updateInput}
                    required={true}
                    type="text"
                    placeholder="Company Name"
                    className="form-control"
                  />
                </div>

                <div className="mb-2">
                  <input
                    name="title"
                    value={contact.title}
                    onChange={updateInput}
                    required={true}
                    type="text"
                    placeholder="Title"
                    className="form-control"
                  />
                </div>

                <div className="mb-2">
                  <select
                    name="groupId"
                    value={contact.groupId}
                    onChange={updateInput}
                    required={true}
                    className="form-control"
                  >
                    <option value="">Select a group</option>
                    {groups.length > 0 &&
                      groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-2">
                  <input
                    type="submit"
                    value="Create"
                    className="btn btn-success"
                  />

                  <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                    Cancle
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddContact;
