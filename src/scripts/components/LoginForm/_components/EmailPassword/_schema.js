// @flow
// import { extract } from '../../utilities/number';

// types
import type { Schema } from '../../../FormValidation/validator/schema';

const schema: Schema = {
    email: {
        inputRules: [
            {
                validate(attr) {
                    return attr.email !== '';
                },
                msg: 'Email Не может быть пустым'
            },
        ],
    },
    password: {
        inputRules: [
            {
                validate(attr) {
                    return attr.password !== '';
                },
                msg: 'Password Не может быть пустым'
            },
        ],
    },
};

export default schema;
