import * as yup from 'yup';

export const playerValidationSchema = yup.object().shape({
  name: yup.string().required(),
  personality_trait: yup.string().required(),
  user_id: yup.string().nullable().required(),
  crime_id: yup.string().nullable().required(),
});
