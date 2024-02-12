import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ExtensionContext } from "@looker/extension-sdk-react";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

import AOS from 'aos';
import "aos/dist/aos.css";

import Tilt from 'react-parallax-tilt';


const Explore = styled.div`
  width: 100%;
  min-height: unset;
  & > iframe {
    width: 100%;
    height: 100%;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmbedQuery = ({ queryId, queryUrl, inputValue, setInputValue,  showMenu2, setShowMenu2, handleSearchButton, handleSubmit, setShowGuy, showGuy, history, isHistory }) => {
  const { core40SDK: sdk, extensionSDK, extensionContext } = useContext(ExtensionContext);

  useEffect(() => {
  AOS.init({
    duration: 1200,
  });
}, []);

  const [file, setFile] = useState();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (queryUrl !== "") {
      // console.log(queryUrl, "test");
      setUrl(queryUrl);
    }
  }, [queryUrl]);

  // console.log(inputValue, "this is the input!")

  //  const handleSubmit = event => {
  //    console.log('handleSubmit ran');
  //    // event.preventDefault();
  //    //
  //    // console.log(inputValue)
  //     setInputValue(event.target.value)

  //  };

  // useEffect(() => {
  // const context = extensionSDK.getContextData();
  // const initialize = async () => {
  //   let res = await extensionContext.extensionSDK.serverProxy(
  //     "https://us-central1-ml-accelerator-dbarr.cloudfunctions.net/function-1",
  //     {
  //       headers: {
  //         "Content-type": "application/x-www-form-urlencoded",
  //       },
  //       method: "POST",
  //       body: inputValue,
  //     }
  //   );

  //   console.log("res", res);
  //   setUrl(res);

  //   context.push({
  //     question: inputValue,
  //     url: res,
  //     timestamp: Date.Now(),
  //   });
  //   extensionSDK.saveContextData(context);
  // };
  // initialize();
  // }, []);

  //
  // useEffect(() => {
  //   const initialize = async () => {
  //     let res = await extensionContext.extensionSDK.serverProxy(
  //       "https://us-central1-ml-accelerator-dbarr.cloudfunctions.net/function-1",
  //       {
  //         headers: {
  //           "Content-type": "application/x-www-form-urlencoded",
  //         },
  //         method: "POST",
  //         body: inputValue,
  //       }
  //     );
  //
  //     setUrl(res);
  //
  //
  //   };
  //   initialize();
  // }, []);

  const embedCtrRef = useCallback(
    (el) => {
      const hostUrl = extensionSDK.lookerHostData.hostUrl;
      // "https://looker.bytecode.io/embed/query/rebecca_thompson_project/order_items?qid=boIkRy4qlZmA96P5FSuMqH&sdk=2&embed_domain=https://looker.bytecode.io&sandboxed_host=true"
      if (el && hostUrl && queryUrl) {
        el.innerHTML = "";
        LookerEmbedSDK.init(hostUrl);

        // const build = queryUrl;

        const build = `https://bytecodeef.looker.com/embed/explore/${queryUrl}`


        LookerEmbedSDK.createExploreWithUrl(build)
          .appendTo(el)
          .build()
          .connect()

          .catch((error) => {
            console.error("Connection error", error);
          });
      }
    },
    [url]
  );


const land = `sales_demo_the_look/order_items?qid=p2YnbEvJdjgrj7mPvP6cZ3&origin_space=434&toggle=pik,vis`

const landingURL = `https://bytecodeef.looker.com/embed/explore/${land}`


console.log("is history", isHistory)

console.log(history)
  return (

<Wrapper>
 {queryUrl && isHistory === false ?
    <Fragment>
       <Explore ref={embedCtrRef} />
    </Fragment>
   : isHistory === true ? <div class="embed-responsive embed-responsive-16by9 col-lg-12 col-md-12 col-sm-12">
      <iframe style={{width: "100%", height:"100%"}} allow="" frameborder="0" src={history}></iframe>
      </div>
   :
   <div class="embed-responsive embed-responsive-16by9 col-lg-12 col-md-12 col-sm-12">
   <iframe style={{width: "100%", height:"100%"}} allow="" frameborder="0" src={landingURL}></iframe>
   </div>


  }


</Wrapper>



  );
};

export default EmbedQuery;
