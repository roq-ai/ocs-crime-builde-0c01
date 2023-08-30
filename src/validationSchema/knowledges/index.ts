import * as yup from 'yup';

export const knowledgeValidationSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  num_witnesses: yup.number().integer().required(),
  num_characters: yup.number().integer().required(),
  witness_text: yup.string().required(),
  self_text: yup.string().required(),
  crime_id: yup.string().nullable().required(),
});
