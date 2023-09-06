
import {
    CAvatar,
    CListGroupItem,   
    CPlaceholder,
  } from "@coreui/react";
  import React from 'react';


  const PlaceholderComponent = () => {
    const numIterations = 5;

  const replicatedPlaceholders = Array.from({ length: numIterations }).map((_, index) => (
    
        <CListGroupItem className="placeholder-glow d-flex align-items-center " key={index}>
                <CAvatar
                    className="placeholder"
                    color="secondary"
                    size="xl"
                    animation="glow"
                ></CAvatar>
                <CPlaceholder component="span" animation="glow" md={7}>
                    <CPlaceholder xs={10} className=" py-3" />
                </CPlaceholder>
            </CListGroupItem>
     
    ));
  
    return (
        <>
        {replicatedPlaceholders} 
        </>
    )
    }
  export default PlaceholderComponent;
  
   