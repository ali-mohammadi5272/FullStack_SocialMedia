const emailPattern = /^[\w\.\-_]+@[\w]{5,8}\.[a-z]{2,3}$/;
const phoneNumberPattern = /^(0|\+98)?9\d{9}$/;
const phoneNumberPrefixPattern = /^(0|\+98)/;

module.exports = {
  emailPattern,
  phoneNumberPattern,
  phoneNumberPrefixPattern,
};
