import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import MyAlert from './MyAlert'
import ApiService from '../../services/ApiService';

const style ={
    display: 'flex',
    justifyContent: 'center'
}

class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            show: false,
            message: ''
        }
    }
    

    componentDidMount() {
        ApiService.fetchUsers()
            .then((res) => {
                this.setState({users: res.data})
            });
    }

    deleteUser = (userId) => {
        ApiService.deleteUser(userId)
           .then(res => {
               if(res.data != null) {
                this.setState({"show":true, message : 'User deleted successfully.'});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.setState({
                    users: this.state.users.filter(user => user.id !== userId)
                });
            } else {
                this.setState({"show":false});
            }
           })
    }

    editUser = (id) => {
        this.props.history.push('/edit-user/'+ id);
    }

    addUser = () => {
        this.props.history.push('/add-user');
    }

    render() {
        const {users} = this.state;
        console.log(users);
        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyAlert show = {this.state.show} message = {this.state.message} type = {"error"}/>
                </div>
                <Typography variant="h4" style={style}>User Details</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addUser()}>
                    Add User
                </Button>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">FirstName</TableCell>
                            <TableCell align="center">LastName</TableCell>
                            <TableCell align="center">Age</TableCell>
                            <TableCell align="center">Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        users.length === 0 ?
                        <TableRow>
                            <TableCell colSpan="6" align="center">No Users Available.</TableCell>
                        </TableRow> 
                        :
                        users.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="center">
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">{row.firstName}</TableCell>
                                <TableCell align="center">{row.lastName}</TableCell>                                
                                <TableCell align="center">{row.age}</TableCell>
                                <TableCell align="center">{row.salary}</TableCell>
                                <TableCell align="center" onClick={() => this.editUser(row.id)}><CreateIcon /></TableCell>
                                <TableCell align="center" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
                

            </div>
        );
    }

}

export default ListUserComponent;