const { z } = require('zod');

const registerUserSchema = z.object({
  name: z.string().min(3, 'Name at least 3 characters!'),

  email: z.email(),

  password: z.string().min(8, 'Password at least 8 characters!'),
});

module.exports = { registerUserSchema };