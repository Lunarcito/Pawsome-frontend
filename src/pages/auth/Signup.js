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
   chakra,
   Container,
   Box,
   Link,
   Avatar,
   FormControl,
   FormHelperText,
   InputRightElement
 } from "@chakra-ui/react";
 
// import { FaUserAlt, FaLock } from "react-icons/fa";
 
// const CFaUserAlt = chakra(FaUserAlt);
// const CFaLock = chakra(FaLock);

export default function Signup() {
   const [user, setUser] = useState({
      username: '',
      email: '',
      name: '',
   })
   const [password, setPassword] = useState('');
   const [passwordControl, setPasswordControl] = useState('');
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

   useEffect(() => {
      if (password !== passwordControl) {
         setErrorMessage("Passwords don't match")
      } else {
         setErrorMessage(undefined)
      }
      // eslint-disable-next-line
   }, [passwordControl])

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { userName: user.username, name: user.name, email: user.email, password });
         navigate('/');
      } catch (error) {
         setErrorMessage(error.response.data.error.message)
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
        <Avatar bg="teal.500" />
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
                  
                  <Input type="email" name="email" placeholder="email address" value={user.name} onChange={handleChange}/>
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
                    type={ "text" }
                    placeholder="Password"
                    value={password} 
                    onChange={handleChange} 
                  />
                  
                  <Input
                    name="passwordControl" 
                    type={ "password" }
                    placeholder="Password"
                    value={passwordControl} 
                    onChange={handleChange} 
                  />

                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm">
                      {"Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link to={"home"} color="teal.500" href="#">
        Skip log in
        </Link>
      </Box>
    </Flex>









            <label>Username</label>
            <input required type="text" name="username" value={user.username} onChange={handleChange} />
            <label>name</label>
            <input required type="text" name="name" value={user.name} onChange={handleChange} />
            <label>Email</label>
            <input required type="email" name="email" value={user.email} onChange={handleChange} />
            <label>Password</label>
            <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>Repeat the password</label>
            <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button type="submit">Register</button>
         </form>
      </div>
   )
}
