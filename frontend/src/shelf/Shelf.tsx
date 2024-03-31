import React, { Component, ReactElement } from "react";
import { NavBar } from "../shared/navigation/NavBar";
import { Layout } from "../shared/components/Layout";
import BookList from '../shared/book-display/BookList';
import { Book } from '../shared/types/Book';
import "../my-books/MyBooks.css";
import { Button, MenuItem, Select } from "@material-ui/core";
import HttpClient from "../shared/http/HttpClient";
import Endpoints from "../shared/api/endpoints";

interface IState {
    bookList: Book[];
    searchVal: string;
    genres: string[];
}

class Shelf extends Component<Record<string, unknown>, IState> {
    constructor(props: any) {
        const { books } = props.location.state;
        super(props);
        this.state = {
            bookList: books,
            searchVal: '',
            genres: []
        };
        this.getGenres = this.getGenres.bind(this);
    }

    componentDidMount(): void {
        this.getGenres();
    }

    getGenres(): void {
        HttpClient.get(Endpoints.booksGenres).then((genres: string[]) => {
            this.setState({
                genres
            });
        }).catch((error: Record<string, string>) => {
            console.error('error: ', error);
        });
    }

    render(): ReactElement {
        return (
            <Layout title="Shelf" btn={<div className="my-book-top-buttons">
                <Select
                    value={this.state.searchVal}
                    onChange={(event: any) => this.setState({ searchVal: event.target.value as string })}
                    variant="outlined"
                    displayEmpty
                >
                    <MenuItem value="">Filter by Genre</MenuItem>
                    {this.state.genres.map(genre => (
                        <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                    ))}
                </Select>
            </div>}>
                <NavBar />
                <div>
                    <BookList 
                        key={this.state.bookList.length + this.state.searchVal}
                        bookListData={this.state.bookList}
                        searchText={this.state.searchVal} />
                </div>
            </Layout>
        );
    }
}
export default Shelf;
