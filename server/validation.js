const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required().messages({
      "string.min": "使用者名稱長度至少為 {#limit} 個字元",
      "string.max": "使用者名稱長度不能超過 {#limit} 個字元",
      "any.required": "使用者名稱為必填欄位",
    }),
    email: Joi.string().min(6).max(50).required().email().messages({
      "string.min": "電子郵件地址長度至少為 {#limit} 個字元",
      "string.max": "電子郵件地址長度不能超過 {#limit} 個字元",
      "any.required": "電子郵件地址為必填欄位",
      "string.email": "請輸入有效的電子郵件地址",
    }),
    password: Joi.string().min(6).max(255).required().messages({
      "string.min": "密碼長度至少為 {#limit} 個字元",
      "string.max": "密碼長度不能超過 {#limit} 個字元",
      "any.required": "密碼為必填欄位",
    }),
    role: Joi.string().required().valid("student", "instructor").messages({
      "any.required": "職位為必填欄位",
      "any.only": '職位必須是 "student" 或 "instructor"',
    }),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email().messages({
      "string.min": "電子郵件地址長度至少為 {#limit} 個字元",
      "string.max": "電子郵件地址長度不能超過 {#limit} 個字元",
      "any.required": "電子郵件地址為必填欄位",
      "string.email": "請輸入有效的電子郵件地址",
    }),
    password: Joi.string().min(6).max(255).required().messages({
      "string.min": "密碼長度至少為 {#limit} 個字元",
      "string.max": "密碼長度不能超過 {#limit} 個字元",
      "any.required": "密碼為必填欄位",
    }),
  });


  return schema.validate(data);
};

const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6).max(50).required().messages({
      "string.min": "課程標題長度至少為 {#limit} 個字元",
      "string.max": "課程標題長度不能超過 {#limit} 個字元",
      "any.required": "課程標題為必填欄位",
    }),
    description: Joi.string().min(6).max(50).required().messages({
      "string.min": "課程描述長度至少為 {#limit} 個字元",
      "string.max": "課程描述長度不能超過 {#limit} 個字元",
      "any.required": "課程描述為必填欄位",
    }),
    price: Joi.number().min(10).max(99999999).required().messages({
      "number.min": "課程價格至少為 {#limit}",
      "number.max": "課程價格不能超過 {#limit}",
      "any.required": "課程價格為必填欄位",
    }),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.courseValidation = courseValidation;
