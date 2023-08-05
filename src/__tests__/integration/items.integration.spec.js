//__test__/integration/items.integration.spec.js

import supertest from 'supertest';
import { ExpressApp } from '../../app.js';
import sequelize from '../../db/sequelize.js';

const expressApp = new ExpressApp();
const app = expressApp.app;

beforeAll(async () => {
  if (process.env.NODE_ENV === 'test') await sequelize.sync();
  else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
});

describe('Layered Architecture Pattern, Posts Domain Integration Test', () => {
  test('GET /api/items API (getItems) Integration Test Success Case, Not Found Itmes Data', async () => {
    const response = await supertest(app)
      .get(`/api/items`)
      .query({ category: 'all' })
      .send({});

    expect(response.body).toEqual({
      message: '전체 상품이 조회되었습니다.',
      list: [],
    });
  });

  test('POST /api/options API (createOptions) Integration Test Success Case', async () => {
    const createOptionRequestBodyParams = {
      extra_price: 200,
      shot_price: 0,
      hot: false,
    };

    const response = await supertest(app)
      .post(`/api/options`)
      .query({})
      .send(createOptionRequestBodyParams);

    expect(response.status).toEqual(200);

    expect(response.body).toMatchObject({
      message: '옵션 추가에 성공하였습니다.',
    });
  });

  test('POST /api/items API (createItem) Integration Test Success Case', async () => {
    const createItemRequestBodyParams = {
      name: '치즈케이크',
      price: 2000,
      type: 'food',
      option_id: 1,
    };

    const response = await supertest(app)
      .post(`/api/items`)
      .query({})
      .send(createItemRequestBodyParams);

    expect(response.status).toEqual(200);

    expect(response.body).toMatchObject({
      message: '상품 추가에 성공하였습니다.',
    });
  });

  test('POST /api/posts API (createPost) Integration Test Error Case, Invalid Params Error', async () => {
    const createItemRequestBodyParamsByInvalidParamsError = {
      name: '아메리카노',
      price: 1000,
      type: 'coffee',
      option_id: 200,
    };

    const response = await supertest(app)
      .post(`/api/items`)
      .query({})
      .send(createItemRequestBodyParamsByInvalidParamsError);

    expect(response.body).toMatchObject({
      message: '정확한 옵션을 입력해 주세요.',
    });
  });

  test('GET /api/items API (getItems) Integration Test Success Case, is Exist Posts Data', async () => {
    const response = await supertest(app)
      .get(`/api/items`)
      .query({ category: 'all' })
      .send({});

    expect(response.body).toMatchObject({
      message: '전체 상품이 조회되었습니다.',
      list: [
        {
          id: 1,
          name: '치즈케이크',
          option_id: 1,
          price: 2000,
          type: 'FOOD',
          amount: 0,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
          option: {
            id: 1,
            extra_price: 200,
            shot_price: 0,
            hot: 0,
            createdAt: expect.anything(),
            updatedAt: expect.anything(),
          },
        },
      ],
    });
  });
});

afterAll(async () => {
  if (process.env.NODE_ENV === 'test') await sequelize.sync({ force: true });
  else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
});
