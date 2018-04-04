export const updateObject = (oldObject, newProperties) => {
    return{
        ...oldObject,
        ...newProperties
    }
};

export const checkValidity = (value, rules) => {
    let isValid = true;


    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.invalidOption) {
        isValid = value.trim() !== rules.invalidOption && isValid;
    }

    if (rules.isEmail) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = re.test(value);
    }

    return isValid;
};

export const generateValidityMessage = (value, rules, isValid) => {
    let errorMessage = '';

    if (rules.required && !isValid) {
        errorMessage = "This field is required";
    }

    if (rules.minlength) {
        errorMessage = `This field should have a minimum of ${rules.minlength} characters`;
    }

    if (rules.maxLength) {
        errorMessage = `This field should have a maximum of ${rules.maxLength} characters`;
    }

    if (rules.invalidOption) {
        errorMessage = "Please select a valid option";
    }

    return errorMessage;
};