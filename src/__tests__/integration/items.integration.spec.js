import supertest from 'supertest';
import { ExpressApp } from '../../app.js';
import sequelize from '../../db/sequelize.js';

const expressApp = new ExpressApp();
const app = expressApp.app;

// 통합 테스트(Integration Test)를 진행하기에 앞서 Sequelize에 연결된 모든 테이블의 데이터를 삭제합니다.
//  단, NODE_ENV가 test 환경으로 설정되어있는 경우에만 데이터를 삭제합니다.
beforeAll(async () => {
  if (process.env.NODE_ENV === 'test') await sequelize.sync();
  else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
});

describe('Layered Architecture Pattern, Posts Domain Integration Test', () => {
  test('GET /api/items API (getItems) Integration Test Success Case, Not Found Itmes Data', async () => {
    const response = await supertest(app)
      .get(`/api/items`) // API의 HTTP Method & URL
      .query({ category: 'all' }) // Request Query String
      .send({}); // Request Body

    /** GET /api/posts API의 검증 로직 **/
    // 1. API를 호출하였을 때, 성공적으로 실행할 경우 200 Http Status Code를 반환한다.
    // 2. API의 Response는 아무런 데이터를 삽입하지 않은 상태이므로 { data: [] }의 형태를 가진다.

    // 1. API를 호출하였을 때, 성공적으로 실행할 경우 200 Http Status Code를 반환한다.
    expect(response.status).toEqual(200);

    // 2. API의 Response는 아무런 데이터를 삽입하지 않은 상태이므로 { data: [] }의 형태를 가진다.
    expect(response.body).toEqual({
      message: '전체 상품이 조회되었습니다.',
      list: [],
    });
  });

  test('POST /api/options API (createOptions) Integration Test Success Case', async () => {
    // POST /api/options API에서 사용되는 body 데이터입니다.
    const createOptionRequestBodyParams = {
      extra_price: 200,
      shot_price: 0,
      hot: false,
    };

    const response = await supertest(app)
      .post(`/api/options`) // API의 HTTP Method & URL
      .query({}) // Request Query String
      .send(createOptionRequestBodyParams); // Request Body

    /** POST /api/posts API의 성공 케이스 검증 로직 **/
    // 1. API를 호출하였을 때, 성공적으로 실행할 경우 201 Http Status Code를 반환한다.
    // 2-1. API의 Response는 { data: createPostData }의 형식을 가집니다.
    // 2-2. 여기서 createPostData는 { postId, nickname, title, content, createdAt, updatedAt }의 객체 형태를 가집니다.

    // 1. API를 호출하였을 때, 성공적으로 실행할 경우 201 Http Status Code를 반환한다.
    expect(response.status).toEqual(200);

    // 2-1. API의 Response는 { data: createPostData }의 형식을 가집니다.
    // 2-2. 여기서 createPostData는 { postId, nickname, title, content, createdAt, updatedAt }의 객체 형태를 가집니다.
    expect(response.body).toMatchObject({
      message: '옵션 추가에 성공하였습니다.',
    });
  });

  test('POST /api/items API (createItem) Integration Test Success Case', async () => {
    // POST /api/items API에서 사용되는 body 데이터입니다.
    const createItemRequestBodyParams = {
      name: '치즈케이크',
      price: 2000,
      type: 'food',
      option_id: 1,
    };

    const response = await supertest(app)
      .post(`/api/items`) // API의 HTTP Method & URL
      .query({}) // Request Query String
      .send(createItemRequestBodyParams); // Request Body

    /** POST /api/posts API의 성공 케이스 검증 로직 **/
    // 1. API를 호출하였을 때, 성공적으로 실행할 경우 201 Http Status Code를 반환한다.
    // 2-1. API의 Response는 { data: createPostData }의 형식을 가집니다.
    // 2-2. 여기서 createPostData는 { postId, nickname, title, content, createdAt, updatedAt }의 객체 형태를 가집니다.

    // 1. API를 호출하였을 때, 성공적으로 실행할 경우 201 Http Status Code를 반환한다.
    expect(response.status).toEqual(200);

    // 2-1. API의 Response는 { data: createPostData }의 형식을 가집니다.
    // 2-2. 여기서 createPostData는 { postId, nickname, title, content, createdAt, updatedAt }의 객체 형태를 가집니다.
    expect(response.body).toMatchObject({
      message: '상품 추가에 성공하였습니다.',
    });
  });

  test('POST /api/posts API (createPost) Integration Test Error Case, Invalid Params Error', async () => {
    // POST /api/posts API에서 에러를 발생시키기 위해 사용되는 body 데이터입니다.
    const createItemRequestBodyParamsByInvalidParamsError = {
      name: '아메리카노',
      price: 1000,
      type: 'coffee',
      option_id: 200,
    };

    const response = await supertest(app)
      .post(`/api/items`) // API의 HTTP Method & URL
      .query({}) // Request Query String
      .send(createItemRequestBodyParamsByInvalidParamsError); // Request Body

    /** POST /api/posts API의 에러 케이스 검증 로직 **/
    // 1. API를 호출하였을 때, InvalidParamsError가 발생하여 400 Http Status Code를 반환합니다.
    // 2. API의 Response는 { errorMessage: "InvalidParamsError" }의 형식을 가집니다.

    // 1. API를 호출하였을 때, InvalidParamsError가 발생하여 400 Http Status Code를 반환합니다.
    expect(response.status).toEqual(400);

    // 2. API의 Response는 { errorMessage: "InvalidParamsError" }의 형식을 가집니다.
    expect(response.body).toMatchObject({
      message: '정확한 옵션을 입력해 주세요.',
    });
  });

  test('GET /api/items API (getItems) Integration Test Success Case, is Exist Posts Data', async () => {
    const response = await supertest(app)
      .get(`/api/items`) // API의 HTTP Method & URL
      .query({ category: 'all' }) // Request Query String
      .send({}); // Request Body

    /** GET /api/posts API의 검증 로직 **/
    // 1. API를 호출하였을 때, 성공적으로 실행할 경우 200 Http Status Code를 반환한다.
    // 2. API의 Response는 1개의 데이터를 생성한 상태이므로 { data: [ { postId, nickname, title, createdAt, updatedAt }] }의 형태를 가진다.

    // 1. API를 호출하였을 때, 성공적으로 실행할 경우 200 Http Status Code를 반환한다.
    expect(response.status).toEqual(200);

    // 2. API의 Response는 1개의 데이터를 생성한 상태이므로 { data: [ { postId, nickname, title, createdAt, updatedAt }] }의 형태를 가진다.
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
  // 통합 테스트가 완료되었을 경우 sequelize의 연결된 테이블들의 정보를 초기화합니다.
  if (process.env.NODE_ENV === 'test') await sequelize.sync({ force: true });
  else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
});
