import React, { Component } from "react";
import Modal, { IModalProps } from "../shared/components/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import "./BookModal.css";
import HttpClient from "../shared/http/HttpClient";
import Endpoints from "../shared/api/endpoints";


interface IState {
   title: string;
   author: string;
   showError: boolean;
   showInfo: boolean;
   msg: string;
}


export default class BookModal extends Component<IModalProps, IState> {
   constructor(props: never) {
       super(props);
       this.state = {
           title: "",
           author: "",
           showError: false,
           showInfo: false,
           msg: ""
       };
       this.submitBook = this.submitBook.bind(this);
       this.handleChange = this.handleChange.bind(this);
   }


   handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
       const { name, value } = event.target;
       this.setState((prevState) => ({
           ...prevState,
           [name]: value
       }));
   };
  
   submitBook = (event: React.MouseEvent<HTMLButtonElement>): void => {
       event.preventDefault();
       const { title, author } = this.state;
       if (title.length === 0 || author.length === 0) {
           this.setState({ showError: true, msg: "Title and Author are required" });
           return;
       }
       // Using the correct endpoint for creating a new book
       HttpClient.post(Endpoints.books, JSON.stringify({ title, author })).then(() => {
           this.setState({ showError: false, showInfo: true, msg: "Book added successfully" });
       }).catch((error: Record<string, string>) => {
           console.error(error);
           this.setState({ showError: true, showInfo: false, msg: "Some error occurred" });
       });
   };
  


   render(): JSX.Element {
       return (
           <div>
               <Modal open={this.props.open} onClose={this.props.onClose}>
                   <div className="book-modal-container">
                       <div className="modal-content">
                           <div className="modal-title">Add Book</div>
                           <div className="book-modal-desc-container">
                               <div className="book-modal-desc-items">
                                   <TextField
                                       className="bookInput"
                                       size="small"
                                       id="title"
                                       variant="outlined"
                                       label="Title"
                                       name="title"
                                       value={this.state.title}
                                       onChange={this.handleChange}
                                   />
                                   <TextField
                                       className="bookInput"
                                       size="small"
                                       id="author"
                                       variant="outlined"
                                       label="Author"
                                       name="author"
                                       value={this.state.author}
                                       onChange={this.handleChange}
                                   />
                               </div>
                           </div>
                       </div>
                       <div className="modal-form-spacer" />


                       <div className="book-button-container">
                           <Button
                               className="book-modal-button"
                               variant="contained"
                               onClick={this.props.onClose}
                               disableElevation
                           >
                               Cancel
                           </Button>
                           <Button
                               className="book-modal-button"
                               variant="contained"
                               onClick={this.submitBook}
                               color="primary"
                               disableElevation
                           >
                               Add Book
                           </Button>
                       </div>
                       {this.state.showError || this.state.showInfo ?
                           <Alert variant="filled" severity={this.state.showError ? "error" : "info"}>
                               {this.state.msg}
                           </Alert>
                           : null
                       }
                   </div>
               </Modal>
           </div>
       );
   }
}
