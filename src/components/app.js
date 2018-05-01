import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "../components/mainpage";
import AddPost from "../components/addpost";
import "../App.css";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/addPost" component={AddPost} />>
      </Switch>
    );
  }
}

export default App;