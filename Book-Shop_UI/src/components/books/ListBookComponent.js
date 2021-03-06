import React, { Component } from 'react'
import ApiService from '../../services/ApiService';
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

const style ={
    display: 'flex',
    justifyContent: 'center'
}

class ListBookComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            show: false,
            message: ''
        }
    }

    componentDidMount() {
        ApiService.fetchBooks()
            .then((res) => {
                this.setState({books: res.data})
            });
    }

    deleteBook = (bookId) => {
        ApiService.deleteBook(bookId)
           .then(res => {
               if(res.data != null) {
                this.setState({"show":true, message : 'Book deleted successfully.'});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.setState({
                    books: this.state.books.filter(book => book.id !== bookId)
                });
            } else {
                this.setState({"show":false});
            }
           })
    }

    editBook = (id) => {
        this.props.history.push('/edit-book/'+ id);
    }

    addBook = () => {
        this.props.history.push('/add-book');
    }

    render() {
        const {books} = this.state;
        console.log(books);

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyAlert show = {this.state.show} message = {this.state.message} type = {"error"}/>
                </div>
                <Typography variant="h4" style={style}>Book Details</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addBook()}>
                    Add Book
                </Button>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">title</TableCell>
                            <TableCell align="center">author</TableCell>
                            <TableCell align="center">coverPhotoURL</TableCell>
                            <TableCell align="center">isbnNumber</TableCell>
                            <TableCell align="center">price</TableCell>
                            <TableCell align="center">language</TableCell>
                            <TableCell align="center">genre</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        books.length === 0 ?
                        <TableRow>
                            <TableCell colSpan="6" align="center">No Books Available.</TableCell>
                        </TableRow> 
                        :
                        books.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="center">
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">{row.title}</TableCell>
                                <TableCell align="center">{row.author}</TableCell>
                                <TableCell align="center">{row.coverPhotoURL}</TableCell>
                                <TableCell align="center">{row.isbnNumber}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.language}</TableCell>
                                <TableCell align="center">{row.genre}</TableCell>
                                <TableCell align="center" onClick={() => this.editBook(row.id)}><CreateIcon /></TableCell>
                                <TableCell align="center" onClick={() => this.deleteBook(row.id)}><DeleteIcon /></TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>

            </div>
        );
    }

}

export default ListBookComponent;