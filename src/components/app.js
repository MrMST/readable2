import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import MainPage from "../components/mainpage"
import AddPost from "../components/addpost"
import EditPost from "../components/editpost"
import EditComment from "../components/editcomment"
import ShowPost from "../components/showpost"
import ShowCategoryPosts from "../components/categories"
import "../App.css"

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/addPost" component={AddPost} />
        <Route exact path="/:category/" component={ShowCategoryPosts} />
        <Route exact path="/editPost/:postId" component={EditPost} />
        <Route exact path="/editComment/:commentId" component={EditComment} />
        <Route exact path="/:category/:post_id" component={ShowPost} />
      </Switch>
    );
  }
}

export default App;