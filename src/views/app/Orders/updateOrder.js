import React from 'react';

export default function updateOrder() {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Card>
        <CardBody>
          <CardTitle>Order Update</CardTitle>
          <Separator className="mb-5" />

          <Row>
            <Colxx xxs="12" className="mb-4"></Colxx>
          </Row>
        </CardBody>
      </Card>
    </Suspense>
  );
}
