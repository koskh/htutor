import { extract } from '../../../../utilities/number';

export default {
    field1: {
        type: {
            convert(value) {
                return extract(value);
            },
            msg: 'Неверный формат данных. Разрешено только число.'
        },
        inputRules: [
            {
                validate(attrs) {
                    return attrs.field1 !== '';
                },
                msg: 'Не может быть пустым'
            },

            {
                validate(attrs) {
                    return attrs.field1 >= 0 && attrs.field1 <= 100;
                },
                msg: 'Число должно находиться в интервале 0-100'
            },
            {
                validate(attrs) {
                    return attrs.field1 >= 50;
                },
                msg: 'Число должно быть больше 50'
            },

        ],

    },

    field2: {
        // type: {
        //     convert(value) {
        //         return extract(value);
        //     },
        //     msg: 'Неверный формат данных. Разрешено только число.'
        // },
        // inputRules: [
        //     {
        //         validate(value) {
        //             return value !== '';
        //         },
        //         msg: 'Не может быть пустым'
        //     },
        // ],

        logicRules: [
            {
                validate(attrs) {
                    return attrs.field1 === attrs.field2;
                },
                msg: 'Знечения полей field1 и field2 должны быть равны'
            }
        ]
    },
    field3: {
        // type: {
        //     convert(value) {
        //         return extract(value);
        //     },
        //     msg: 'Неверный формат данных. Разрешено только число.'
        // },
        // inputRules: [
        //     {
        //         validate(value) {
        //             return value !== '';
        //         },
        //         msg: 'Не может быть пустым'
        //     },
        // ],

        // logicRules: [
        //     {
        //         validate(attrs) {
        //             return attrs.email2 === attrs.email;
        //         },
        //         msg: 'Знечения полей email и email2 должны быть равны'
        //     }
        // ]
    },
    field4: {
        logicRules: [
            {
                validate(attrs) {
                    return attrs.field4 === attrs.field2;
                },
                msg: 'Знечения полей field4 и field2 должны быть равны'
            },
            {
                validate(attrs) {
                    return attrs.field4 === attrs.field3;
                },
                msg: 'Знечения полей field4 и field3 должны быть равны'
            },
            {
                validate(attrs) {
                    return attrs.field4 === attrs.field2;
                },
                msg: 'Знечения полей field4 и field2 должны быть равны'
            }
        ]
    }
};