/* eslint-disable no-undef */
declare type ServerRespond = {
    data?: ?any,
    error?: ?string, // "общая" ошибка запроса, обрабатывается родителем содержащим <FormValidation />
    errors?: ?{ [field:string]:Array<string> }, // сооответств поле формы - описание ошибок поля, отдается <FormValidation />
    meta?: any
};
