import React from "react";

//to bind graphql to the react
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetails extends React.Component {
  render() {
    console.log(this.props);
    const { book } = this.props.data;

    if (book) {
      return (
        <div id="book-details">
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return (
        <div id="book-details">
          <p>Select book to display it's content...</p>
        </div>
      );
    }
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
