import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register';
import MyBooks from './my-books/MyBooks';
import Settings from './settings/Settings';
import Goal from './goal/Goal';
import Stats from './statistics/Stats';
import Search from './shared/components/Search';
import DeleteAccount from './delete-account/DeleteAccount';
import BookOverview from './book-overview/BookOverview';
import Shelf from './shelf/Shelf';
import AddBook from './add-book/AddBook'; // Import the AddBook component
import 'bootstrap/dist/css/bootstrap.min.css';
import { HOME, SIGN_IN, SIGN_UP, BOOK_OVERVIEW, MY_BOOKS, GOAL, SETTINGS, DELETE_ACCOUNT, STATS, SEARCH, SHELF, ADD_BOOK } from './shared/routes';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './shared/http/HttpClient';
import { lightTheme, darkTheme } from './shared/theme';

function App(): JSX.Element {
    const [theme, setTheme] = useState(lightTheme);

    function toggleTheme(): void {
        theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme);
    }

    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Route exact path={HOME} component={Login} />
                    <Route path={SIGN_IN} component={Login} />
                    <Route path={SIGN_UP} component={Register} />
                    <Route path={`${BOOK_OVERVIEW}/:id`} component={BookOverview} />
                    <Route path={MY_BOOKS} component={MyBooks} />
                    <Route path={SHELF} component={Shelf} />
                    <Route path={GOAL} component={Goal} />
                    <Route path={SEARCH} component={Search} />
                    <Route path={SETTINGS} render={() => <Settings theme={theme} toggleTheme={toggleTheme} />} />
                    <Route path={DELETE_ACCOUNT} component={DeleteAccount} />
                    <Route path={STATS} component={Stats} />
                    {/* Define a route for the AddBook component */}
                    <Route path={ADD_BOOK} component={AddBook} />
                </BrowserRouter>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;
