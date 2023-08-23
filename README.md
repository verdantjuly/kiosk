# kiosk 프로젝트

A-9 이다영

# ERD

![ERD](https://github.com/verdantjuly/kiosk/assets/131671804/de6d6d2d-bfc1-4983-9770-9f624f42c6cb)

- 테이블의 설명

  - item : 상품 테이블
  - option : 상품에 대한 옵션 테이블
  - order_item : 발주 테이블
  - item_order_customer : 주문 상세 테이블
  - order_customer : 주문 테이블

- 각 amount 에 대한 설명
  - item : 재고
  - item_order_customer: 주문 수량
  - order_item : 발주 수량
- option
  - extra_price
    - 상품의 extra 사이즈 선택시 추가될 요금 (0일 경우 선택 불가)
  - shot_price
    - 상품의 shot 추가 선택시 추가될 요금 (0일 경우 추가 불가)
  - hot
    - hot, ice 선택 여부 (true일 경우 hot선택 가능) (false일 경우는 ice만 가능)
- item
  - type
    - 해당 상품의 type을 나타냅니다. (”coffee”, “juice”, “food”, …)

# API 예시

## items

상품 추가 API  
POST api/items

상품 옵션 추가 API  
POST api/items/options

상품 조회 API  
GET api/items

상품 삭제 API  
DELETE api/items/1

상품 수정 API  
PATCH api/items/1

## orders

상품 발주 API  
POST api/items/1/orders

발주 상태 수정 API  
PATCH api/items/1/orders/1

## receipts

상품 주문 API  
POST api/receipts

상품 주문 수정 API  
PATCH api/receipts/1

## options

상품 옵션 추가 API
POST api/items/1/options

# Directory Structure

```
kiosk
├─ .prettierrc.cjs
├─ README.md
├─ migrations
├─ package-lock.json
├─ package.json
├─ seeders
└─ src
   ├─ app.js
   ├─ cache.js
   ├─ controllers
   │  ├─ itmes.controller.js
   │  ├─ options.controller.js
   │  ├─ order_items.controller.js
   │  └─ receipts.controller.js
   ├─ db
   │  ├─ index.js
   │  ├─ models
   │  │  ├─ enum.js
   │  │  ├─ item_order_customers.js
   │  │  ├─ items.js
   │  │  ├─ options.js
   │  │  ├─ order_customers.js
   │  │  └─ order_items.js
   │  ├─ relations
   │  │  ├─ index.js
   │  │  ├─ item_order_customers.relation.js
   │  │  ├─ items.relation.js
   │  │  ├─ options.realtaion.js
   │  │  ├─ order_customers.relation.js
   │  │  └─ order_items.relation.js
   │  └─ sequelize.js
   ├─ init.js
   ├─ repositories
   │  ├─ items.repository.js
   │  ├─ options.repository.js
   │  ├─ order_items.repository.js
   │  └─ receipts.repository.js
   ├─ routes
   │  ├─ items.route.js
   │  ├─ options.route.js
   │  ├─ order_items.route.js
   │  └─ receipts.route.js
   └─ services
      ├─ items.service.js
      ├─ message.js
      ├─ options.service.js
      ├─ order_items.service.js
      └─ receipts.service.js

```
