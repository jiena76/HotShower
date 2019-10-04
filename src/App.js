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
  componentDidMount() {
    if (this.props.user.isAuthenticated === false) {
      this.props.autoLoginUser();
    }
  }

  render() {
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <HeaderNavigation>
          <div>
            {routes.map((route, index) => {
              if (route.private) {
                return (
                  <PrivateRoute
                    isAuthenticated={localStorage.getItem('user') != null}
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
        </HeaderNavigation>

      </Router>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { autoLoginUser })(App);