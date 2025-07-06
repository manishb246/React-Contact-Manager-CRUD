import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ContactService from "../../services/ContactService";
import Spinner from "../Spinner/Spinner";

const ViewContact = () => {
  let { contactId } = useParams();

  let [state, Setstate] = useState({
    loading: false,
    contact: {},
    errorMessage: " ",
    group: {},
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        Setstate((prevState) => ({ ...prevState, loading: true }));
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroup(response.data);
        Setstate({
          loading: false,
          contact: response.data,
          errorMessage: "",
          group: groupResponse.data,
        });
      } catch (error) {
        Setstate({
          loading: false,
          contact: {},
          errorMessage: "Failed to fetch contact data",
        });
      }
    };

    fetchContact();
  }, [contactId]);

  const { loading, contact, errorMessage, group } = state;

  return (
    <div>
      <div className="view-contact">
        <div className="container">
          <div className="row p-3">
            <div className="col">
              <p className="h3 text-warning">View Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quaerat, vero similique hic reprehenderit deserunt
                exercitationem adipisci iusto qui fugit, aliquid numquam? Illo
                iusto ipsa vero fugiat fugit labore sed maxime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {Object.keys(contact).length > 0 && Object.keys(group).length > 0 && (
            <div className="view-contact mt-3">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img
                      src={contact.photo}
                      alt="user-icon"
                      className="img-fluid rounded contact-img"
                    />
                  </div>

                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name: <span className="fw-bold">{contact.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Mobile:{" "}
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email: <span className="fw-bold">{contact.email}</span>
                      </li>

                      <li className="list-group-item list-group-item-action">
                        Company:{" "}
                        <span className="fw-bold">{contact.company}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Title: <span className="fw-bold">{contact.title}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Group: <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <Link to="/contacts/list" className="btn btn-warning">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default ViewContact;
