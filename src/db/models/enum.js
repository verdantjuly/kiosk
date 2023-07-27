const itemTypes = {
  coffee: 'COFFEE',
  juice: 'JUICE',
  food: 'FOOD',
};

const orderItemState = {
  ORDERED: 0,
  PENDING: 1,
  COMPLETED: 2,
  CANCELED: 3,
};

export default { itemTypes, orderItemState };
