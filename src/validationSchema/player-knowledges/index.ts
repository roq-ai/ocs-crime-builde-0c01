import * as yup from 'yup';

export const playerKnowledgeValidationSchema = yup.object().shape({
  player_id: yup.string().nullable().required(),
  knowledge_id: yup.string().nullable().required(),
});
