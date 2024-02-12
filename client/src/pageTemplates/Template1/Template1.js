import React, { Fragment, useState, useContext, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionCollapse,
  AccordionContext,
  Alert,
  Anchor,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardGroup,
  CardImg,
  Carousel,
  CarouselItem,
  CloseButton,
  Col,
  Collapse,
  Container,
  Dropdown,
  DropdownButton,
  Fade,
  Figure,
  FloatingLabel,
  Form,
  FormCheck,
  FormControl,
  FormFloating,
  FormGroup,
  FormLabel,
  FormSelect,
  FormText,
  Image,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Nav,
  NavDropdown,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
  Overlay,
  OverlayTrigger,
  PageItem,
  Pagination,
  Placeholder,
  PlaceholderButton,
  Popover,
  PopoverBody,
  PopoverHeader,
  ProgressBar,
  Ratio,
  Row,
  SSRProvider,
  SplitButton,
  Stack,
  Tab,
  TabContainer,
  TabContent,
  TabPane,
  Table,
  Tabs,
  ThemeProvider,
  Toast,
  ToastBody,
  ToastContainer,
  ToastHeader,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "react-bootstrap";

// const fetch = require("node-fetch");
// import {fetch} from 'node-fetch';

import AOS from 'aos';
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { TypingEffect } from "react-typing-text-effect";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

import { LOOKER_MODEL, LOOKER_EXPLORE } from "../../utils/constants";
import { ExtensionContext } from "@looker/extension-sdk-react";


import EmbedQuery from "../../components/EmbedQuery";


import TopNav from "../../components/nav/TopNav.js";
import SideForm from "../../components/nav/Form.js";
import SwitchExplore from "../../components/nav/SwitchExplore.js";
import { createQuestion, getChatHistory, updateFeedback } from "../../services/writebackService.js";
import {v4 as uuidv4} from 'uuid'

const Template1 = ({
  currentNavTab,

  selectedFilters,
  setSelectedFilters,
  filterOptions,

  dateFilterOptions,
  fieldOptions,
  isFetchingLookmlFields,
  selectedDateFilter,
  setSelectedDateFilter,
  selectedDateRange,
  setSelectedDateRange,
  dateRange,
  tabKey,
  config,
  showMenu,
  setShowMenu,
  currentInvoiceCount,
  updateInvoiceCount,
  getAllFilters,

  quickFilterOptions,
  quickFilter,
  setQuickFilter,

  setSelectedAccountGroup,
  accountGroupOptions,
  selectedAccountGroup,
  accountGroupField,
  keyword,
  setKeyword,
  handleChangeKeyword,
  url,
}) => {
  const {
    core40SDK: sdk,
    extensionSDK,
    extensionContext,
  } = useContext(ExtensionContext);
  const wrapperRef = useRef(null);
  const [show3, setShow3] = useState();
  const [selectedFields, setSelectedFields] = useState([]);
  const defaultChecked = true;
  const [isDefaultProduct, setIsDefaultProduct] = useState(defaultChecked);
  const [updateButtonClicked, setUpdateButtonClicked] = useState(false);
  const [tabList, setTabList] = useState([]);
  const [currentInnerTab, setCurrentInnerTab] = useState(0);
  const [isFilterChanged, setIsFilterChanged] = useState(false);
  const [queryUrl, setQueryUrl] = useState("");

  const [active, setActive] = useState(false);
  const [faClass, setFaClass] = useState(true);
  const [toggle, setToggle] = useState(true);

  const [slide, setSlide] = React.useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputValue, setInputValue] = useState("");

  const [textValue, setTextValue] = useState("");
  const [showMenu2, setShowMenu2] = useState(false);

  const [showGuy, setShowGuy] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [questions, setQuestions] = useState();

  const [user, setUser] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState({})



  useEffect((e) => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      //setShow3(false);
    }
  };




  useEffect(() => {
    const getContextData = async () => {
      let _user = await sdk.ok(sdk.me())
      setUser(_user);
      //const context = extensionSDK.getContextData();
      //console.log("context", context)
      let res = await getChatHistory(_user.id, sdk);
      //console.log("response",res)
      let _context = res.map(row => {
        return {
          'id':row['id'],
          'question':row['question'],
          'url':row['answer'],
          'timestamp':row['timestamp']
        }
      })
      console.log("context", _context)
      setQuestions(_context)
      //setQuestions(context);
    };
    getContextData();

  }, []);



  const deleteByQuestion = (event) => {

    setQuestions([])

    extensionSDK.saveContextData([]);

  }



  const handleClick = () => {
    setToggle(!toggle);

    setTimeout(() => {
      setActive(!active);

      setFaClass(!faClass);
    }, 600);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
     setShowHeart(false)
    setIsHistory(false);

    setShowMenu2(true);
    setShowGuy(false);
    setIsFetching(true);

    var res = await extensionSDK.serverProxy(
      "https://us-central1-ml-accelerator-dbarr.cloudfunctions.net/function-1",
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: `{"inputValue" : "${inputValue}", "explore" : "events"}`,
      }
    );

    setQueryUrl(res.body);
    setTimeout(function() {
      setIsFetching(false);
    }, 3000)

    setTimeout(function() {
      setShowGuy(true);

    }, 4000)
    setTimeout(function() {

      setShow(true)
    }, 5000)
    var newQuestion = {
      id:uuidv4(),
      question: inputValue,
      url: `https://bytecodeef.looker.com/embed/explore/${res.body}`,
      timestamp: res.headers.date,
    };
    let _newQuestionRes = await createQuestion(newQuestion.id,user.id, newQuestion.question,newQuestion.url,sdk);
    console.log("new question", _newQuestionRes)
    setCurrentQuestion({...newQuestion})


    // Update state with existing questions and add the new question
    setQuestions([...questions, newQuestion]);

    // Save updated context data
    extensionSDK.saveContextData([...questions, newQuestion]);

    var newURL = `https://bytecodeef.looker.com/embed/explore/${queryUrl}`
    console.log(newURL, "this is url")
  };


  const handleSearchButton = async (event) => {
    event.preventDefault();
     setShowHeart(false)
    setIsHistory(false);

    setShowMenu2(true);
    setShowGuy(false);
    setIsFetching(true);


    var res = await extensionSDK.serverProxy(
      "https://us-central1-ml-accelerator-dbarr.cloudfunctions.net/function-1",
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: `{"inputValue" : "${inputValue}", "explore" : "events"}`,
      }
    );

  setQueryUrl(res.body);
    setTimeout(function() {
      setIsFetching(false);
    }, 3000)
    setTimeout(function() {
      setShowGuy(true);

    }, 4000)
    setTimeout(function() {

      setShow(true)
    }, 5000)

    var newQuestion = {
      id:uuidv4(),
      question: inputValue,
      url: `https://bytecodeef.looker.com/embed/explore/${res.body}`,
      timestamp: res.headers.date,
    };
    await createQuestion(newQuestion.id,user.id, newQuestion.question,newQuestion.url,sdk);
    //console.log("new question", _newQuestionRes)
    setCurrentQuestion({...newQuestion})

    console.log(newQuestion)

    // Update state with existing questions and add the new question
    setQuestions([...questions, newQuestion]);

    // Save updated context data
    extensionSDK.saveContextData([...questions, newQuestion]);

    var newURL = `https://bytecodeef.looker.com/embed/explore/${queryUrl}`
    console.log(newURL, "this is url")

  };






  //
  // useEffect(() => {
  // if (queryUrl.length !== 0){
  //
  //
  //     setShowMenu2(false);
  // }
  // }, [queryUrl]);



  const sendMsgToSlack =() => {
    setTextValue(event.target.value)

      fetch("https://benji-412717.ue.r.appspot.com/api/send-message", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          // body: JSON.stringify(<div dangerouslySetInnerHTML={{__html:comment0}} />),
          body: JSON.stringify({ queryUrl, textValue })
          })
          .then((res) => {
          alert("Your message was sent to Slack!")
          if (!res.ok) {
          throw new Error(`Server error ${res.status}`);
          }
          return res.json();
          })
          .catch((error) => {
          console.log(error);
  });
  }


  const [history, setHistory] = useState("");
  const [isHistory, setIsHistory] = useState(false);

  const grabURL = (question) => {

    //e.preventDefault()
    setIsFetching(true);
    setShowGuy(false);
    setIsHistory(true);
     setShowHeart(false)

    setHistory(question.url)
    setCurrentQuestion(question)

    setTimeout(function() {
      setIsFetching(false);
    }, 3000)

    setTimeout(function() {
      setShowGuy(true);
    }, 4000)


  };

  const [showHeart, setShowHeart] = useState(false);


  const handleFeedback = async (feedback) => {
    setShowHeart(true)
    setShowGuy(false)
    let _currentQuestion = {...currentQuestion};
    let res = await updateFeedback(_currentQuestion.id,feedback,sdk)
  }




  return (

<Fragment>
    <TopNav
    questions={questions}
    setQuestions={setQuestions}
    deleteByQuestion={deleteByQuestion}
    grabURL={grabURL}

    />
    <Container fluid>
      <div class="row align-items-center mb-3 mb-5 pb-1">

      {/*<Button variant="primary" onClick={handleShow}>
       Launch demo modal
     </Button>*/}

          <h1 className="mb-0 text-center text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
            <span className="bigger text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Sales Explorer
            </span>


          </h1>


      </div>



      <div class="row position-relative">
      <div class="col-lg-12 col-md-12 col-sm-12">
      <div className="position-relative fancy-short-banner-five">
        <Container>


          <div class="bg-wrapper mb-0">
            <div class="row align-items-center mb-3">
              <div
                class="col-lg-12 text-center text-lg-start aos-init aos-animate"
                data-aos="fade-right"
              >
                <div class="subscribe-form">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(event) => setInputValue(event.target.value)}
                      value={inputValue}
                      placeholder="Please enter your question!"
                    />
                    <a class="btn-go" onClick={handleSearchButton}>
                      Go!
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <img
          class="shapes shape-one"
          src="https://sinco.vercel.app/images/shape/shape_10.svg"
        />
        <img
          class="shapes shape-two"
          src="https://sinco.vercel.app/images/shape/shape_11.svg"
        />
      </div>

