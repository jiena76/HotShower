import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

const IconSidebarLayout = ({ children }) => (
  <Container fluid>
    <Row>
      <Col className="main-content col" tag="main">
        {children}
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
