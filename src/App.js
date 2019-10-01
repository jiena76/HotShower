import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { db } from './utils/firebase';
import routes from "./routes";
import withTracker from "./withTracker";

import store from './store';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    )
  }
};

export default App;