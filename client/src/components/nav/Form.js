import React, { useState, useRef, useEffect } from "react";

import { Button } from "react-bootstrap";

import HowTo from "./HowTo";
import Share from "./Share";

function SideForm({sendMsgToSlack, queryUrl, textValue, setTextValue}) {
  const [show, setShow] = useState();
  const [show2, setShow2] = useState(false);
  const wrapperRef = useRef(null);

  const handleClick2 = () => {
    setShow2(true);
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
      <div id="slideOut1" className={show ? "showRight" : ""} ref={wrapperRef}>
        <div className="slideOutTab1">
          <div
            id="one1"
            className="openTab bottomShadow"
            role="button"
            tabIndex="0"
            onClick={() => setShow('glossary')}
          >
            <p className="black">
              <i class="fal fa-share-square"></i>

            </p>
          </div>

          <div
            id="two"
            className="openTab bottomShadow"
            data-dismiss="modal"
            aria-controls="right-nav-contact"
            onClick={() => setShow('how_to')}
          >
            <p className="black">
              <i aria-hidden="true" className="fal fa-info-circle"></i>

            </p>
          </div>
        </div>

        <div
          className="modal-content"
          style={show == "glossary" ? { display: "block" } : { display: "none" }}
        >
          <div className="modal-header">
            <div className="closeThisPlease" id="close1">
              <h4 className="blackLarger text-center changeTitle">Share</h4>

              <Button
                role="button"
                className="close white"
                data-dismiss="modal"
                id="closeThisPlease1"
                onClick={() => setShow('')}
              >
                &#10005;
              </Button>
            </div>
          </div>

          <div className="modal-body padding">
          <Share
          queryUrl={queryUrl}
          sendMsgToSlack={sendMsgToSlack}
          textValue={textValue}
          setTextValue={setTextValue}
          />

          </div>

        </div>

        <div
          className="modal-content info"
          style={show !== 'glossary' ? { display: "block" } : { display: "none" }}
        >
          <div className="modal-header">
            <div className="closeThisPlease" id="close1">
              <h4 className="blackLarger black text-center changeTitle">How To</h4>

              <Button
                role="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setShow('')}
              >
                &#10005;
              </Button>
            </div>
          </div>
          <div className="modal-body how">
            <HowTo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideForm;