</div>
      <div class="col-lg-12 col-md-12 col-sm-12">
      <Container>

      <div class="position-relative moveTopHigh">

      <span class={isFetching ? "demo-btn ripple-btn tran3s" : "demo-btn ripple-btn tran3s hidden"}><i class="fal fa-spinner"></i> Please wait while I get your query ready!</span>

      <div class={showGuy ? "thumbs" : "thumbs hidden"}>
      <p>How did we do?</p>
            <a onClick={() => handleFeedback('positive')}><i class="fal fa-thumbs-up pos"></i></a>

            <a onClick={() => handleFeedback('negative')}><i class="fal fa-thumbs-down neg"></i></a>

      </div>



          <div class={showHeart ? "panel-container" : "panel-container hidden"}>
              <i class="fas fa-heart"></i>
              <p class="xs">Thank You for Your Feedback!</p>


          </div>

        <div class="embed-responsive embed-responsive-16by9 small col-lg-12 col-md-12 col-sm-12 explore">

          <EmbedQuery
            inputValue={inputValue}
            setInputValue={setInputValue}
            // queryId={"boIkRy4qlZmA96P5FSuMqH"}
            queryUrl={queryUrl}
            showMenu2={showMenu2}
            setShowMenu2={setShowMenu2}
            handleSubmit={handleSubmit}
            handleSearchButton={handleSearchButton}
            setShowGuy={setShowGuy}
            showGuy={showGuy}
            history={history}
            isHistory={isHistory}

          />
        </div>
        </div>
      </Container>
      </div>
      </div>

      <Modal show={show} onHide={handleClose} className="small" data-aos="fade-down">
        <Modal.Header>
          <i class="fal fa-times-circle" onClick={handleClose}></i>
          <Modal.Title>Suggested Questions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5>*You can select from one of the suggested questions below or close to continue your search.</h5>
        <ul class="style-none list-item color-rev">
        <li>
        <a href="" onClick={handleClose}>How many unique visitors by traffic source by year as a bar chart</a>
        </li>
        <li>
        <a href="" onClick={handleClose}>What state has the highest conversion rate in the past month</a>
        </li>
        <li>
        <a href="" onClick={handleClose}>What 10 states had the most purchases last year</a>
        </li>
        </ul>
        {/*<a class="btn-eight" onClick={handleClose}>
          Save
        </a>
        <a class="btn-one" onClick={handleClose}>
          Close
        </a>*/}


        </Modal.Body>
        <Modal.Footer>
        <a class="btn-one" onClick={handleClose}>
          Close
        </a>


        </Modal.Footer>
      </Modal>
    </Container>
    <SideForm
    queryUrl={queryUrl}
    sendMsgToSlack={sendMsgToSlack}
    textValue={textValue}
    setTextValue={setTextValue}
    />

    <SwitchExplore/>

    </Fragment>
  );
};

export default Template1;
