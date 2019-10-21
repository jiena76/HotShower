import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import routes from "./routes";
import { autoLoginUser } from './actions/userActions';
import { connect } from 'react-redux';
import withTracker from "./withTracker";
import HeaderNavigation from './layouts/HeaderNavigation';


import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

class App extends React.Component {
  render() {
    console.log(localStorage.getItem('uid'))
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <div>
          {routes.map((route, index) => {
            if (route.private) {
              return (
                <PrivateRoute
                  isAuthenticated={localStorage.getItem('uid') !== undefined}
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={withTracker(props => {
                    return (
                      <HeaderNavigation>
                        <route.component {...props} />
                      </HeaderNavigation>
                    );
                  })}
                />
              );
            }
            else {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={withTracker(props => {
                    return (
                      <route.component {...props} />
                    );
                  })}
                />
              );
            }
          })}
        </div>
      </Router>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { autoLoginUser })(App);