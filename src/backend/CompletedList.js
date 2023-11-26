import React, { useState } from "react";
import { CButton, CFormInput } from "@coreui/react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import { useEffect } from "react";

function CompletedList({ services, setError }) {
  const { auth } = useAuth();
  const [serviceData, setServiceData] = useState(services);

  const [discounts, setDiscounts] = useState({});

  const [serviceList, setServiceListData] = useState({});
  const access_token = auth.access_token;
  const [validated, setValidated] = useState(false);

  // Create a state variable to hold the updated service data with discounts applied
  const [updatedServiceData, setUpdatedServiceData] = useState([]);
  // Create a state variable to keep track of whether the button should be disabled
  const [isTableSaved, setIsTableSaved] = useState(() => {
    return services
      .reduce((ids, service) => [...ids, service.bill_id], [])
      .includes("0");
  });

  const fetchData = async (catid) => {
    try {
      const response = await axios.get("/servicesprice/" + catid, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setServiceListData(response.data.ServicesList);
    } catch (error) {
      console.error("Error fetching client list:", error);
    }
  };

  const calculatePrice = (pricerate, discount) => {
    const priceRateNumber = parseFloat(pricerate);
    const discountedPrice = parseFloat(discount);
    const discountPercentage = discount
      ? ((priceRateNumber - discountedPrice) / priceRateNumber) * 100
      : 0;

    if (discountPercentage > 20) {
      setError("You cannot give discount of more than 20%");
      setTimeout(() => {
        setError("");
      }, 2000);

      return "invalid";
    }

    return discountPercentage.toFixed(2);

    // Return price with 2 decimal places
  };
  const updateDiscount = (serviceIndex, value, id) => {
    setDiscounts((prevDiscounts) => ({
      ...prevDiscounts,
      [serviceIndex]: value,
    }));

    console.log(discounts);

    try {
      axios.put(
        `/dailyservice/update/${id}`,
        {
          discount: value,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    } catch (err) {
      setValidated(true);
      console.error("Error updating status:", err);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    serviceData.forEach((service, serviceIndex) => {
      const discount = discounts[serviceIndex] || 0; // Use 0 if no discount provided
      const price = parseFloat(calculatePrice(service.price, discount));
      totalPrice += price;
      console.log(discount, serviceIndex);
    });

    return totalPrice.toFixed(2); // Return total price with 2 decimal places
  };

  const calculateTotalPriceForService = (serviceIndex) => {
    const discount = discounts[serviceIndex] || 0; // Use 0 if no discount provided
    const price = parseFloat(
      calculatePrice(serviceData[serviceIndex].price, discount)
    );
    return price.toFixed(2); // Return total price with 2 decimal places
  };

  // Function to update the bill table with the updated service list
  // Function to update the bill table with the updated service list
  const handleUpdateBillTable = () => {
    const updatedList = serviceData.map((service, serviceIndex) => ({
      ...service,
      total: calculateTotalPriceForService(serviceIndex),
    }));
    setUpdatedServiceData(updatedList);
    try {
      axios
        .post(
          `/bill/store`,
          {
            servicelist: JSON.stringify(updatedList),
            totalprice: calculateTotalPrice(),
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          const updateBill = response.data.Bill;

          if (updatedList.length > 0) {
            const updateBillIdPromises = updatedList.map((el) =>
              axios.put(
                `/dailyservice/update/${el.id}`,
                {
                  bill_id: updateBill.id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${access_token}`,
                  },
                }
              )
            );

            // Use Promise.all to send all requests and wait for them to complete
            Promise.all(updateBillIdPromises)
              .then(() => {
                // All requests are successfully completed
                console.log("All requests completed successfully");
              })
              .catch((error) => {
                // Handle errors here if any request fails
                console.error("Error updating bill_id:", error);
              });
          }
        });
    } catch (err) {
      setValidated(true);
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    const hasInvalidBillIds = services
      .map((service) => service.bill_id)
      .includes("0");

    if (hasInvalidBillIds) {
      setIsTableSaved(false);
    } else {
      setIsTableSaved(true);
    }
  }, [services, isTableSaved]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Service Name</th>
            <th scope="col">Subcategory</th>

            <th scope="col">Price</th>
            <th scope="col">Discount Amount</th>

            <th scope="col">Discount %</th>
          </tr>
        </thead>
        <tbody>
          {serviceData &&
            serviceData.map((service, serviceIndex) => (
              <tr key={serviceIndex}>
                <th scope="row">{serviceIndex + 1}</th>
                <td>
                  <strong>{service.service}</strong>
                </td>
                {service?.subcategory ? (
                  <td>{service?.subcategory}</td>
                ) : (
                  <td></td>
                )}

                <td>${service.price}</td>

                <td>
                  <CFormInput
                    id={`discount-${serviceIndex}`}
                    type="text"
                    placeholder="Discount"
                    onChange={(e) => {
                      const selectedDiscount = e.target.value;
                      updateDiscount(
                        serviceIndex,
                        selectedDiscount,
                        service.id
                      );
                    }}
                    required
                  />
                </td>
                <td>
                  {service.discount > 0
                    ? calculatePrice(service.price, service.discount)
                    : calculatePrice(service.price, discounts[serviceIndex])}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div>
        <p>
          <strong>Total Price: ${calculateTotalPrice()}</strong>
        </p>
      </div>
      {!isTableSaved && (
        <CButton color="primary" onClick={handleUpdateBillTable}>
          Update Bill Table
        </CButton>
      )}
    </div>
  );
}

export default CompletedList;