// @flow
// export type Schema = {
//     [key: string]: {
//         type?: { // приведение получаемого значения к требуемому типу
//             convert: (value: string) => any,
//             msg: string
//         },
//         inputRules?: Array<{ // валидация ввода
//             validate: (value: any) => boolean,
//             msg: string
//         }>,
//         logicRules?: Array<{ // валидация логики (валидность относительно других полей)
//             validate: (attrs: any) => boolean,
//             msg: string
//         }>
//     }
// }

export type Schema = {
    [key: string]: {
        type?: { // приведение получаемого "значения виджета" к требуемому типу
            convert: (value: any) => any,
            msg: string
        },
        inputRules?: Array<{ // валидация ввода полей виджета
            validate: (value: {[field: string]: any}) => boolean,
            msg: string
        }>,
        logicRules?: Array<{ // валидация логики (валидность относительно других полей формы)
            validate: (attrs: any) => boolean,
            msg: string
        }>
    }
}

export default {};
