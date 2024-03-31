import * as yup from 'yup';

const ERRORS = {
  string: 'Metin formatında giriş yapınız.',
  email: 'E-posta formatına uygun giriş yapınız.',
  phoneNumber: 'Telefon numarası geçerli formatta değildir.',
  passwordConfirm: 'Girdiğiniz şifreler uyuşmuyor',
  required: 'Bu alanın girilmesi zorunludur.',
  min: min => `Minimum ${min} karakter uzunluğunda giriş yapınız.`,
  max: max => `Maksimum ${max} karakter uzunluğunda giriş yapınız.`,
};

const phoneNumberRegex =
  /(^[0\s]?[\s]?)([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/g;

const LoginSchema = yup.object().shape({
  email: yup
    .string(ERRORS.string)
    .email(ERRORS.email)
    .required(ERRORS.required),
  password: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .min(6, ({min}) => ERRORS.min(min))
    .max(24, ({max}) => ERRORS.max(max)),
});

const RegisterSchema = yup.object().shape({
  nameSurname: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .min(3, ({min}) => ERRORS.min(min))
    .max(24, ({max}) => ERRORS.max(max)),
  email: yup
    .string(ERRORS.string)
    .email(ERRORS.email)
    .required(ERRORS.required),
  phoneNumber: yup
    .string(ERRORS.phoneNumber)
    .required(ERRORS.required)
    .matches(phoneNumberRegex, ERRORS.phoneNumber),
  password: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .min(6, ({min}) => ERRORS.min(min))
    .max(24, ({max}) => ERRORS.max(max)),
  passwordConfirm: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .oneOf([yup.ref('password'), null], ERRORS.passwordConfirm),
});

export {LoginSchema, RegisterSchema};
