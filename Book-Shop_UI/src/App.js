import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import MenuIcon from '@material-ui/icons/Menu';
import { Paper, Typography, AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import { AccountCircle } from "@material-ui/icons";
import Footer from "./components/Footer";

const style = {
  paper: {
    flexGrow: 1,
    backgroundColor: '#302f2b',
    color: '#c5cae9'
  },
  menuButton: {
    spacing: 2,
  },
  link: {
    underline: 'none'
  },
  appBar: {
    backgroundColor: "#302f2b"
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      value: 0
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router>
        <div>
          <AppBar position="static" style={style.appBar}>
            <Toolbar>
              <Paper style={style.paper} elevation={0}>
                <IconButton edge="start" style={style.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Button href="/" color='inherit'>
                  <Typography><strong>Book Shop</strong></Typography>
                </Button>
                <Button href="/home" color='inherit'>
                  <strong>Home</strong>
                </Button>
                {showModeratorBoard && (
                  <Button href="/mod" color='inherit'>
                    <strong>Moderator Board</strong>
                  </Button>
                )}
                
                {showAdminBoard && (
                  <div>
                  <Button href="/admin_u" color='inherit'>
                    <strong>Admin Board User</strong>
                  </Button>

                  <Button href="/admin_b" color='inherit'>
                    <strong>Admin Board Book</strong>
                  </Button>
                  </div>
                )}
                {currentUser && (
                  <Button href="/user" color='inherit'>
                    <strong>User</strong>
                  </Button>
                )}
                {currentUser && (
                  <Button href="/user" color='inherit'>
                    <strong>Add Book</strong>
                  </Button>
                )}
              </Paper>
              
              {currentUser ? (
                <Paper style={{'backgroundColor': '#302f2b', 'color': '#c5cae9'}} elevation={0}>
                  <Button href="/profile" color='inherit'>
                    <AccountCircle style={{ fontSize: 40 }}/>
                    <strong>{currentUser.username}</strong>
                  </Button>
                  <Button href="/login" color='inherit' onClick={this.logOut}>
                    <strong>LogOut</strong>
                  </Button>
                </Paper>
              ) : (
                <Paper style={{'backgroundColor': '#302f2b', 'color': '#c5cae9'}} elevation={0}>
                  <Button href="/login" color='inherit'>
                    <strong>Login</strong>
                  </Button>
                  <Button href="/register" color='inherit'>
                    <strong>Sign Up</strong>
                  </Button>
                </Paper>
              )}
            </Toolbar>
          </AppBar>
          

          <div>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin_u" component={BoardAdmin} />
              <Route path="/admin_b" component={BoardAdmin} /> 
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;