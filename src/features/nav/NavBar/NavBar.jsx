import React, { Component } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import SignOutMenu from '../Menu/SignOutMenu';
import SignInMenu from '../Menu/SignInMenu';

class NavBar extends Component {
  state = {
    authenticated: false
  }

  handleSignIn = () => {
    this.setState(
      {
        authenticated: true
      })
  }

  handleSignOut = () => {
    this.setState({
      authenticated: false
    })
    this.props.history.push("/");
  }

  render() {
    const { authenticated } = this.state;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/logo.png" alt="logo" />
            Events Manager
            </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          {authenticated &&
            <Menu.Item as={NavLink} to="/peoples" name="Peoples" />
          }
          {authenticated &&
            <Menu.Item>
              <Button 
                as={Link} 
                to={'/createevent'} 
                floated="right" positive inverted 
                content="Create Event" />
            </Menu.Item>
          }
          {authenticated ? (
            <SignInMenu signOut={this.handleSignOut} />
          ) : (
              <SignOutMenu signIn={this.handleSignIn} />
            )}
        </Container>
      </Menu>
    )
  }
}

export default withRouter(NavBar)
