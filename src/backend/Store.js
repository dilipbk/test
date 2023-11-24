import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import DataContext from "../components/Datacontext";
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CForm,
  CFormGroup,
  CFormInput,
} from "@coreui/react";

function Store() {
  const { auth } = useAuth();
  const authToken = auth.access_token;
  const { store_id } = useContext(DataContext);
  const [storeitems, setStoreItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/store/getDetails", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setStoreItems(
        response.data.StoreItem.map((item) => ({ ...item, editing: false }))
      );
    } catch (error) {
      console.error("Error fetching client list:", error);
    }
  };

  const handleEdit = (index) => {
    // Set the item's editing state to true
    setStoreItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, editing: true } : item
      )
    );
  };

  const handleUpdate = async (index) => {
    try {
      const editedItem = storeitems[index];
      // Perform the update request with edited data
      await axios.put(
        `/store/update/${editedItem.id}`,
        {
          name: editedItem.name,
          address: editedItem.address,
          location: editedItem.location,
          full_name: editedItem.full_name,
          email: editedItem.email,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Clear the editing state
      setStoreItems((prevItems) =>
        prevItems.map((item, i) => ({ ...item, editing: false }))
      );

      // Refetch data to update the UI
      fetchData();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleCancelEdit = (index) => {
    // Clear the editing state
    setStoreItems((prevItems) =>
      prevItems.map((item, i) => ({ ...item, editing: false }))
    );
  };

  const handleFieldChange = (index, field, value) => {
    // Update the edited field value
    setStoreItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <CCard>
      <CCardHeader>
        <div className="d-flex justify-content-between">
          <h3>Store List</h3>
          <Link className="btn btn-dark" to="/login/storeadd">
            StoreAdd
          </Link>
        </div>
      </CCardHeader>
      <CCardBody>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"> Sno </th> <th scope="col"> Name </th>
              <th scope="col"> Address </th> <th scope="col"> Location </th>
              <th scope="col"> Admin name </th> <th scope="col"> Email </th>
              <th scope="col"> Action </th>
            </tr>
          </thead>
          <tbody>
            {storeitems && storeitems.length > 0 ? (
              storeitems.map((item, index) => (
                <tr key={index}>
                  <th scope="row"> {index + 1} </th>
                  <td>
                    {item.editing ? (
                      <CFormInput
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleFieldChange(index, "name", e.target.value)
                        }
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td>
                    {item.editing ? (
                      <CFormInput
                        type="text"
                        value={item.address}
                        onChange={(e) =>
                          handleFieldChange(index, "address", e.target.value)
                        }
                      />
                    ) : (
                      item.address
                    )}
                  </td>
                  <td>
                    {item.editing ? (
                      <CFormInput
                        type="text"
                        value={item.location}
                        onChange={(e) =>
                          handleFieldChange(index, "location", e.target.value)
                        }
                      />
                    ) : (
                      item.location
                    )}
                  </td>
                  <td>
                    {item.editing ? (
                      <CFormInput
                        type="text"
                        value={item.full_name}
                        onChange={(e) =>
                          handleFieldChange(index, "full_name", e.target.value)
                        }
                      />
                    ) : (
                      item.full_name
                    )}
                  </td>
                  <td>
                    {item.editing ? (
                      <CFormInput
                        type="text"
                        value={item.email}
                        onChange={(e) =>
                          handleFieldChange(index, "email", e.target.value)
                        }
                      />
                    ) : (
                      item.email
                    )}
                  </td>
                  <td>
                    {item.editing ? (
                      <>
                        <CButton
                          color="success"
                          onClick={() => handleUpdate(index)}
                        >
                          Save
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => handleCancelEdit(index)}
                        >
                          Cancel
                        </CButton>
                      </>
                    ) : (
                      <CDropdown>
                        <CDropdownToggle color="secondary">
                          Action
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem onClick={() => handleEdit(index)}>
                            Edit
                          </CDropdownItem>
                          <CDropdownItem>Delete</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <th colSpan={7} scope="row">
                  No record found
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </CCardBody>
    </CCard>
  );
}

export default Store;
