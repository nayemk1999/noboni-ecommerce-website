import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Home/Header/Header/Header";
import DashboardContent from "../DashboardContent/DashboardContent";
import SideBar from "../SideBar/SideBar";

const Dashboard = () => {
  return (
    <Container fluid>
      <Row>
        <SideBar></SideBar>
        <Col className="d-flex justify-content-center mt-5">
          <DashboardContent />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
