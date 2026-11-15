const { z } = require('zod');

const createOrUpdateProductSchema = z.object({
  name: z.string().min(3, 'Product name at least 3 characters!'),

  desc: z.string().min(10,'Product describtion at least 10 characters!'),

  stock: z.number().int(),

  price: z.number().min(500, 'Product price has more than 499!'),
});

module.exports = { createOrUpdateProductSchema };