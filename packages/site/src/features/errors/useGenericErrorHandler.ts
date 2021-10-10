import { useToast } from "@chakra-ui/react";

export const useGenericErrorHandler = () => {
  const toast = useToast();
  return (err: unknown) => {
    toast({
      title: `API Error`,
      description: err + "",
      status: `error`,
      isClosable: true,
    });
  };
};
