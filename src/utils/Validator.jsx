import React from "react";

const RATING_LIMIT = 10;
const MAX_CHARS = 100;

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

class Validator extends React.Component {


    static validateName(name){
        return notEmptyString(name) & withinCharsLimit(name, MAX_CHARS)
    }

    static validateEmail(email){
        return notEmptyString(email) & withinCharsLimit(email, MAX_CHARS)
    }

    static validateSubscription(subscription){
        return subscription === 'flat' || subscription === 'premium'
    }

    static validateRating(rating){
        return zeroPositive(rating) && rating < 10
    }

    static validatePhone(phone_number){
        return positive(phone_number)
    }

    static validateRadius(radius){
        return positive(radius)
    }

    static validateLatitude(latitude){
    }

    static validateLongitude(longitude){
    }


}