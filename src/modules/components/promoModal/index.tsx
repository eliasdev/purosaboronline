import React, { useState, useEffect } from "react";
import { Backdrop, Modal } from "@mui/material";
import Cookies from "js-cookie";
import currentPromo from "../../../assets/promo.gif";

const PromoModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const showModalCookie = Cookies.get("showModal");

    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDay = new Date().getDay();

    // Check if the cookie doesn't exist and it's Friday (5), Saturday (6), or Sunday (0)
    if (!showModalCookie && [4, 5, 6].includes(currentDay)) {
      // If it's the weekend and the cookie doesn't exist, show the modal
      setShowModal(true);
      // Set a cookie to prevent the modal from showing again until the next weekend
      Cookies.set("showModal", "false", { expires: 1 }); // Expires in 1 day
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
                <div className="modal-content">
                    <div>
                        <img src={currentPromo} style={{width:"100%", height:"auto"}} alt="promo code"/>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
  );
};

export default PromoModal;
