import React from "react";

const RATING_LIMIT = 10;
const MAX_CHARS_NAME = 100;
const MAX_CHARS_EMAIL = 100;
const MAX_CHARS_PASS = 100;

export const invalidMessage = "One or more fields are invalid";

const withinCharsLimit = (s, lim) => {
    return s.length < lim
};

const notEmptyString = (s) => {
    return s !== ''
};

const zeroPositive = (n) => {
    return n >= 0
};

const positive = (n) => {
    return n > 0
};

const validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
};

const validFirebaseURL = (str) => {
    var pattern = new RegExp('^(gs?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
};

const  validateName = (name) => {
    return notEmptyString(name) && withinCharsLimit(name, MAX_CHARS_NAME)
};

const  validateEmail = (email) => {
    return notEmptyString(email) && withinCharsLimit(email, MAX_CHARS_EMAIL)
};

const  validateSubscription = (subscription) => {
    return subscription === 'flat' || subscription === 'premium'
};

const  validateRating = (rating) => {
    return zeroPositive(rating) && rating < RATING_LIMIT
};

const  validatePhone = (phone_number) => {
    return notEmptyString(phone_number) && Number(phone_number) && positive(Number(phone_number))
};

const validatePassword = (password) => {
    return notEmptyString(password) && withinCharsLimit(password, MAX_CHARS_PASS)
};

const validateUserPicture = (picture) => {
    return !notEmptyString(picture) || (validURL(picture) || validFirebaseURL(picture))
};


const  validateFavourPoints = (favourPoints) => {
    return zeroPositive(favourPoints)
};

const  validateRadius = (radius) => {
    return positive(radius)
};

const  validateLatitude = (latitude) => {
};

const  validateLongitude = (longitude) => {
};



// USER
export const userAddValidate = (user) => {
  return  validateName(user.name) && validatePhone(user.phone_number) && validateSubscription(user.suscripcion) &&
      validatePassword(user.password) && validateEmail(user.email) && validateUserPicture(user.picture);
};

export const userModifyValidate = (user) => {
    return  validateName(user.name) && validatePhone(user.phone_number) && validateSubscription(user.suscripcion) &&
        validatePassword(user.password) && validateEmail(user.email) && validateUserPicture(user.picture) &&
        validateFavourPoints(user.favourPoints) && validateRating(user.rating);
};
