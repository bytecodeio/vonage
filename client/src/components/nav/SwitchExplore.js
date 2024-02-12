import React, { useState, useRef, useEffect } from "react";

import { Button } from "react-bootstrap";


function SwitchExplore() {
  const [show, setShow] = useState();

  const wrapperRef = useRef(null);

  const handleClick2 = () => {

    setShow(true);
  };

  useEffect((e) => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShow(false);
    } else {
    }
  };

  return (
    <div>

      <div id="slideOut2" className={show ? "showRight" : ""} ref={wrapperRef}>
        <div>
          <div
            id="one"
            className="openTab bottomShadow"
            role="button"
            tabIndex="0"
           onClick={() => setShow(true)}
          >
            <p className="black">
              <i class="fal fa-list"></i>

            </p>
          </div>


        <div
          className="modal-content"

        >
          <div className="modal-header">
            <div className="closeThisPlease" id="close1">
              <h4 className="blackLarger text-center changeTitle">Select Model from List</h4>

              <Button
                role="button"
                className="close white"
                data-dismiss="modal"
                id="closeThisPlease1"
                onClick={() => setShow(false)}
              >
                &#10005;
              </Button>
            </div>
          </div>

          <div className="modal-body block-style-thirteen">
          <ul class="style-none list-item">
          <li>
          <div class="numb tran3s">1</div>
          <h6>sales_demo_the_look</h6>

          </li>
          <li data-aos="fade-up" data-aos-delay="50" class="aos-init">
          <div class="numb tran3s">2</div>
          <h6>excel-multisheet-example</h6>

          </li>
          <li data-aos="fade-up" data-aos-delay="100" class="aos-init">
          <div class="numb tran3s">3</div>
          <h6>traffic_safety</h6>

          </li>
          </ul>


          </div>

        </div>

      </div>
    </div>
      </div>
  );
}

export default SwitchExplore;
