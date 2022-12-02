import {
    Input,
    InputGroup,
    InputLeftElement,
    FormControl,
  } from "@chakra-ui/react";

function SecondStepForm(props) {

    return (
        <div>
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
    )
}

export default SecondStepForm;