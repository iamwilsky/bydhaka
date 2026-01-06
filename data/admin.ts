
import { Lead } from '../types';

export const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Budi Santoso', phone: '08123456789', model: 'BYD Seal - Performance', date: '2024-03-10', status: 'New', source: 'Website', salesName: 'Test Sales' },
  { id: '2', name: 'Siti Aminah', phone: '08198765432', model: 'BYD Atto 3', date: '2024-03-09', status: 'Contacted', source: 'WhatsApp', salesName: 'Test Sales' },
  { id: '3', name: 'Rahmat Hidayat', phone: '08567890123', model: 'BYD Dolphin', date: '2024-03-08', status: 'SPK', source: 'Showroom', salesName: 'Test Sales' },
  { id: '4', name: 'Dewi Lestari', phone: '08134567890', model: 'BYD Sealion 7', date: '2024-03-08', status: 'Prospect', source: 'Website', salesName: 'Test Sales' },
  { id: '5', name: 'Andi Wijaya', phone: '08212345678', model: 'BYD M6', date: '2024-03-07', status: 'Lost', source: 'Website', salesName: 'Test Sales' },
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'New': return 'bg-blue-100 text-blue-700';
    case 'Contacted': return 'bg-yellow-100 text-yellow-700';
    case 'Prospect': return 'bg-purple-100 text-purple-700';
    case 'SPK': return 'bg-green-100 text-green-700';
    case 'Lost': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};
