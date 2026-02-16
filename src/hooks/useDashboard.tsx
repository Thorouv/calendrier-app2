import { useState, useEffect } from 'react';

export const useDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock data inspections (remplacé par Supabase après)
    setTimeout(() => {
      setData([
        {
          id: 1,
          title: 'Inspection pompe',
          statut: 'En cours',
          echance: new Date(),
        },
        { id: 2, title: 'Vérif vanne', statut: 'Fait' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return { data, loading, error };
};
