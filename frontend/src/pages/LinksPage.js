import React from 'react';

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
} from 'reactstrap';

import Page from 'components/Page';

const LinksPage = () => {
  return (
    <Page title="Links" breadcrumbs={[{ name: 'links', active: true }]}>
      <Row>
        <Col md="6" sm="12" xs="12">
          <Card className="mb-3">
            <CardHeader>Smarthome Links</CardHeader>
            <CardBody>
            	<div>
            		<a href="/wiki" target="_blank">Wiki</a>
            	</div>
            	<div>
            		<a href="/auth" target="_blank">Keycloak</a>
            	</div>
                <div>
                	<a href="/pgadmin" target="_blank">PGAdmin</a>
                </div>
                <div>
                    <a href="/kibana" target="_blank">Kibana</a>
                </div>
                <div>
                    <a href="/dashboard/#/" target="_blank">Traefik Dashboard</a>
                </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" sm="12" xs="12">
        <Card className="mb-3">
          <CardHeader>Smarthome Links</CardHeader>
          <CardBody>
          	<div>
          		<a href="/wiki" target="_blank">Wiki</a>
          	</div>
          </CardBody>
        </Card>
      </Col>
      </Row>

    
    </Page>
  );
};

export default LinksPage;
