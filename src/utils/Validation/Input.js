export const isStringNotEmpty = (str) => str !== '';

export const isStringEmpty = (str) => str === '';

export const firstNameValidation = /^[a-zA-Z]{2,50}$/;

export const emailValidation = async (value) => {
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return reg.test(value);
};

export const phoneNumberValidation = /^[0-9]{10}$/;

export const passwordValidation = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;

export function OnlyNumber(inputValue) {
  const numreg = /^[0-9]+$/;
  return numreg.test(inputValue);
}
export function OnlyNumberFloat(inputValue) {
  const reg = /^[0-9]\.?[0-9]$/;
  return reg.test(inputValue);
}
export const accountHolderNameValidation = async (value) => {
  const numreg = /^([^0-9$%]*)$/;
  return numreg.test(value);
};

export const ifscCodeValidate = (name = "") => {
  const ifscCode = /^[A-Za-z]{4}\d{7}$/;

  return ifscCode.test(name); // true
};

export const upiCodeValidate = async (name = "") => {
  const upiCode = /^\w.+@\w+$/;

  return upiCode.test(name); // true
};

export const validateGST = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
export const validateGSTNumber = (gstNumber) => {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
  return regex.test(gstNumber);
}


