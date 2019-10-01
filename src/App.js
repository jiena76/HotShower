import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes";
import { autoLoginUser } from './actions/userActions';
import { connect } from 'react-redux';
import withTracker from "./withTracker";


import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";

class App extends React.Component {
  componentDidMount() {
    this.props.autoLoginUser();
  }

  render() {
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <div>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker(props => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                })}
              />
            );
          })}
        </div>
      </Router>
    )
  }
};

export default connect(null, { autoLoginUser })(App);