import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUserComponent from "./user/ListUserComponent";
import AddUserComponent from "./user/AddUserComponent";
import EditUserComponent from "./user/EditUserComponent";
import React from "react";
import ListBookComponent from './books/ListBookComponent';
import AddBookComponent from './books/AddBookComponent';
import EditBookComponent from './books/EditBookComponent';

const style = {
    color: 'red',
    margin: '10px'
}

const AppRouter = () => {
    return(
        <div>
            <Router>
                <div className="col-md-6">
                    <br/>
                    <Switch>
                        <Route path="/admin_u" exact component={ListUserComponent} />
                        <Route path="/admin_u" component={ListUserComponent} />
                        <Route path="/users" exact component={ListUserComponent} />
                        <Route path="/add-user" component={AddUserComponent} />
                        <Route path="/edit-user/:id" component={EditUserComponent} />
                        
                        <Route path="/admin_b" exact component={ListBookComponent} />
                        <Route path="/admin_b" component={ListBookComponent} />
                        <Route path="/books" exact component={ListBookComponent} />
                        <Route path="/add-book" component={AddBookComponent} />
                        <Route path="/edit-book/:id" component={EditBookComponent} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default AppRouter;