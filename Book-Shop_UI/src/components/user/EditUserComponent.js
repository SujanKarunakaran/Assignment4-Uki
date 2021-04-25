import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MyAlert from './MyAlert'
import ApiService from '../../services/ApiService';

const style ={
    display: 'flex',
    justifyContent: 'center'
}

class EditUserComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            userName: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            show: false,
            message: ''
        }
    }

    componentDidMount() {
        const userId = +this.props.match.params.id;
        ApiService.fetchUserById(userId)
            .then((res) => {
                let user = res.data;
                this.setState({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    salary: user.salary,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveUser = (e) => {
        e.preventDefault();
        let user = {id: this.state.id, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age, salary: this.state.salary};
        ApiService.editUser(user)
            .then(res => {
                if(res.data != null) {
                    this.setState({show:true, message : 'User Updated successfully.'});
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

    render() {
        return (
            <div>
                 <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyAlert show = {this.state.show} message = {this.state.message} type = {"success"}/>
                </div>
                <Typography variant="h4" style={style}>Edit User</Typography>
                <form>
                        <TextField placeholder="First Name" fullWidth margin="normal" name="firstName" value={this.state.firstName} onChange={this.onChange}/>
                        <TextField placeholder="Last name" fullWidth margin="normal" name="lastName" value={this.state.lastName} onChange={this.onChange}/>
                        <TextField type="number" placeholder="age" fullWidth margin="normal" name="age" value={this.state.age} onChange={this.onChange}/>
                        <TextField type="number" placeholder="salary" fullWidth margin="normal" name="salary" value={this.state.salary} onChange={this.onChange}/>
                        <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
                </form>
            </div>
        );
    }
}

export default EditUserComponent;