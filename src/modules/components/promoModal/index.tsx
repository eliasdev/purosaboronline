import React, { useState, useEffect } from "react";
import { Backdrop, Modal, Grid } from "@mui/material";
import Cookies from "js-cookie";
import { isMobile } from "react-device-detect";
import './index.css';
import promo1 from "../../../assets/promos/1.png";
import promo2 from "../../../assets/promos/2.png";
import promo3 from "../../../assets/promos/3.png";
import promo4 from "../../../assets/promos/4.png";

const promoList = [promo1, promo2, promo3, promo4];

const PromoModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [randomPromo, setRandomPromo] = useState<string | null>(null);

  useEffect(() => {
    const showModalCookie = Cookies.get("showModal");
  
    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDay = new Date().getDay();
  
    // Check if the cookie doesn't exist and it's Friday (5), Saturday (6), or Sunday (0)
    if (!showModalCookie && [4, 5, 6].includes(currentDay)) {
      // If it's the weekend and the cookie doesn't exist, show the modal
  
      // Set a random promo from promoList
      const randomIndex = Math.floor(Math.random() * promoList.length);
      setRandomPromo(promoList[randomIndex]);

      // Set a timeout to close the modal after a random time between 25 and 40 seconds
      const timeoutDuration = Math.floor(Math.random() * (40000 - 25000) + 25000);

      setTimeout(() => {
        setShowModal(true);
      }, timeoutDuration);
  
      // Set a cookie to prevent the modal from showing again until the next weekend
      Cookies.set("showModal", "false", { expires: 1 }); // Expires in 1 day
    } else {
      setShowModal(false); // Ensure showModal is false when conditions are not met
    }
  }, []); // Empty dependency array ensures the effect runs only once
  

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Modal open={showModal} onClose={closeModal}>
      <div>
        <Backdrop open={showModal} onClick={closeModal} style={{ zIndex: 9999 }} />
        <div className="modal-overlay">
          <Grid
          sx={{ width: isMobile? "80%" : "25%", height: isMobile? "63%" : "75%" }}
            container
            justifyContent="center"
            alignItems="center"
            className="modal-content"
          >
            <Grid item xs={12}>
              {randomPromo && (
                <img
                  src={randomPromo}
                  className="responsive-image"
                  alt="promo code"
                />
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </Modal>
  );
};

export default PromoModal;
