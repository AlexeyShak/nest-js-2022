const PG_USER = process.env.PG_USER;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PG_PORT = parseInt(process.env.PG_PORT as string);
const PG_DATABASE = process.env.PG_DATABASE;

console.log('PG_PASS:', PG_PASSWORD, typeof PG_PASSWORD)
console.log('PG_PORT', PG_PORT, typeof PG_PORT)
export {PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE }