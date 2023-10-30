import React, { useContext, useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CCol,
  CFormSelect,
  CFormTextarea,
} from "@coreui/react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import DataContext from "../components/Datacontext";

function ServiceList({ tabkey, services, setnotification }) {
  const { store_id } = useContext(DataContext);
  const { auth } = useAuth();
  const [serviceData, setServiceData] = useState(services);
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("pending");
  const [platform, setPlatform] = useState("website");

  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [serviceList, setServiceListData] = useState({});
  const access_token = auth.access_token;
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  // Create a state variable to hold the updated service data with discounts applied

  // Create a state variable to keep track of whether the button should be disabled

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

  const handleUpdateStatus = (e, id) => {
    e.preventDefault();
    const updateData = () => {
      try {
        axios
          .put(
            `/dailyservice/update/${data.id}`,
            {
              status,
              subcategory,
              price,
              comment,
              platform,
              store_id,
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then((response) => {
            const updatedServiceData = serviceData.map((service) => {
              if (service.id === id) {
                return {
                  ...service,
                  status: response.data.DailyServices.status,
                };
              }
              return service;
            });

            setServiceData(updatedServiceData);
            setnotification("Client data Updated");
            setTimeout(() => {
              setnotification("");
            }, 3000);
            setVisible(false);
            navigate("/login/clientservice");
          });

        // window.location.reload();
      } catch (err) {
        setValidated(true);
        console.error("Error updating status:", err);
      }
    };
    updateData();

    // console.log(flag);
  };

  const handelServiceInput = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedPriceRate = selectedOption.getAttribute("pricerate");
    setSubcategory(selectedValue);
    setPrice(selectedPriceRate);
  };
  //   const calculatePrice = (pricerate, discount) => {
  //     const priceRateNumber = parseFloat(pricerate);
  //     const discountPercentage = parseFloat(discount);
  //     const discountedPrice =
  //       priceRateNumber - (priceRateNumber * discountPercentage) / 100;
  //       if (discountedPrice){
  //         return discountedPrice.toFixed(2);
  //       }
  //      // Return price with 2 decimal places
  //   };
  //   const updateDiscount = (serviceIndex, value, id) => {
  //     setDiscounts((prevDiscounts) => ({
  //       ...prevDiscounts,
  //       [serviceIndex]: value,
  //     }));

  //     try {
  //       axios.put(
  //         `/dailyservice/update/${id}`,
  //         {
  //           discount: value,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${access_token}`,
  //           },
  //         }
  //       );
  //     } catch (err) {
  //       setValidated(true);
  //       console.error("Error updating status:", err);
  //     }
  //   };

  //   const calculateTotalPrice = () => {
  //     let totalPrice = 0;

  //     serviceData.forEach((service, serviceIndex) => {
  //       const discount = discounts[serviceIndex] || 0; // Use 0 if no discount provided
  //       const price = parseFloat(calculatePrice(service.price, discount));
  //       totalPrice += price;
  //     });

  //     return totalPrice.toFixed(2); // Return total price with 2 decimal places
  //   };

  //   const calculateTotalPriceForService = (serviceIndex) => {
  //     const discount = discounts[serviceIndex] || 0; // Use 0 if no discount provided
  //     const price = parseFloat(
  //       calculatePrice(serviceData[serviceIndex].price, discount)
  //     );
  //     return price.toFixed(2); // Return total price with 2 decimal places
  //   };

  //   // Function to update the bill table with the updated service list
  //  // Function to update the bill table with the updated service list
  //  const handleUpdateBillTable = () => {
  //   const updatedList = serviceData.map((service, serviceIndex) => ({
  //     ...service,
  //     total: calculateTotalPriceForService(serviceIndex),
  //   }));
  //   setUpdatedServiceData(updatedList);
  //   try {
  //     setIsButtonDisabled(true); // Disable the button after clicking it

  //     axios
  //       .post(
  //         `/bill/store`,
  //         {
  //           servicelist: JSON.stringify(updatedList),
  //           totalprice: calculateTotalPrice(),
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${access_token}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         const updateBill = response.data.Bill;
  //         console.log('bill-id: '+ updateBill.id);
  //           if (updatedList.length > 0) {
  //             const updateBillIdPromises = updatedList.map((el) =>
  //               axios.put(
  //                 `/dailyservice/update/${el.id}`,
  //                 {
  //                   bill_id: updateBill.id,
  //                 },
  //                 {
  //                   headers: {
  //                     Authorization: `Bearer ${access_token}`,
  //                   },
  //                 }
  //               )
  //             );

  //             // Use Promise.all to send all requests and wait for them to complete
  //             Promise.all(updateBillIdPromises)
  //               .then(() => {
  //                 // All requests are successfully completed
  //                 console.log("All requests completed successfully");
  //               })
  //               .catch((error) => {
  //                 // Handle errors here if any request fails
  //                 console.error("Error updating bill_id:", error);
  //               });
  //           }
  //       });
  //   } catch (err) {
  //     setValidated(true);
  //     console.error("Error updating status:", err);
  //   }
  // };

  // useEffect(() => {
  //   console.log(services);
  //   // Disable the button if services.bill_id has a value
  //   const billIds = services.reduce((id, service) => {
  //     return [...id, service.bill_id]
  //   }, [])
  //   console.log(billIds)
  //   if (billIds.length) {
  //     // console.log(services.bill_id)
  //     setIsButtonDisabled(true);
  //   }
  // }, [services.bill_id]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Service Name</th>
            <th scope="col">Subcategory</th>

            <th scope="col">Status</th>
            <th scope="col">Action</th>
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

                <td>{service.status}</td>

                <td>
                  <CButton
                    onClick={() => {
                      fetchData(service.service_id);
                      setVisible(!visible);
                      setData({
                        service_id: service.service_id,
                        id: service.id,
                        service: service.service,
                      });
                    }}
                    color="dark"
                  >
                    Action
                  </CButton>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <CModal
        size="lg"
        backdrop={"static"}
        alignment="center"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Service Setting ({data.service})</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            onSubmit={(e) => handleUpdateStatus(e, data.id)}
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
          >
            <CCol md={6}>
              <CFormSelect
                id="validationDefault01"
                label="Service sub category"
                onChange={handelServiceInput}
                required
              >
                <option disabled>Choose...</option>
                {serviceList.length > 0 &&
                  serviceList.map((item, index) => (
                    <option
                      key={index}
                      pricerate={item?.price}
                      value={item?.name}
                    >
                      {item?.name}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <CFormSelect
                id="validationDefault02"
                label="Platform"
                onChange={(e) => setPlatform(e.target.value)}
                required
              >
                <option disabled>Choose...</option>
                <option value="website">Website</option>
                <option value="groupon">Groupon</option>
                <option value="google">Google</option>
                <option value="facebook">facebook</option>
                <option value="tiktok">Tiktok</option>
                <option value="yelp">Yelp</option>
                <option value="other">Other</option>
              </CFormSelect>
            </CCol>

            <CCol md={3}>
              <CFormSelect
                id="validationDefault03"
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option disabled>Choose...</option>
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancel">Cancel</option>
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormTextarea
                id="service-detals"
                label="Service Details"
                rows={3}
                text="Must be 8-20 words long."
                onChange={(e) => setComment(e.target.value)}
              ></CFormTextarea>
            </CCol>

            <CCol xs={12}>
              <CButton color="dark" type="submit">
                Submit
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </div>
  );
}

export default ServiceList;
