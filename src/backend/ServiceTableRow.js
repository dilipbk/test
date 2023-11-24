import React from "react";
import { CButton, CFormInput, CFormSelect } from "@coreui/react";

const ServiceTableRow = ({
  item,
  parentindex,
  index,
  editingItem,
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleFieldChange,
}) => (
  <tr>
    <td>{index + 1}</td>
    <td>
      {editingItem === index ? (
        <CFormInput
          className=""
          type="text"
          value={item.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
        />
      ) : (
        item.name
      )}
    </td>
    <td>
      {editingItem === index ? (
        <CFormInput
          type="text"
          value={item.price}
          onChange={(e) => handleFieldChange("price", e.target.value)}
        />
      ) : (
        item.price
      )}
    </td>
    <td>
      {editingItem === index ? (
        <CFormSelect
          value={item.visible}
          onChange={(e) => handleFieldChange("visible", e.target.value)}
        >
          <option value="TRUE">TRUE</option>
          <option value="FALSE">FALSE</option>
        </CFormSelect>
      ) : (
        item.visible
      )}
    </td>
    <td>
      {editingItem === index ? (
        <>
          <CButton
            color="dark"
            onClick={() => handleSaveClick(index)}
          >
            Save
          </CButton>&nbsp;
          <CButton
            color="danger"
            onClick={() => handleCancelClick(index)}
          >
            Cancel
          </CButton>
        </>
      ) : (
        <CButton
          color="dark"
          variant="outline"
          
          onClick={() => handleEditClick(index)}
        >
          Edit
        </CButton>
      )}
    </td>
  </tr>
);

export default ServiceTableRow;
