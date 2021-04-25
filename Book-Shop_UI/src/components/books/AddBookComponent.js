import React, { Component } from 'react'
import ApiService from '../../services/ApiService';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MyAlert from './MyAlert'

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'

}

class AddBookComponent extends Component{
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

    saveBook = (e) => {
        e.preventDefault();
        let book = {
            id: this.state.id,
            title: this.state.title, 
            author: this.state.author, 
            coverPhotoURL: this.state.coverPhotoURL, 
            isbnNumber: this.state.isbnNumber, 
            price: this.state.price, 
            language: this.state.language,
            genre: this.state.genre
        };

        ApiService.addBook(book)
            .then(res => {
                if(res.data != null) {
                    this.setState({show:true, message : 'Book added successfully.'});
                    setTimeout(() => this.setState({show:false}), 3000);
                    setTimeout(() => this.bookList(), 3000);
                } else {
                    this.setState({show:false});
                }
            });
    }

    bookList = () => {
        return this.props.history.push('/books');
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
                
                <Typography variant="h4" style={style}>Add Book</Typography>
                <form style={formContainer}>
                    <TextField type="text" placeholder="title" fullWidth margin="normal" name="title" value={this.state.title} onChange={this.onChange}/>
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

export default AddBookComponent;