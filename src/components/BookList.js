import React from "react";

//to bind graphql to the react
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

//components
import BookDetails from "./BookDetails";

class BookList extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: null
    };
  }
  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBookList(this.props.data)}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }

  displayBookList = () => {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading....</div>;
    } else {
      return data.books.map(book => {
        return (
          <li
            key={book.id}
            onClick={e => {
              this.setState({ selected: book.id });
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  };
}
export default graphql(getBooksQuery)(BookList);
