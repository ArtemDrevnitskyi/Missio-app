import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Card from '~/lib/components/Card';
import TextInput from '~/lib/components/TextInput';
import Main from '~/lib/layout/Main';

const SettingsSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Connection name is too Short!')
    .max(50, ' Host Url is too Long!')
    .required('Connection name is Required'),
  url: Yup.string()
    .min(2, 'url is too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  apiKey: Yup.string()
    .min(2, 'Api key is too short!')
    .max(50, 'Api key is too Long!')
    .required('Api is Required'),
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Username is Required'),
});

function Settings() {
  return (
    <Main
      heading="Settings"
      subtext="Track, manage and forecast your customers and orders."
    >
      <Card p={4}>
        <Heading mb={3} fontSize={24}>
          Connect to Discourse (DAO Forum)
        </Heading>
        <Formik
          initialValues={{
            name: '',
            url: '',
            apiKey: '',
            username: '',
          }}
          validationSchema={SettingsSchema}
          onSubmit={(values, action) => {
            // eslint-disable-next-line no-console
            console.log(values);

            setTimeout(() => {
              action.setSubmitting(false);
            }, 3000);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput name="name" label="Connection name" />
              <TextInput name="url" label="Host URL" />
              <TextInput name="apiKey" label="Discourse API Key" />
              <TextInput name="username" label="API Username" />
              <Stack
                direction={{ base: 'column', md: 'row' }}
                align="center"
                spacing={4}
              >
                <Button
                  variant="primary"
                  mt={2}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Save
                </Button>
                {isSubmitting && (
                  <Text color="primary.300" as="i">
                    Your Setting have been updated
                  </Text>
                )}
              </Stack>
            </Form>
          )}
        </Formik>
      </Card>
    </Main>
  );
}

export default Settings;
