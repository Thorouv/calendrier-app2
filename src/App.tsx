import React, { useEffect, useState } from 'react';  // Garde React
import { Container, VStack, Heading, Text } from '@chakra-ui/react';  // Garde utilisés
import { useDashboard } from './hooks/useDashboard';  // Garde
import DashboardView from './DashboardView';  // Garde
import AppData from './AppData';  // Garde

const App: React.FC = () => {  // Ajoute React.FC
  const { data, loading, error } = useDashboard();  // Utilise states

  return (
    <Container maxW="container.xl" p={6}>
      <AppData />
      <VStack gap={6} align="stretch">
        <Heading>Tableau de bord inspections équipements</Heading>
        <DashboardView items={data} loading={loading} error={error} onRefresh={() => {}} />
      </VStack>
    </Container>
  );
};

export default App;
