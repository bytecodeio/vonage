import React, {Fragment, useEffect, useState} from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, Spinner, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';

function Share({ sendMsgToSlack, queryUrl, textValue, setTextValue }) {

  const [message, setMessage] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const CopyToClipElement = ({ text }) => {
    const myRef = React.useRef(null);
    const [data, setData] = React.useState(text);
    React.useEffect(() => setData(text), [text]);

    React.useEffect(() => {
      if (myRef.current && data) {
        myRef.current.select();
        document.execCommand("copy");

        setData(null);
      }
    }, [data, myRef.current]);


    return <div>{data && <textarea ref={myRef}>{data}</textarea>}</div>;
  }

  const [copyText, setCopyText] = React.useState("");
  const data = `https://bytecodeef.looker.com/embed/explore/${queryUrl}`



  const [isActive, setActive] = useState(false);

   const toggleClass = (event) => {
    event.stopPropagation();

   console.log('The logout button was clicked');
     setActive(!isActive);
     // setActive2(false);
   };


//
//    const [isActive2, setActive2] = useState(false);
//
//     const toggleClass2 = event => {
//       event.preventDefault()
// console.log("hi there")
//       // setActive2(true);
//        setActive2(true);
//     };
//
//
// console.log(isActive)



    return (




<Fragment>

<div class="download-btn-group">


<a href="#" id="parent" class="d-flex tran3s mb-15" onClick={toggleClass}>


<div class="d-flex" style={{width:"100%"}}><i class="fab fa-slack"></i><span>Share to Slack</span></div>


<div className={`${isActive ? 'slideDown': 'hiddenSlide'}`}>

<i onClick={toggleClass} class="fal fa-times absoClose"></i>

<div class="col-lg-12 col-md-12 col-12">
<div class="mb-3"><label class="form-label">Personalize a message!</label>

<textarea rows="3" class="form-control"


onChange={(event) => setTextValue(event.target.value)}
onClick={event => event.stopPropagation()}
value={textValue}
></textarea>

</div>
</div>

  <a id="btn-go" onClick={() => sendMsgToSlack()}>Send</a>

</div>

</a>
{/*<a href="#" class="d-flex tran3s mb-15"><i class="fal fa-envelope"></i><span>Share to Email</span></a>*/}


<a href="#" class="d-flex tran3s mb-15">
<i class="fal fa-external-link"></i>

<span onClick={function(event){ setCopyText(data); alert("Your link was copied!")}}>Share Link</span>
 <CopyToClipElement text={copyText} />
</a>
</div>

</Fragment>



  )

}

export default Share;
