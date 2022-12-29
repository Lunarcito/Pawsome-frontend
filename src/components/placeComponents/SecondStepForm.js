import {
    Input,
    InputGroup,
    InputLeftElement,
    FormControl,
  } from "@chakra-ui/react";

import "./SecondStepForm.css"

function SecondStepForm(props) {

    return (

      <div>
        <h3> Share your experience </h3>
         <div className="forms">
          <FormControl>
            <InputGroup>
            <InputLeftElement
            pointerEvents="none"                  
            />
            <Input type="text" name="description" placeholder="Add a place's description" size="lg" value={props.description} onChange={(event) => props.onDescription(event.target.value)}
            />
            </InputGroup>
            </FormControl>
        </div>
      </div>
      )
    }

export default SecondStepForm;