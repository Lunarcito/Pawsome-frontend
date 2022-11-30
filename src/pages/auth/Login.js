import axios from 'axios';
import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
const CFaLock = chakra(FaLock);

export default function Login() {
   const { storeToken, authenticateUser } = useContext(AuthContext);
   const [user, setUser] = useState({
      email: '',
      password: ''
   });

   const [showPassword, setShowPassword] = useState(false);
   const handleShowClick = () => setShowPassword(!showPassword);

   const [errorMessage, setErrorMessage] = useState(undefined);
   const navigate = useNavigate();

   const handleChange = (e) => {
      setUser(prev => {
         return {
            ...prev,
            [e.target.name]: e.target.value
         }
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, user);
         toast.success('Welcome back!')
         storeToken(response.data.authToken);
         authenticateUser();
         navigate('home');

      } catch (error) {
         setErrorMessage(error.response.data.message)
      }
   }

   return (
      <div>
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
        <Image
        borderRadius='full'
        boxSize='120px'
        src='../logoPaw.png' 
        alt='LogoPAw'/>

        <Heading color="teal.400">Welcome</Heading>
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
                    children={<CFaUserAlt color="gray.300" />}                  
                  />
               <Input type="email" name="email" placeholder="email address" value={user.name} onChange={handleChange}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}                   
                  />
                  <Input
                    name="password" 
                    type={ showPassword? "text" :"password"}
                    placeholder="Password"
                    value={user.password} 
                    onChange={handleChange} 
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}> 
                    {showPassword? "hide" :"show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link href='/forgotPassword' color="teal.500">
                  forgot password?
                    </Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >Login

              </Button>
            </Stack>
        </Box>
      </Stack>
      <Box>
        New to us? 
        <Link href='/signup' color="teal.500">
       Sign up
        </Link>
      </Box>
      <Box>
        Sign Later?
        <Link href='/home' color="teal.500">
          Start searching
        </Link>
      </Box>
    </Flex>
            </form>
         
      </div>
   )
}
