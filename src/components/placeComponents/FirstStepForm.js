import {
    Input,
    InputGroup,
    InputLeftElement,
    chakra,
    FormControl,
  } from "@chakra-ui/react";

  import "./FirstStepForm.css"

  import { FaUserAlt} from "react-icons/fa"
  import { Icon } from '@chakra-ui/react'
  import { TiHome } from 'react-icons/ti'
 
  const CFaUserAlt = chakra(FaUserAlt);

function FirstStepForm(props) {
    return (

      <div>
        <h3> Create a pet friendly place </h3>
         <div className= "forms">
          <FormControl>
            <InputGroup>
            <InputLeftElement
            pointerEvents="none"
            children={<CFaUserAlt color="gray.300" />}                  
            />
            <Input type="text" name="name" placeholder="Place's name" value={props.name} onChange={(event) => props.onName(event.target.value)}/>
            </InputGroup>
            </FormControl>
            <div className= "forms">
              <FormControl>
                <InputGroup>
                  <InputLeftElement 
                    pointerEvents="none" 
                    children={<Icon as={TiHome} color="gray.300" />}
                    /> 
               <Input type="text" name="address" placeholder="Address" value={props.address}  onChange={(event) => props.onAddress(event.target.value)}/>
                </InputGroup>
              </FormControl>
              </div>
                    
              <div className= "forms">
                <select value={props.type} onChange={(event) => props.onType(event.target.value)}>
                  {props.options.map((option) => (
                
                <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                
                {props.type === 'Other' && <input type="text" name="type" value={props.typeOther} onChange={(event) => props.onTypeOther(event.target.value)}></input>}
      
              </div>
              
            </div>
       </div>
       
    )
}

export default FirstStepForm;