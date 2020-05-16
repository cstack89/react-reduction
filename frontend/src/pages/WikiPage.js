import Page from 'components/Page'; 
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';

const WikiPage = () => {
  return (
    <Page title="Wiki" breadcrumbs={[{ name: 'wiki', active: true }]}>
      <Row>
        <Col md={12} sm={12} xs={12} className="mb-3">
          <Card className="flex-row">
          <iframe  src ="/wiki" width="100%"
        	  align="center" height="600" scrolling="auto" frameborder="0"
        	  allowtransparency style={{border:"none;"}}/>
          </Card>
        </Col>
      </Row>
    
    </Page>
  );
};

export default WikiPage;
