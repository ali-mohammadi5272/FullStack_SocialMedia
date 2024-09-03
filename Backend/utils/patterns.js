const emailPattern = /^[\w\.\-_]+@[\w]{5,8}\.[a-z]{2,3}$/;
const phoneNumberPattern = /^(0|\+98)?9\d{9}$/;
const phoneNumberPrefixPattern = /^(0|\+98)/;
const namePattern = /^[a-zA-Z]{3}$/;
const usernamePattern = /^[a-z]{1}[a-z0-9]{2,}(_[a-z0-9]+)*?$/;

module.exports = {
  emailPattern,
  phoneNumberPattern,
  phoneNumberPrefixPattern,
  namePattern,
  usernamePattern,
};
