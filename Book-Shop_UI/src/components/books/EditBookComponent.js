import React, { Component } from 'react'
import ApiService from '../../services/ApiService';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MyAlert from './MyAlert'

const style ={
    display: 'flex',
    justifyContent: 'center'
}

class EditBookComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            title: '',
            author: '',
            coverPhotoURL: '',
            isbnNumber: '',
            price: '',
            language: '',
            genre: '',
            message: '',
            show: false
        }
    }

    componentDidMount() {
        const bookId = +this.props.match.params.id;
        ApiService.fetchBookById(bookId)
            .then((res) => {
                let book = res.data;
                this.setState({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    coverPhotoURL: book.coverPhotoURL,
                    isbnNumber: book.isbnNumber,
                    price: book.price,
                    genre: book.genre,
                    price: book.price,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveBook = (e) => {
        e.preventDefault();
        let book = {id: this.state.id, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age, salary: this.state.salary};
        ApiService.editBook(book)
            .then(res => {
                if(res.data != null) {
                    this.setState({show:true, message : 'Book Updated successfully.'});
                    setTimeout(() => this.setState({show:false}), 3000);
                    setTimeout(() => this.book(), 3000);
                } else {
                    this.setState({show:false});
                }
                console.log(this.state.price)

            });
    }

    bookList = () => {
        return this.props.history.push('/books');
        
    }

    render() {
        console.log(this.state.price)
        return (
            <div>
                 <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyAlert show = {this.state.show} message = {this.state.message} type = {"success"}/>
                </div>
                <Typography variant="h4" style={style}>Edit Book</Typography>
                <form>
                        <TextField type="text" placeholder="title" fullWidth margin="normal" name="title" disabled readonly="true" value={this.state.title}/>
                        <TextField type="text" placeholder="author" fullWidth margin="normal" name="author" value={this.state.author} onChange={this.onChange}/>
                        <TextField type="text" placeholder="coverPhotoURL" fullWidth margin="normal" name="coverPhotoURL" value={this.state.coverPhotoURL} onChange={this.onChange}/>
                        <TextField type="number" placeholder="isbnNumber" fullWidth margin="normal" name="isbnNumber" value={this.state.isbnNumber} onChange={this.onChange}/>
                        <TextField type="number" placeholder="price" fullWidth margin="normal" name="price" value={this.state.price} onChange={this.onChange}/>
                        <TextField type="text" placeholder="language" fullWidth margin="normal" name="language" value={this.state.language} onChange={this.onChange}/>
                        <TextField type="text" placeholder="genre" fullWidth margin="normal" name="genre" value={this.state.genre} onChange={this.onChange}/>
                        <Button variant="contained" color="primary" onClick={this.saveBook}>Save</Button>

                </form>
            </div>
        );
    }
}

export default EditBookComponent;