import {handler} from './index';

import setup from '../test/setup';
import {
  generateApiGateWayEvent,
  isValidApiGatewayResponse,
} from '../test/utils';

beforeAll(async () => {
  await setup();
}, 1000000); // Clears database and creates dummy data so it will take a lot

it('shold respond 400 on no id provided', async () => {
  const event = generateApiGateWayEvent({method: ''});

  const res = await handler(event);

  expect(res).toBeDefined();
  expect(isValidApiGatewayResponse(res)).toBeTruthy();
  expect(res.statusCode).toBe(400);
});

it('should respond 404 on POST method', async () => {
  const event = generateApiGateWayEvent({
    method: 'POST',
    queryStringObject: {id: 1},
  });

  const res = await handler(event);

  expect(res).toBeDefined();
  expect(isValidApiGatewayResponse(res)).toBeTruthy();
  expect(res.statusCode).toBe(404);
});

it('should respond 404 on No portfolio found', async () => {
  const event = generateApiGateWayEvent({
    method: 'GET',
    queryStringObject: {id: 1},
  });

  const res = await handler(event);

  expect(res).toBeDefined();
  expect(isValidApiGatewayResponse(res)).toBeTruthy();
  expect(res.statusCode).toBe(404);
});

it('should respond 200 on portfolio found', async () => {
  const event = generateApiGateWayEvent({
    method: 'GET',
    queryStringObject: {id: (global as any).__id}, //TODO add types to test
  });

  const res = await handler(event);

  expect(res).toBeDefined();
  expect(isValidApiGatewayResponse(res)).toBeTruthy();
  expect(res.statusCode).toBe(200);
  expect(JSON.parse(res.body).id).toBeDefined();
});

it('should respond 400 on empty payload', async () => {
  const event = generateApiGateWayEvent({
    method: 'PUT',
    queryStringObject: {id: (global as any).__id}, //TODO add types to test
  });

  const res = await handler(event);

  expect(res).toBeDefined();
  expect(isValidApiGatewayResponse(res)).toBeTruthy();
  expect(res.statusCode).toBe(400);
});

it('should update firsName', async () => {
  //get current data
  const eventGet = generateApiGateWayEvent({
    method: 'GET',
    queryStringObject: {id: (global as any).__id}, //TODO add types to test
  });

  const resGet = await handler(eventGet);

  expect(resGet).toBeDefined();
  expect(isValidApiGatewayResponse(resGet)).toBeTruthy();
  expect(resGet.statusCode).toBe(200);
  const portfolioBefore = JSON.parse(resGet.body);
  expect(portfolioBefore.id).toBeDefined();
  expect(portfolioBefore.firstName).toBeDefined();

  //update

  const eventPut = generateApiGateWayEvent({
    method: 'PUT',
    queryStringObject: {id: (global as any).__id}, //TODO add types to test
    body: {
      firstName: 'Jane',
    },
  });

  const resPut = await handler(eventPut);

  expect(resPut).toBeDefined();
  expect(isValidApiGatewayResponse(resPut)).toBeTruthy();
  expect(resPut.statusCode).toBe(200);
  const portfolioAfter = JSON.parse(resPut.body);
  expect(portfolioBefore.id).toBeDefined();
  expect(portfolioBefore.firstName).toBeDefined();
  expect(portfolioAfter._v).not.toBe(portfolioBefore._v);
  expect(portfolioAfter.firstName).not.toBe(portfolioBefore.firstName);
});

it('should not update createdAt', async () => {
  //get current data
  const eventGet = generateApiGateWayEvent({
    method: 'GET',
    queryStringObject: {id: (global as any).__id}, //TODO add types to test
  });

  const resGet = await handler(eventGet);

  expect(resGet).toBeDefined();
  expect(isValidApiGatewayResponse(resGet)).toBeTruthy();
  expect(resGet.statusCode).toBe(200);
  const portfolioBefore = JSON.parse(resGet.body);
  expect(portfolioBefore.id).toBeDefined();
  expect(portfolioBefore.firstName).toBeDefined();

  //update

  const eventPut = generateApiGateWayEvent({
    method: 'PUT',
    queryStringObject: {id: (global as any).__id}, //TODO add types to test
    body: {
      createdAt: new Date(),
    },
  });

  const resPut = await handler(eventPut);

  expect(resPut).toBeDefined();
  expect(isValidApiGatewayResponse(resPut)).toBeTruthy();
  expect(resPut.statusCode).toBe(200);
  const portfolioAfter = JSON.parse(resPut.body);
  expect(portfolioBefore.id).toBeDefined();
  expect(portfolioBefore.createdAt).toBeDefined();
  expect(portfolioAfter._v).not.toBe(portfolioBefore._v);
  expect(portfolioAfter.createdAt).toBe(portfolioBefore.createdAt);
});

//TODO: add more use-cases
