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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getKnowledgeById, updateKnowledgeById } from 'apiSdk/knowledges';
import { knowledgeValidationSchema } from 'validationSchema/knowledges';
import { KnowledgeInterface } from 'interfaces/knowledge';
import { CrimeInterface } from 'interfaces/crime';
import { getCrimes } from 'apiSdk/crimes';

function KnowledgeEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<KnowledgeInterface>(
    () => (id ? `/knowledges/${id}` : null),
    () => getKnowledgeById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: KnowledgeInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateKnowledgeById(id, values);
      mutate(updated);
      resetForm();
      router.push('/knowledges');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<KnowledgeInterface>({
    initialValues: data,
    validationSchema: knowledgeValidationSchema,
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
              label: 'Knowledges',
              link: '/knowledges',
            },
            {
              label: 'Update Knowledge',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Knowledge
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.type}
            label={'Type'}
            props={{
              name: 'type',
              placeholder: 'Type',
              value: formik.values?.type,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Num Witnesses"
            formControlProps={{
              id: 'num_witnesses',
              isInvalid: !!formik.errors?.num_witnesses,
            }}
            name="num_witnesses"
            error={formik.errors?.num_witnesses}
            value={formik.values?.num_witnesses}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('num_witnesses', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Num Characters"
            formControlProps={{
              id: 'num_characters',
              isInvalid: !!formik.errors?.num_characters,
            }}
            name="num_characters"
            error={formik.errors?.num_characters}
            value={formik.values?.num_characters}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('num_characters', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.witness_text}
            label={'Witness Text'}
            props={{
              name: 'witness_text',
              placeholder: 'Witness Text',
              value: formik.values?.witness_text,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.self_text}
            label={'Self Text'}
            props={{
              name: 'self_text',
              placeholder: 'Self Text',
              value: formik.values?.self_text,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<CrimeInterface>
            formik={formik}
            name={'crime_id'}
            label={'Select Crime'}
            placeholder={'Select Crime'}
            fetcher={getCrimes}
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
              onClick={() => router.push('/knowledges')}
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
    entity: 'knowledge',
    operation: AccessOperationEnum.UPDATE,
  }),
)(KnowledgeEditPage);
