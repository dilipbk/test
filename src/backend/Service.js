import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import DataContext from "../components/Datacontext";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CFormInput,
} from "@coreui/react";

function Service() {
  const { auth } = useAuth();
  const authToken = auth.access_token;
  const { store_id } = useContext(DataContext);
  const [serviceitems, setServiceItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/getallservices/" + store_id, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setServiceItems(response.data.Services);
    } catch (error) {
      console.error("Error fetching client list:", error);
    }
  };

  const handleEdit = (index) => {
    // Set the item's editing state to true
    setServiceItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, editing: true } : item
      )
    );
  };

  const handleUpdate = async (index) => {
    try {
      const editedItem = serviceitems[index];
      // Perform the update request with edited data
      await axios.put(
        `/services/update/${editedItem.id}`,
        {
          service: editedItem.service,
          duration: editedItem.duration,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Clear the editing state
      setServiceItems((prevItems) =>
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
    setServiceItems((prevItems) =>
      prevItems.map((item, i) => ({ ...item, editing: false }))
    );
  };

  const handleFieldChange = (index, field, value) => {
    // Update the edited field value
    setServiceItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <CCard>
      <CCardHeader>
        <div className="d-flex justify-content-between">
          <h3>Service List</h3>
          <Link className="btn btn-dark" to="/login/serviceadd">
            Service Add
          </Link>
        </div>
      </CCardHeader>
      <CCardBody>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"> Sno </th>
              <th scope="col"> service </th>
              <th scope="col"> duration </th>
              <th scope="col"> Action </th>
            </tr>
          </thead>
          <tbody>
            {serviceitems && serviceitems.length > 0 ? (
              serviceitems.map((item, index) => (
                <tr key={index}>
                  <th scope="row"> {index + 1} </th>
                  <td>
                    {item.editing ? (
                      <CFormInput
                        type="text"
                        value={item.service}
                        onChange={(e) =>
                          handleFieldChange(index, "service", e.target.value)
                        }
                      />
                    ) : (
                      item.service
                    )}
                  </td>
                  <td>
                    {item.editing ? (
                      <CFormInput
                        type="number"
                        placeholder="input in minutes: eg 45"
                        value={item.duration}
                        onChange={(e) =>
                          handleFieldChange(index, "duration", e.target.value)
                        }
                      />
                    ) : (
                      item.duration
                    )}
                  </td>
                  <td>
                    {item.editing ? (
                      <>
                        <CButton
                          color="dark"
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
                      <CButton
                        color="dark"
                        variant="outline"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </CButton>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <th colspan="4" scope="row">
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

export default Service;
