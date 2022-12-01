import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Container,
    Box,
    Link,
    Avatar,
    Image,
    FormControl,
    FormHelperText,
    InputRightElement
  } from "@chakra-ui/react";


  import { FaUserAlt, FaLock } from "react-icons/fa";
 
  const CFaUserAlt = chakra(FaUserAlt);

function FirstStepForm(props) {
    return (
        <div className="addplace-container">
          
          <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}                  
                  />
               <Input type="text" name="name" placeholder="Place's name" value={props.name} onChange={(event) => props.onName(event.target.value)}/>
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"                    
                  />
               <Input type="text" name="address" placeholder="Address" value={props.address}  onChange={(event) => props.onAddress(event.target.value)}/>
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"                    
                  />
               <Input type="text" name="address" placeholder="Type of Place" value={props.address}  onChange={(event) => props.onAddress(event.target.value)}/>
                </InputGroup>
              </FormControl>

            
            <hr></hr>
            <label>Choose a type of place:</label>
            <select value={props.type} onChange={(event) => props.onType(event.target.value)}>
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