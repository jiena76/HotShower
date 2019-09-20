import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import getCalendarEventsData from "../data/calendar-events-data";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null
    };
  }

  componentWillMount() {
    const events = getCalendarEventsData();
    this.setState({
      ...this.state,
      events
    });
  }

  render() {
    const { events } = this.state;
    const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
    const localizer = BigCalendar.momentLocalizer(moment);

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Calendar" subtitle="Dashboards" className="text-sm-left mb-3" />
          <Col sm="4" className="d-flex ml-auto my-auto">
            <Button className="mx-auto ml-sm-auto mr-sm-0">
              <i className="material-icons">add</i> New Event
            </Button>
          </Col>
        </Row>
        <Card className="p-0">
          <CardBody className="py-4">
            <BigCalendar
                events={events}
                views={allViews}
                step={60}
                showMultiDayTimes
                defaultDate={new Date()}
                localizer={localizer} />
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Calendar;
