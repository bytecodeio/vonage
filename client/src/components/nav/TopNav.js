import React,{ useContext, useState, useEffect } from "react";
import { Accordion, Button } from "react-bootstrap";
import { ExtensionContext } from "@looker/extension-sdk-react";
import * as moment from 'moment'


function TopNav({ props, questions, setQuestions, deleteByQuestion, grabURL }) {
  const extensionContext = useContext(ExtensionContext);
  const sdk = extensionContext.core40SDK;
  const [show5, setShow5] = React.useState();

  const [navList, setNavList] = useState([])

  const wrapperRef = React.useRef(null);

  useEffect((e) => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShow5(false);
    }
  };






  return (
    <div>
      <div id="slideOut5" className={show5 ? "show" : ""} ref={wrapperRef}>
        <div className="back">
          <div
            id="one5"
            className=""
            role="button"
            tabIndex="0"
            onClick={() => setShow5(true)}
          >
            <p>
        <i class="fal fa-history"></i>
            </p>
          </div>
        </div>

        <div className="modal-content mt-1">
          <div className="modal-header">
            <p className="strong">Chat History</p>
            <div className="closeThisPlease" id="close1">
              <Button
                role="button"
                className="close"
                data-dismiss="modal"
                id="closeThisPlease1"
                onClick={() => setShow5(false)}
              >
                <i className="fal fa-angle-double-left"></i>
              </Button>
            </div>
          </div>
          <div className="modal-body">




        <Button className="tiny" onClick={() => deleteByQuestion()}>Delete History</Button>


           <div class="mt-0">
          {questions?.toReversed().map((question) => (
            <div class="chat-bubble bot" key={question?.id}>
              <a href="#" onClick={(e) => {grabURL(question);}} >{question?.question}</a>
              <p class="small">{moment(question?.timestamp).format('MMMM Do YYYY, h:mm:ss a') + ' GMT'}</p>
            </div>
          ))}

          </div>



          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
