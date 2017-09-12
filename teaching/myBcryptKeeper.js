var bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

console.log(bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
    console.log('hash in 1 ', hash);
  });
}));

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  // Store hash in your password DB.
  console.log('hash in 2 ', hash);

  // Load hash from your password DB.
  bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    console.log(`${myPlaintextPassword} => ${hash} results in ${res}`);
  });

  bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
    console.log(`${someOtherPlaintextPassword} => ${hash} results in ${res}`);
  });
});