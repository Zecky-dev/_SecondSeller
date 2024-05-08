import * as yup from 'yup';

const ERRORS = {
  string: 'Metin formatında giriş yapınız.',
  number: 'Sayı formatında giriş yapınız.',
  email: 'E-posta formatına uygun giriş yapınız.',
  phoneNumber: 'Telefon numarası geçerli formatta değildir.',
  passwordConfirm: 'Girdiğiniz şifreler uyuşmuyor',
  required: 'Bu alanın girilmesi zorunludur.',
  positive: 'Bu alana pozitif bir değer girmelisiniz.',
  default: 'Geçerli bir değer seçiniz.',
  min: min => `Minimum ${min} karakter uzunluğunda giriş yapınız.`,
  max: max => `Maksimum ${max} karakter uzunluğunda giriş yapınız.`,
};

const phoneNumberRegex =
  /(^[0\s]?[\s]?)([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/g;


const EmailSchema = yup.object().shape({
  emailAddress: yup
    .string(ERRORS.string)
    .email(ERRORS.email)
    .required(ERRORS.required),
})

const LoginSchema = yup.object().shape({
  emailAddress: yup
    .string(ERRORS.string)
    .email(ERRORS.email)
    .required(ERRORS.required),
  password: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .min(6, ({ min }) => ERRORS.min(min))
    .max(24, ({ max }) => ERRORS.max(max)),
});


const BasicsSchema = {
  nameSurname: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .min(3, ({ min }) => ERRORS.min(min))
    .max(24, ({ max }) => ERRORS.max(max)),
  emailAddress: yup
    .string(ERRORS.string)
    .email(ERRORS.email)
    .required(ERRORS.required),
  phoneNumber: yup
    .string(ERRORS.phoneNumber)
    .required(ERRORS.required)
    .matches(phoneNumberRegex, ERRORS.phoneNumber),
};

const UpdateProfileSchema = yup.object().shape(BasicsSchema);

const RegisterSchema = yup.object().shape({
  ...BasicsSchema,
  password: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .min(6, ({ min }) => ERRORS.min(min))
    .max(24, ({ max }) => ERRORS.max(max)),
  passwordConfirm: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .oneOf([yup.ref('password'), null], ERRORS.passwordConfirm),
});

const CreateAdvertisementSchema = yup.object().shape({
  title: yup
    .string(ERRORS.string)
    .trim()
    .required(ERRORS.required)
    .min(3, ({ min }) => ERRORS.min(min))
    .max(64, ({ max }) => ERRORS.max(max)),
  description: yup
    .string(ERRORS.string)
    .trim()
    .required(ERRORS.required)
    .min(12, ({ min }) => ERRORS.min(min))
    .max(240, ({ max }) => ERRORS.max(max)),
  price: yup
    .number(ERRORS.number)
    .positive(ERRORS.positive)
    .required(ERRORS.required),
  category: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .notOneOf(['default'], ERRORS.default),
  images: yup
    .array(yup.string())
    .min(1, 'En az 1 fotoğraf seçilmelidir.')
    .required(ERRORS.required),
});

const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .min(6, ({ min }) => ERRORS.min(min))
    .max(24, ({ max }) => ERRORS.max(max)),
  newPassword: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .min(6, ({ min }) => ERRORS.min(min))
    .max(24, ({ max }) => ERRORS.max(max)),
  newPasswordConfirm: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .oneOf([yup.ref('newPassword'), null], ERRORS.passwordConfirm),
});

const UpdatePasswordSchema = yup.object().shape({
  newPassword: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .min(6, ({ min }) => ERRORS.min(min))
    .max(24, ({ max }) => ERRORS.max(max)),
  newPasswordConfirm: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .oneOf([yup.ref('newPassword'), null], ERRORS.passwordConfirm),
});

export {
  LoginSchema,
  RegisterSchema,
  CreateAdvertisementSchema,
  UpdateProfileSchema,
  ChangePasswordSchema,
  EmailSchema,
  UpdatePasswordSchema
};
