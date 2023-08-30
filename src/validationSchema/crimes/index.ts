import * as yup from 'yup';

export const crimeValidationSchema = yup.object().shape({
  name: yup.string().required(),
  num_players: yup.number().integer().required(),
  num_killers: yup.number().integer().required(),
  victim_name: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
