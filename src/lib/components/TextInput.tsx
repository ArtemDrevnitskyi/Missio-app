import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field } from 'formik';
import type { FieldProps } from 'formik';

function TextInput({ name, label }: { name: string; label: string }) {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <FormControl isInvalid={!!(meta.touched && meta.error)} my={3}>
          <FormLabel textTransform="capitalize">{label}</FormLabel>
          <Input
            border="1px solid white"
            bg="secondary.300"
            w={{ base: 'full', md: '30%' }}
            {...field}
            placeholder="name"
          />
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

export default TextInput;
