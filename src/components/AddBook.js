import React from "react";

//to bind graphql to the react
import { graphql, compose } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  displayAuthor = () => {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading Authors</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };
  addBook = e => {
    e.preventDefault();
    this.setState({
      name: "",
      genre: "",
      authorId: ""
    });
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };
  render() {
    return (
      <form
        className="add-book"
        onSubmit={e => {
          this.addBook(e);
        }}
      >
        <div className="field">
          <label>Book Name</label>
          <input
            type="text"
            value={this.state.name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
        </div>
        <div className="field">
          <label>Genre</label>
          <input
            type="text"
            value={this.state.genre}
            onChange={e => {
              this.setState({ genre: e.target.value });
            }}
          />
        </div>
        <div className="field">
          <label>Author</label>
          <select
            value={this.state.authorId}
            onChange={e => {
              this.setState({ authorId: e.target.value });
            }}
          >
            <option>Select Author</option>
            {this.displayAuthor()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
