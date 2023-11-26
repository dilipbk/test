import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import DataContext from "../components/Datacontext";
import ServiceTableRow from "./ServiceTableRow";
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CFormSelect,
  CFormInput,
} from "@coreui/react";

function ServiceSubcategory() {
  const { auth } = useAuth();
  const authToken = auth.access_token;
  const { store_id } = useContext(DataContext);
  const [serviceitems, setServiceItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "/getall-services-category/" + store_id,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setServiceItems(response.data.Services);
    } catch (error) {
      console.error("Error fetching service subcategories:", error);
    }
  };

  const handleEditClick = (index) => {
    // Set the item's editing state to true
    setServiceItems((prevItems) =>
      prevItems.map(
        (service, i) =>
          i === index
            ? { ...service, editing: true }
            : { ...service, editing: false } // Set other items' editing state to false
      )
    );
    setEditingItem(index);
  };

  const handleSaveClick = async (index, childIndex) => {
    console.log("index: "+ index +" childindex: "+ childIndex);
    try {
      const editedItem = serviceitems[index].child[childIndex];
      // Perform the update request with edited data
      await axios.put(`/servicesprice/update/${editedItem.id}`, editedItem, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      // Clear the editing state
      setServiceItems((prevItems) =>
        prevItems.map((service, i) =>
          i === index
            ? {
                ...service,
                child: service.child.map((item, j) =>
                  j === childIndex ? { ...item, editing: false } : item
                ),
              }
            : service
        )
      );
  
      setEditingItem(null);
      // Refetch data to update the UI
      fetchData();
    } catch (error) {
      console.error("Error updating service subcategory:", error);
    }
  };

  const handleCancelClick = (index) => {
    // Clear the editing state
    setServiceItems((prevItems) =>
      prevItems.map((service) => ({ ...service, editing: false }))
    );
    setEditingItem(null);
  };

  const handleFieldChange = (parentIndex, childIndex, field, value) => {
    // Update the edited field value
    setServiceItems((prevItems) =>
      prevItems.map((service, i) =>
        i === parentIndex
          ? {
              ...service,
              child: service.child.map((item, j) =>
                j === childIndex ? { ...item, [field]: value } : item
              ),
            }
          : service
      )
    );
  };
  return (
    <CCard>
      <CCardHeader>
        <div className="d-flex justify-content-between">
          <h3>Service Subcategory List</h3>
          <Link className="btn btn-dark" to="/login/service-category-add">
            Subcategory Add
          </Link>
        </div>
      </CCardHeader>
      <CCardBody>
        {serviceitems && serviceitems.length > 0 ? (
          <CAccordion>
            {serviceitems.map((service, index) => (
              <CAccordionItem key={index}>
                <CAccordionHeader>
                  <span className="text-capitalize">
                    <strong>{service.service}</strong>
                  </span>
                </CAccordionHeader>
                <CAccordionBody>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sno</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Visible</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {service.child.map((item, rowIndex) => (
                        <ServiceTableRow
                        key={rowIndex}
                        index={rowIndex}  // Pass the index prop here
                        item={item}
                        editingItem={editingItem}
                        handleEditClick={() => handleEditClick(rowIndex)}
                        handleSaveClick={(childIndex) => handleSaveClick(rowIndex, childIndex)}
                        handleCancelClick={() => handleCancelClick(rowIndex)}
                        handleFieldChange={(field, value) =>
                          handleFieldChange(index, rowIndex, field, value)
                        }
                      />
                      ))}
                    </tbody>
                  </table>
                </CAccordionBody>
              </CAccordionItem>
            ))}
          </CAccordion>
        ) : (
          <tr>
            <th colSpan="5" scope="row">
              No record found
            </th>
          </tr>
        )}
      </CCardBody>
    </CCard>
  );
}

export default ServiceSubcategory;
