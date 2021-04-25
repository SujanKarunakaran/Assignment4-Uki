import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MyAlert from './MyAlert'
import ApiService from '../../services/ApiService';

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'

}

class AddUserComponent extends Component{
    constructor(props){
        super(props);
        this.state ={
            firstName: '',
            lastName: '',
            password: '',
            age: '',
            salary: '',
            message: '',
            show: false
        }
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            password: this.state.password, 
            age: this.state.age, 
            salary: this.state.salary
        };

        ApiService.addUser(user)
            .then(res => {
                if(res.data != null) {
                    this.setState({show:true, message : 'User added successfully.'});
                    setTimeout(() => this.setState({show:false}), 3000);
                    setTimeout(() => this.userList(), 3000);
                } else {
                    this.setState({show:false});
                }
            });
    }

    userList = () => {
        return this.props.history.push('/users');
    }

    onChange = (e) =>
        this.setState({ 
            [e.target.name]: e.target.value 
        });

    render() {
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyAlert show = {this.state.show} message = {this.state.message} type = {"success"}/>
                </div>
                
                <Typography variant="h4" style={style}>Add User</Typography>
                <form style={formContainer}>
                    <TextField placeholder="First Name" fullWidth margin="normal" name="firstName" value={this.state.firstName} onChange={this.onChange}/>
                    <TextField placeholder="Last name" fullWidth margin="normal" name="lastName" value={this.state.lastName} onChange={this.onChange}/>
                    <TextField type="password" placeholder="password" fullWidth margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>
                    <TextField type="number" placeholder="age" fullWidth margin="normal" name="age" value={this.state.age} onChange={this.onChange}/>
                    <TextField type="number" placeholder="salary" fullWidth margin="normal" name="salary" value={this.state.salary} onChange={this.onChange}/>
                    <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
                </form>
            </div>
        );
    }
}

export default AddUserComponent;