import { Container, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to Our Website</Heading>
        <Text fontSize="xl">Experience the best of our services.</Text>
        <Button as={Link} to="/voice-notes" rightIcon={<FaRocket />} colorScheme="teal" variant="solid" size="lg">
          Voice Notes
        </Button>
        <Button as={Link} to="/notes" rightIcon={<FaRocket />} colorScheme="teal" variant="solid" size="lg">
          Text Notes
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;