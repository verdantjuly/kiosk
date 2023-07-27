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

## Directory Structure

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
   ├─ controllers
   │  ├─ itmes.controller.js
   │  └─ order_items.controller.js
   ├─ db
   │  ├─ index.js
   │  ├─ models
   │  │  ├─ items.js
   │  │  └─ order_items.js
   │  ├─ relations
   │  │  ├─ index.js
   │  │  ├─ items.relation.js
   │  │  └─ order_items.relation.js
   │  └─ sequelize.js
   ├─ init.js
   ├─ repositories
   │  ├─ items.repository.js
   │  └─ order_items.repository.js
   ├─ routes
   │  ├─ items.route.js
   │  └─ order_items.route.js
   └─ services
      ├─ items.service.js
      ├─ message.js
      └─ order_items.repository.js

```
