import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/users';
const USER_API_BASE_URL_BOOK = 'http://localhost:8080/books';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '?id=' + userId);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }

    addUser(user) {
        return axios.post(USER_API_BASE_URL, user);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.id, user);
    }

    fetchBooks() {
        return axios.get(USER_API_BASE_URL_BOOK);
    }

    fetchBookById(bookId) {
        return axios.get(USER_API_BASE_URL_BOOK + '?id=' + bookId);
    }

    deleteBook(bookId) {
        return axios.delete(USER_API_BASE_URL_BOOK + '/' + bookId);
    }

    addBook(book) {
        return axios.post(USER_API_BASE_URL_BOOK, book);
    }

    editBook(book) {
        return axios.put(USER_API_BASE_URL_BOOK + '/' + book.id, book);
    }

}

export default new ApiService();