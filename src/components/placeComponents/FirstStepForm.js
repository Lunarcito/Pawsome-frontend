import {
    Input,
    InputGroup,
    InputLeftElement,
    chakra,
    FormControl,
  } from "@chakra-ui/react";

  import "./FirstStepForm.css"

  import { FaUserAlt} from "react-icons/fa";
 
  const CFaUserAlt = chakra(FaUserAlt);

function FirstStepForm(props) {
    return (

        <div >
         <h3> Create a pet friendly place </h3>

          <FormControl className="forms">

                <InputGroup>
                  <InputLeftElement className="forms"
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}                  
                  />
               <Input className="forms"type="text" name="name" placeholder="Place's name" value={props.name} onChange={(event) => props.onName(event.target.value)}/>
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement 
                    pointerEvents="none"                    
                  />
               <Input className="forms" type="text" name="address" placeholder="Address" value={props.address}  onChange={(event) => props.onAddress(event.target.value)}/>
                </InputGroup>
              </FormControl>
            
            <hr></hr>
            <select className="forms" value={props.type} onChange={(event) => props.onType(event.target.value)}>
                {props.options.map((option) => (
                    
                    <option key={option.value} value={option.value}>{option.label}</option>
                
                ))}
            </select>
            {props.type === 'Other' && <input type="text" name="type" value={props.typeOther} onChange={(event) => props.onTypeOther(event.target.value)}></input>}
            <hr></hr>
        </div>
    )
}

export default FirstStepForm;