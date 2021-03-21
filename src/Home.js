import { Component } from "react";
import BlogList from "./BlogList";
// import useFetch from "./useFetch";

// const Home = () => {
//   const { data: blogs, isPending, error } = useFetch(
//     "http://localhost:8000/blogs"
//   );

//   return (
//     <div className="home">
//       {error && <div>{error}</div>}
//       {isPending && <div>Loading...</div>}
//       {blogs && <BlogList blogs={blogs} tittle="All Blogs!" />}
//     </div>
//   );
// };
// export default Home;

class Home extends Component {
  state = {
    blogs: [],
    isPending:true,
    error: ''
  } 
  componentDidMount() {
    setTimeout(() => {
      fetch("http://localhost:8000/blogs")
        .then((res) => {
          if (!res.ok) {
            throw Error("Cannot load the Blogs");
          }
          return res.json();
        })
        .then((data) => {
          this.setState({
            blogs: data,
            isPending: false,
            error: null
          })
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            this.setState({
              isPending: false,
              error: err.message
            })
          }
        });
    }, 1000);
  }
  render() {
    return (
      <div className="home">
        {this.state.error && <div>{this.state.error}</div>}
        {this.state.isPending && <div>Loading...</div>}
        {this.state.blogs && <BlogList blogs={this.state.blogs} tittle="All Blogs!" />}
      </div>
    );
  }
}

export default Home;
