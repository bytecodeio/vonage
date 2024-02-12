import React from "react";
import {
  Accordion,
  Button,
  ButtonGroup,
  Col,
  Form,
  Row,
} from "react-bootstrap";

function HowTo() {
  return (
    <div>

      <p>
    <span class="ai">Benji</span> is a generative AI tool that can help you utilize the most Looker has to offer. Do you want to build a Looker dashboard? Just ask Benji! Type your questions into the input field and Benji will guide you. You can ask questions or tell Benji what queries to run. Benji will add, remove, update, or delete what you ask them to.
      </p>
    <p class="mt-3">The moon icon <span class="ai"><i class="fal fa-moon"></i></span> in the top navigation allows you to toggle to dark mode.</p>

    <p class="mt-3">The cloud icon <span class="ai"><i class="fal fa-cloud-upload"></i></span> in the top navigation allows you to save your dashboard.</p>


    <p class="mt-3">The history icon <span class="ai"><i class="fal fa-history"></i></span> in the left side tab can be toggled open and you can access the history of your typed questions.</p>


    <p class="mt-3">The share icon <span class="ai"><i class="fal fa-share-square"></i></span> in the right side tab can be toggled open and you can share your Looker dashboard multiple ways (Slack, email, or copying your link).</p>





    </div>
  );
}

export default HowTo;
