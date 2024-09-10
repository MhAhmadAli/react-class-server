const bcrypt = require('bcryptjs');

const pass = 'Ahmad1234';

const hashedPass = bcrypt.hashSync(pass, 10);

// 'Ahmad1234' === '$2a$10$.cf/66BfG0Bf4R6Ej1vn8.T5LWOA64yTIVUVzgtd2atSSyIkbTSqW'

const isSame = bcrypt.compareSync(pass, hashedPass);
console.log(pass, hashedPass, isSame);