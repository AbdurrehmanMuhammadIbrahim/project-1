import './App.css';
import Signup from './components/Signup/Signupform';
import Login from './components/Login/LoginForm';
import Profile from './components/Profile/Profile';
import Splash from "./components/Splashscreen/splashscreen";
import Dashboard from './components/Dashboard/Dashboard';



import axios from 'axios';
import { baseurl } from './core';
import { useEffect } from 'react';
import {
  BrowserRouter as 
  Router,
  Switch,
  useHistory,
  Route,
  Redirect,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Navbar, Container, Nav,NavDropdown,FormControl,Offcanvas } from 'react-bootstrap';


import { GlobalContext } from './context/Context';
import { useContext } from "react";

function App() {

  let history = useHistory();
  let { state, dispatch } = useContext(GlobalContext);


  
  const logout = () => {
    axios.post(`${baseurl}/api/v1/logout`, {}, {
      withCredentials: true
    })
      .then((res) => {
        console.log("res +++: ", res.data);
  
        dispatch({
          type: "USER_LOGOUT"
        })
      })
  }

  useEffect(() => {

    axios.get(`${baseurl}/api/v1/profile`, {
      withCredentials: true
    })
      .then((res) => {
        console.log("res: ", res.data);

        if (res.data.email) {

          dispatch({
            type: "USER_LOGIN",
            payload: {
              name: res.data.name,
              email: res.data.email,
              lastName: res.data.lastName,
              _id: res.data._id
            }
          })
        } else {
          dispatch({ type: "USER_LOGOUT" })
        }
      }).catch((e) => {
        dispatch({ type: "USER_LOGOUT" })
      })

    return () => {
    };
  }, []);


  return (
    <>

    
{(state?.user?.email) ?


<Navbar bg="secondary" expand={false}>
  <Container fluid>
    <Navbar.Brand href="#">Al Hamd</Navbar.Brand>
    
    <Navbar.Toggle aria-controls="offcanvasNavbar" />
    
    <Navbar.Offcanvas
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel" >Al Hamd</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">

        <Nav.Link onClick={() => { history.push("/profile") }}>Profile</Nav.Link>
       <Nav.Link onClick={() => { history.push("/") }}>Dashboard</Nav.Link>
       <Nav.Link variant="outline-primary" onClick={logout}>Logout</Nav.Link><br/>
          {/* <Nav.Link href="#action1">Home</Nav.Link>
          <Nav.Link href="#action2">Link</Nav.Link> */}
          <NavDropdown title="Don't click" id="offcanvasNavbarDropdown">
            <NavDropdown.Item href="#action3">Don't click</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Samajh nhi aaeii"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Container>
</Navbar>



// <Navbar bg="light" expand="lg">
//   <Container>
//     <Navbar.Brand href="#home">AL HAMD</Navbar.Brand>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//       <Nav className="me-auto">
      
//         <Nav.Link onClick={() => { history.push("/profile") }}>Profile</Nav.Link>
//         <Nav.Link onClick={() => { history.push("/") }}>Dashboard</Nav.Link>
//       </Nav>
//       <Form className="d-flex">
//         <Button variant="outline-primary" onClick={logout}>Logout</Button>
//       </Form>
//     </Navbar.Collapse>
//   </Container>
// </Navbar>
:


<Navbar bg="light" expand={false}>
  <Container fluid>
    <Navbar.Brand href="#">Al Hamd</Navbar.Brand>
    <Navbar.Toggle aria-controls="offcanvasNavbar" />
    <Navbar.Offcanvas
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel"  >Al Hamd</Offcanvas.Title>
      </Offcanvas.Header >
      <Offcanvas.Body  >
        <Nav className="justify-content-end flex-grow-1 pe-3"> 
        <Nav.Link onClick={() => { history.push("/login") }}>Login</Nav.Link>
            <Nav.Link onClick={() => { history.push("/") }}>Signup</Nav.Link>
            <Nav.Link onClick={() => { history.push("/") }}>Dashboard</Nav.Link><br/>

          <NavDropdown title="Don't click" id="offcanvasNavbarDropdown">
            <NavDropdown.Item href="#action3">Don't click</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Samajh nhi aaeii"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Container>
</Navbar>






      // <Navbar bg="light" expand="lg">
      //   <Container>
      //     <Navbar.Brand href="#home">AL HAMD</Navbar.Brand>
      //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
      //     <Navbar.Collapse id="basic-navbar-nav">
      //       <Nav className="me-auto">
      //         <Nav.Link onClick={() => { history.push("/") }}>Dashboard</Nav.Link>
      //         <Nav.Link onClick={() => { history.push("/login") }}>Login</Nav.Link>
      //         <Nav.Link onClick={() => { history.push("/") }}>Signup</Nav.Link>

      //       </Nav>
      //     </Navbar.Collapse>
      //   </Container>
      // </Navbar>

}
      {(state.user === undefined) ?
        <Switch>
          <Route exact path="/">
          
          <Splash/>
          </Route>
        </Switch>
        : null}

      {(state.user === null) ?
        <Switch>
          <Route  path="/login" component={Login} />
          <Route exact path="/" component={Signup} />
          <Redirect to="/login" />
        </Switch> : null
      }

      {(state.user) ?
        <Switch>
         <Route exact path="/">
            <Dashboard />
            <Redirect to="/" />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>

        </Switch>
        : null}





    </>
  );
}

export default App;


