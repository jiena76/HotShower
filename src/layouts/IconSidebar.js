import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";

const IconSidebarLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid className="icon-sidebar-nav">
    <Row>
      <MainSidebar hideLogoText />
      <Col className="main-content col" tag="main">
        {!noNavbar && <MainNavbar />}
        {children}
        {!noFooter && <MainFooter />}
      </Col>
    </Row>
  </Container>
);

IconSidebarLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

IconSidebarLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default IconSidebarLayout;
