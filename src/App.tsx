import React from 'react';
import { Container, VStack, Heading } from '@chakra-ui/react';
import { useDashboard } from './hooks/useDashboard';
import DashboardView from './DashboardView';
import AppData from './AppData';

const App: React.FC = () => {
  const { data, loading, error } = useDashboard();

  return (
    <Container maxW="container.xl" p={6}>
      <AppData />
      <VStack gap={6} align="stretch">
        <Heading size="2xl" mb={4}>
          Tableau de bord des inspections d'équipements
        </Heading>
        <DashboardView 
          items={data} 
          loading={loading} 
          error={error} 
          onRefresh={() => {}} 
        />
      </VStack>
    </Container>
  );
};

export default App;
