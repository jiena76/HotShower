import React from "react";
import { Container, Row, Col } from "shards-react";
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import HeaderNavbar from "../components/layout/HeaderNavbar/HeaderNavbar";
import MainFooter from "../components/layout/MainFooter";

import { LAYOUT_TYPES } from "../utils/constants";
import getHeaderNavbarItems from "../data/header-nav-items";

class HeaderNavigation extends React.Component {
  render() {
    if (localStorage.getItem('user') != null) {
      return (
        <Container fluid>
          <Row>
            <Col tag="main" className="main-content p-0" lg="12" md="12" sm="12">
              <MainNavbar layout={LAYOUT_TYPES.HEADER_NAVIGATION} />
              {this.props.children}
              <MainFooter />
            </Col>
          </Row>
        </Container>
      )
    }
    else {
      return (
        <Container fluid>
          <Row>
            <Col tag="main" className="main-content p-0" lg="12" md="12" sm="12">
              {this.props.children}
            </Col>
          </Row>
        </Container>
      )
    }
  };
};

HeaderNavigation.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, null)(HeaderNavigation);
