/*
The book project lets a user keep track of different books they would like to read, are currently
reading, have read or did not finish.
Copyright (C) 2020  Karan Kumar

This program is free software: you can redistribute it and/or modify it under the terms of the
GNU General Public License as published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.
If not, see <https://www.gnu.org/licenses/>.
*/

import React, { Component, ReactElement } from "react";
import { Book } from "../types/Book";
import ShelfCarousel from "./ShelfCarousel";

interface ShelfViewProps {
    recommendedBooks: Book[];
    favoriteBooks: Book[];
    readingBooks: Book[];
    toReadBooks: Book[];
    readBooks: Book[];
    didNotFinishBooks: Book[];
    searchText: string;
    refreshMyBooks: () => void;
}

interface IShelfState {
    recommendedBooks: Book[];
    favoriteBooks: Book[];
    readingBooks: Book[];
    toReadBooks: Book[];
    readBooks: Book[];
    didNotFinishBooks: Book[];
    searchText: string;
}

export default class ShelfView extends Component<ShelfViewProps, IShelfState> {
    constructor(props: ShelfViewProps) {
        super(props);
        this.state = {
            recommendedBooks: props.recommendedBooks,
            favoriteBooks: props.favoriteBooks,
            didNotFinishBooks: props.didNotFinishBooks,
            readBooks: props.readBooks,
            readingBooks: props.readingBooks,
            toReadBooks: props.toReadBooks,
            searchText: props.searchText
        };
        this.refreshMyBooks = props.refreshMyBooks;
    }

    refreshMyBooks: () => void;

    render(): ReactElement {
        return (
            <div>
                <ShelfCarousel
                    title="Recommendations"
                    books={this.state.recommendedBooks}
                    searchText={this.state.searchText}
                    refreshMyBooks={this.refreshMyBooks} />
                <ShelfCarousel 
                    title="Favorites"
                    books={this.state.favoriteBooks}
                    searchText={this.state.searchText}
                    refreshMyBooks={this.refreshMyBooks} />
                <ShelfCarousel 
                    title="Reading"
                    books={this.state.readingBooks}
                    searchText={this.state.searchText}
                    refreshMyBooks={this.refreshMyBooks} />
                <ShelfCarousel 
                    title="To Read" 
                    books={this.state.toReadBooks}
                    searchText={this.state.searchText}
                    refreshMyBooks={this.refreshMyBooks} />
                <ShelfCarousel 
                    title="Read"
                    books={this.state.readBooks}
                    searchText={this.state.searchText}
                    refreshMyBooks={this.refreshMyBooks} />
                <ShelfCarousel 
                    title="Did not finish"
                    books={this.state.didNotFinishBooks}
                    searchText={this.state.searchText}
                    refreshMyBooks={this.refreshMyBooks} />
            </div>
        )
    }
}
