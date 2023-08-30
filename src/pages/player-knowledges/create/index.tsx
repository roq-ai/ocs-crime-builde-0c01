import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createPlayerKnowledge } from 'apiSdk/player-knowledges';
import { playerKnowledgeValidationSchema } from 'validationSchema/player-knowledges';
import { PlayerInterface } from 'interfaces/player';
import { KnowledgeInterface } from 'interfaces/knowledge';
import { getPlayers } from 'apiSdk/players';
import { getKnowledges } from 'apiSdk/knowledges';
import { PlayerKnowledgeInterface } from 'interfaces/player-knowledge';

function PlayerKnowledgeCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PlayerKnowledgeInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPlayerKnowledge(values);
      resetForm();
      router.push('/player-knowledges');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PlayerKnowledgeInterface>({
    initialValues: {
      player_id: (router.query.player_id as string) ?? null,
      knowledge_id: (router.query.knowledge_id as string) ?? null,
    },
    validationSchema: playerKnowledgeValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Player Knowledges',
              link: '/player-knowledges',
            },
            {
              label: 'Create Player Knowledge',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Player Knowledge
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <AsyncSelect<PlayerInterface>
            formik={formik}
            name={'player_id'}
            label={'Select Player'}
            placeholder={'Select Player'}
            fetcher={getPlayers}
            labelField={'name'}
          />
          <AsyncSelect<KnowledgeInterface>
            formik={formik}
            name={'knowledge_id'}
            label={'Select Knowledge'}
            placeholder={'Select Knowledge'}
            fetcher={getKnowledges}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/player-knowledges')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'player_knowledge',
    operation: AccessOperationEnum.CREATE,
  }),
)(PlayerKnowledgeCreatePage);
