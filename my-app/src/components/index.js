import React, { Component } from 'react'
import {Navbar} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render() {
      return (
          <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Navbar.Brand as={Link} to={"/*"} className={'ms-2'}>Barcode</Navbar.Brand>
            </Navbar>
          </>
    )
  }
}
