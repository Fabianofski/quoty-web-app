/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="">
              Lorem
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="">
              Ipsum
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="">
              Dolor
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} {" "}
          <a
            href="https://www.google.com"
            target="_blank"
          >
            FABIANOFSKI
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
