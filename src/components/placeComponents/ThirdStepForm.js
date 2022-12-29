import {
    Input,
    InputGroup,
    InputLeftElement,
    FormControl,
  } from "@chakra-ui/react";

  import { Icon } from '@chakra-ui/react'
  import { TiSocialInstagram} from 'react-icons/ti'
  import { TiSocialFacebook} from 'react-icons/ti'
  

  import "./ThirdStepForm.css"


function ThirdStepForm(props) {

    return (
        <div>
            
            <h3> Upload photos and social media</h3>
            
            <div className="forms">
               
                <input type="file" accept="image/png, image/jpeg, image/jpg" multiple="multiple" name="pictures"  onChange={event => props.onFiles(Array.from(event.target.files))} />

            <div className="forms">

                <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"  
                    children={<Icon as={TiSocialInstagram} color="gray.300" />}
                    /> 
               <Input type="text" name="socialMedia" placeholder="Add Instagram" value={props.socialMedia} onChange={(event) => props.onSocialmedia(event.target.value)}
               />
                </InputGroup>
              </FormControl>
            </div>
            <div className="forms">
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={TiSocialFacebook} color="gray.300" />}               
                  />
               <Input type="text" name="socialMedia1" placeholder="Add Web Page" value={props.socialMedia} onChange={(event) => props.onSocialmedia1(event.target.value)}
               />
                </InputGroup>
              </FormControl>
            </div>

            </div>
            
        </div>
       
    )
}

export default ThirdStepForm;