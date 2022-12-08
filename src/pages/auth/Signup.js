import './Signup.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
   Flex,
   Heading,
   Input,
   Button,
   InputGroup,
   Stack,
   InputLeftElement,
   Box,
   Link,
   Image,
   FormControl,
   InputRightElement
 } from "@chakra-ui/react";


export default function Signup() {
   const [user, setUser] = useState({
      username: '',
      email: '',
      name: '',
   })
   const [password, setPassword] = useState('');
   const [passwordControl, setPasswordControl] = useState('');
   const [errorMessage, setErrorMessage] = useState(undefined);
   

   const [showPassword, setShowPassword] = useState(false);
   const handleShowClick = () => setShowPassword(!showPassword);

   
   const navigate = useNavigate();

   const handleChange = (e) => {
      setUser(prev => {
         return {
            ...prev,
            [e.target.name]: e.target.value
         }
      })
   }

   useEffect(() => {
      // eslint-disable-next-line
   }, [passwordControl])

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== passwordControl) {
         setErrorMessage("Passwords don't match")
      } else {
         setErrorMessage(undefined)
      }
      try {
         await axios.post(`${process.env.REACT_APP_API_URL}v1/auth/signup`, { userName: user.username, name: user.name, email: user.email, password });
         navigate('/');
      } catch (error) {
         setErrorMessage(error.response.data.error.message)
      }
   }

   return (

   <div className="sign-in">
       <form onSubmit={handleSubmit}>         
         <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.100"
      justifyContent="center"
      alignItems="center"
    >
    

      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Image className='logo'
        borderRadius='full'
        boxSize='130px'
        src='../logoPaw.png' 
        alt='LogoPaw'/>

        <Heading color="teal.400"> <h6>Sign up</h6></Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"                    
                  />
               <Input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                  />                  
                  <Input type="text" name="name" placeholder="name" value={user.name} onChange={handleChange}/>
                </InputGroup>
              </FormControl>
              
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                  />
                  
                  <Input type="email" name="email" placeholder="email address" value={user.email} onChange={handleChange}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                   />

                  <Input
                    name="password" 
                    type={ showPassword? "text" :"password"}
                    placeholder="Password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}> 
                    {showPassword? "hide" :"show"}
                    </Button>
                  </InputRightElement>
                  Find pet friendly paces
                  <Input
                    name="passwordControl" 
                    type={ showPassword? "text" :"password"}
                    placeholder=" Confirm Password"
                    value={passwordControl} 
                    onChange={(e) => setPasswordControl(e.target.value)} 
                  />
                  
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}> 
                    {showPassword? "hide" :"show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {errorMessage && <p>{errorMessage}</p>}
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Register
              </Button>
            </Stack>
        </Box>
      </Stack>
      <Box>
      <Link href="/" color="teal.500">Log in</Link>
      </Box>
    </Flex>
         </form>
      </div>
   )
}
