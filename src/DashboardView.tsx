import { useState, useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
  Select,
  Spinner,
  Alert,
  Portal,
} from '@chakra-ui/react';
import { Calendar, List, RotateCcw, BarChart2 } from 'lucide-react';
import { createListCollection } from '@chakra-ui/react';
import DashboardStatsView from './DashboardStatsView';
import CalendarView from './CalendarView';
import AgendaView from './AgendaView';

const DashboardView = ({ items, loading, error, onRefresh }) => {
  const [viewMode, setViewMode] = useState('dashboard');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = createListCollection({
    items: [
      { label: 'Tous les statuts', value: 'all' },
      { label: 'En cours', value: 'En cours' },
      { label: 'Fait', value: 'Fait' },
      { label: 'Bloqué', value: 'Bloqué' },
    ],
  });

  const filteredItems = useMemo(() => {
    if (statusFilter === 'all') return items;
    return items.filter((item) => item.statut === statusFilter);
  }, [items, statusFilter]);

  if (loading) {
    return (
      <VStack justify="center" minH="400px" gap={4}>
        <Spinner size="xl" colorPalette="blue" />
        <Text color="fg.muted">Chargement des données...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <Alert.Root colorPalette="red">
        <Alert.Title>Erreur</Alert.Title>
        <Alert.Description>{error}</Alert.Description>
      </Alert.Root>
    );
  }

  return (
    <VStack gap={6} align="stretch">
      <HStack justify="space-between" flexWrap="wrap" gap={4}>
        <HStack
          gap={2}
          bg="bg.subtle"
          p={1}
          borderRadius="lg"
          border="1px solid"
          borderColor="border.muted"
        >
          <Button
            size="sm"
            variant={viewMode === 'dashboard' ? 'solid' : 'ghost'}
            colorPalette={viewMode === 'dashboard' ? 'blue' : 'gray'}
            onClick={() => setViewMode('dashboard')}
            borderRadius="md"
          >
            <BarChart2 size={16} />
            Dashboard
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'calendar' ? 'solid' : 'ghost'}
            colorPalette={viewMode === 'calendar' ? 'blue' : 'gray'}
            onClick={() => setViewMode('calendar')}
            borderRadius="md"
          >
            <Calendar size={16} />
            Calendrier
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'agenda' ? 'solid' : 'ghost'}
            colorPalette={viewMode === 'agenda' ? 'blue' : 'gray'}
            onClick={() => setViewMode('agenda')}
            borderRadius="md"
          >
            <List size={16} />
            Agenda
          </Button>
        </HStack>

        <HStack gap={3}>
          <Select.Root
            collection={statusOptions}
            value={[statusFilter]}
            onValueChange={(e) => setStatusFilter(e.value[0])}
            size="sm"
            w="200px"
          >
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Filtrer par statut" />
              </Select.Trigger>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {statusOptions.items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>

          <Button
            size="sm"
            variant="outline"
            onClick={onRefresh}
            disabled={loading}
          >
            <RotateCcw size={16} />
            Actualiser
          </Button>
        </HStack>
      </HStack>

      {viewMode === 'dashboard' && <DashboardStatsView items={filteredItems} />}
      {viewMode === 'calendar' && <CalendarView items={filteredItems} />}
      {viewMode === 'agenda' && <AgendaView items={filteredItems} />}
    </VStack>
  );
};

export default DashboardView;
