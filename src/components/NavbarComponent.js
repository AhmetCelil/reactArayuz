import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";  // Link bileşeni eklendi

function NavbarComponent() {
  return (
    <Navbar color="dark" dark expand="md" className="mb-4">
      <NavbarBrand href="/">Güvende</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/kullanici-ekle">Kullanıcı Ekle</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/kullanici-guncelle">Kullanıcı Güncelle</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/kullanici-verileri">Kullanıcı Verileri</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
