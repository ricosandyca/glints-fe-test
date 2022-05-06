import {
  Alert,
  Box,
  Button,
  Center,
  chakra,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineMail, AiOutlineKey } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';

import appConfig from '~/config/app';
import { useSignUpWithPasswordAction } from '~/hooks/use-auth';
import { useDocumentTitle } from '~/hooks/use-document-title';
import { emailPattern, passwordMinLength } from '~/utils/validation';

export type SignUpFormInputs = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const Form = chakra('form');

const SignUp: FC = () => {
  useDocumentTitle('Sigup');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<SignUpFormInputs>({ mode: 'all' });
  const { handleSignUpWithPassword, isLoading, error } =
    useSignUpWithPasswordAction();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    await handleSignUpWithPassword(data.email, data.password);
  };

  return (
    <HStack w="100vw" spacing={0}>
      {/* Left content (main) */}
      <Center w="full" h="100vh" maxW={{ base: '100%', md: '460px' }}>
        <Box p={10} w="full" maxW="460px" textAlign="left">
          <VStack w="full" align="flex-start" spacing={6}>
            <VStack align="flex-start" spacing={4}>
              <Heading fontSize="3xl">Signup</Heading>
              <Text>Create your {appConfig.appName} account to get access</Text>
            </VStack>
            <Form onSubmit={handleSubmit(onSubmit)} w="full">
              <VStack w="full" spacing={4}>
                {/* Error alert */}
                {error && (
                  <Alert status="error" variant="left-accent">
                    {error}
                  </Alert>
                )}

                {/* Email input */}
                <FormControl isInvalid={!!errors.email}>
                  <InputGroup>
                    <InputLeftAddon>
                      <Icon as={AiOutlineMail} />
                    </InputLeftAddon>
                    <Input
                      type="email"
                      variant="filled"
                      placeholder="Email"
                      px={2}
                      {...register('email', {
                        required: true,
                        pattern: {
                          value: emailPattern,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                  </InputGroup>
                  {errors.email?.message && (
                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                  )}
                </FormControl>

                {/* Password input */}
                <FormControl isInvalid={!!errors.password}>
                  <InputGroup>
                    <InputLeftAddon>
                      <Icon as={AiOutlineKey} />
                    </InputLeftAddon>
                    <Input
                      type="password"
                      variant="filled"
                      placeholder="Password"
                      px={2}
                      {...register('password', {
                        required: true,
                        minLength: {
                          value: passwordMinLength,
                          message: `Contain at least ${passwordMinLength} characters`,
                        },
                      })}
                    />
                  </InputGroup>
                  {errors.password?.message && (
                    <FormErrorMessage>
                      {errors.password.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                {/* Password confirmation input */}
                <FormControl isInvalid={!!errors.passwordConfirmation}>
                  <InputGroup>
                    <InputLeftAddon>
                      <Icon as={AiOutlineKey} />
                    </InputLeftAddon>
                    <Input
                      type="password"
                      variant="filled"
                      placeholder="Password Confirmation"
                      px={2}
                      {...register('passwordConfirmation', {
                        required: true,
                        validate: (value) =>
                          getValues('password') === value ||
                          `Password doesn't match`,
                      })}
                    />
                  </InputGroup>
                  {errors.passwordConfirmation?.message && (
                    <FormErrorMessage>
                      {errors.passwordConfirmation?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                {/* Submit button */}
                <Button
                  type="submit"
                  colorScheme="primary"
                  isDisabled={!isValid}
                  isLoading={isLoading}
                  isFullWidth
                >
                  Create Account
                </Button>

                {/* Signin button */}
                <HStack fontSize="sm" spacing={1}>
                  <Text lineHeight="15px">{`Have an account?`}</Text>
                  <Button
                    alignSelf="flex-start"
                    as={RouterLink}
                    to="/auth/signin"
                    fontWeight="semibold"
                    colorScheme="primary"
                    variant="link"
                    fontSize="inherit"
                    lineHeight="15px"
                  >
                    Signin
                  </Button>
                </HStack>
              </VStack>
            </Form>
          </VStack>
        </Box>
      </Center>

      {/* Right content */}
      <Box
        display={{ base: 'hidden', md: 'block' }}
        flex={1}
        bg="primary"
        h="100vh"
      />
    </HStack>
  );
};

export default SignUp;
