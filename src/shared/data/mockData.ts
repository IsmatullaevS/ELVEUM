import type {
  User, Business, Service, Employee, Visit, Client, Sale, DaySchedule
} from '@/shared/types';
import { useAppStore } from '@/shared/store/useAppStore';

// ========== MOCK SCHEDULE ==========

const defaultWorkingDay: DaySchedule = {
  isWorking: true,
  start: '09:00',
  end: '18:00',
  breaks: [{ start: '13:00', end: '14:00' }],
};

const defaultWeekend: DaySchedule = {
  isWorking: false,
  start: '09:00',
  end: '18:00',
  breaks: [],
};

const defaultSchedule = {
  monday: defaultWorkingDay,
  tuesday: defaultWorkingDay,
  wednesday: defaultWorkingDay,
  thursday: defaultWorkingDay,
  friday: defaultWorkingDay,
  saturday: { ...defaultWorkingDay, end: '16:00' },
  sunday: defaultWeekend,
};

// ========== MOCK USER ==========

const mockUser: User = {
  id: 'user-1',
  name: 'Алексей Иванов',
  email: 'alex@example.com',
  phone: '+998901234567',
  role: 'solo_master',
  businessId: 'business-1',
  preferredUIMode: 'simple',
  avatar: undefined,
  createdAt: '2024-01-15T10:00:00Z',
};

// ========== MOCK SERVICES ==========

const mockServices: Service[] = [
  {
    id: 'service-1',
    businessId: 'business-1',
    name: 'Мужская стрижка',
    description: 'Классическая мужская стрижка',
    duration: 30,
    price: 80000,
    category: 'haircut',
    isActive: true,
  },
  {
    id: 'service-2',
    businessId: 'business-1',
    name: 'Стрижка бороды',
    description: 'Моделирование и стрижка бороды',
    duration: 20,
    price: 50000,
    category: 'beard',
    isActive: true,
  },
  {
    id: 'service-3',
    businessId: 'business-1',
    name: 'Окрашивание',
    description: 'Окрашивание волос',
    duration: 90,
    price: 150000,
    category: 'coloring',
    isActive: true,
  },
  {
    id: 'service-4',
    businessId: 'business-1',
    name: 'Укладка',
    description: 'Профессиональная укладка',
    duration: 40,
    price: 60000,
    category: 'styling',
    isActive: true,
  },
];

// ========== MOCK EMPLOYEES ==========

const mockEmployees: Employee[] = [
  {
    id: 'employee-1',
    userId: 'user-1',
    businessId: 'business-1',
    position: 'Мастер-парикмахер',
    services: ['service-1', 'service-2', 'service-3', 'service-4'],
    schedule: defaultSchedule,
    salary: {
      type: 'percentage',
      percentage: 60,
    },
    isActive: true,
    hiredAt: '2024-01-15T10:00:00Z',
  },
];

// ========== MOCK BUSINESS ==========

const mockBusiness: Business = {
  id: 'business-1',
  name: 'Барбершоп "Стиль"',
  type: 'solo',
  ownerId: 'user-1',
  address: 'Ташкент, ул. Амира Темура, 15',
  phone: '+998712345678',
  description: 'Современный барбершоп с европейским сервисом',
  services: mockServices,
  employees: mockEmployees,
  settings: {
    currency: 'UZS',
    timezone: 'Asia/Tashkent',
    locale: 'ru',
    bookingSettings: {
      allowOnlineBooking: true,
      requireDeposit: false,
      cancellationPolicy: 'Отмена за 2 часа до визита',
      minAdvanceBooking: 60,
    },
    notifications: {
      smsReminders: true,
      emailConfirmations: false,
      reminderHoursBefore: 2,
    },
    workingHours: {
      start: '09:00',
      end: '18:00',
      slotDuration: 30,
    },
  },
  createdAt: '2024-01-15T10:00:00Z',
};

// ========== MOCK CLIENTS ==========

const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Дмитрий Петров',
    phone: '+998901111111',
    email: 'dmitry@example.com',
    totalVisits: 12,
    totalSpent: 960000,
    lastVisit: '2025-10-15T10:00:00Z',
    tags: ['VIP', 'Постоянный клиент'],
    createdAt: '2024-06-01T10:00:00Z',
  },
  {
    id: 'client-2',
    name: 'Сергей Смирнов',
    phone: '+998902222222',
    totalVisits: 5,
    totalSpent: 400000,
    lastVisit: '2025-10-10T14:00:00Z',
    createdAt: '2024-08-15T10:00:00Z',
  },
  {
    id: 'client-3',
    name: 'Андрей Козлов',
    phone: '+998903333333',
    email: 'andrey@example.com',
    totalVisits: 8,
    totalSpent: 640000,
    lastVisit: '2025-10-18T16:00:00Z',
    tags: ['Постоянный клиент'],
    createdAt: '2024-07-20T10:00:00Z',
  },
  {
    id: 'client-4',
    name: 'Максим Новиков',
    phone: '+998904444444',
    totalVisits: 3,
    totalSpent: 240000,
    createdAt: '2025-09-01T10:00:00Z',
  },
  {
    id: 'client-5',
    name: 'Владимир Белов',
    phone: '+998905555555',
    email: 'vladimir@example.com',
    totalVisits: 15,
    totalSpent: 1200000,
    lastVisit: '2025-10-19T11:00:00Z',
    tags: ['VIP'],
    createdAt: '2024-05-10T10:00:00Z',
  },
];

// ========== MOCK VISITS ==========

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const formatDate = (date: Date) => date.toISOString().split('T')[0];

const mockVisits: Visit[] = [
  // Сегодня - предстоящие
  {
    id: 'visit-1',
    businessId: 'business-1',
    employeeId: 'employee-1',
    clientId: 'client-1',
    serviceIds: ['service-1'],
    date: formatDate(today),
    startTime: '10:00',
    endTime: '10:30',
    status: 'upcoming',
    totalPrice: 80000,
    isPaid: false,
    source: 'phone',
    createdAt: '2025-10-20T08:00:00Z',
    updatedAt: '2025-10-20T08:00:00Z',
  },
  {
    id: 'visit-2',
    businessId: 'business-1',
    employeeId: 'employee-1',
    clientId: 'client-2',
    serviceIds: ['service-1', 'service-2'],
    date: formatDate(today),
    startTime: '11:00',
    endTime: '11:50',
    status: 'upcoming',
    totalPrice: 130000,
    isPaid: false,
    notes: 'Клиент просит мастера Алексея',
    source: 'online',
    createdAt: '2025-10-19T15:00:00Z',
    updatedAt: '2025-10-19T15:00:00Z',
  },
  {
    id: 'visit-3',
    businessId: 'business-1',
    employeeId: 'employee-1',
    clientId: 'client-3',
    serviceIds: ['service-4'],
    date: formatDate(today),
    startTime: '14:00',
    endTime: '14:40',
    status: 'in_progress',
    totalPrice: 60000,
    isPaid: false,
    source: 'walk_in',
    createdAt: '2025-10-21T13:55:00Z',
    updatedAt: '2025-10-21T14:00:00Z',
  },
  // Завтра
  {
    id: 'visit-4',
    businessId: 'business-1',
    employeeId: 'employee-1',
    clientId: 'client-4',
    serviceIds: ['service-1'],
    date: formatDate(tomorrow),
    startTime: '09:00',
    endTime: '09:30',
    status: 'upcoming',
    totalPrice: 80000,
    isPaid: false,
    source: 'online',
    createdAt: '2025-10-20T18:00:00Z',
    updatedAt: '2025-10-20T18:00:00Z',
  },
  {
    id: 'visit-5',
    businessId: 'business-1',
    employeeId: 'employee-1',
    clientId: 'client-5',
    serviceIds: ['service-3'],
    date: formatDate(tomorrow),
    startTime: '15:00',
    endTime: '16:30',
    status: 'upcoming',
    totalPrice: 150000,
    isPaid: true,
    paymentMethod: 'card',
    notes: 'Предоплата внесена',
    source: 'phone',
    createdAt: '2025-10-20T10:00:00Z',
    updatedAt: '2025-10-20T10:00:00Z',
  },
  // Вчера - завершенные
  {
    id: 'visit-6',
    businessId: 'business-1',
    employeeId: 'employee-1',
    clientId: 'client-1',
    serviceIds: ['service-1', 'service-2'],
    date: formatDate(yesterday),
    startTime: '10:00',
    endTime: '10:50',
    status: 'completed',
    totalPrice: 130000,
    isPaid: true,
    paymentMethod: 'cash',
    source: 'phone',
    createdAt: '2025-10-19T08:00:00Z',
    updatedAt: '2025-10-20T10:50:00Z',
  },
  {
    id: 'visit-7',
    businessId: 'business-1',
    employeeId: 'employee-1',
    clientId: 'client-3',
    serviceIds: ['service-1'],
    date: formatDate(yesterday),
    startTime: '14:00',
    endTime: '14:30',
    status: 'completed',
    totalPrice: 80000,
    isPaid: true,
    paymentMethod: 'card',
    source: 'walk_in',
    createdAt: '2025-10-20T13:55:00Z',
    updatedAt: '2025-10-20T14:30:00Z',
  },
];

// ========== MOCK SALES ==========

const mockSales: Sale[] = [
  {
    id: 'sale-1',
    businessId: 'business-1',
    employeeId: 'employee-1',
    clientId: 'client-1',
    items: [
      {
        type: 'service',
        id: 'service-1',
        name: 'Мужская стрижка',
        price: 80000,
        quantity: 1,
      },
      {
        type: 'service',
        id: 'service-2',
        name: 'Стрижка бороды',
        price: 50000,
        quantity: 1,
      },
    ],
    totalAmount: 130000,
    paymentMethod: 'cash',
    date: formatDate(yesterday),
    createdAt: '2025-10-20T10:50:00Z',
  },
  {
    id: 'sale-2',
    businessId: 'business-1',
    employeeId: 'employee-1',
    clientId: 'client-3',
    items: [
      {
        type: 'service',
        id: 'service-1',
        name: 'Мужская стрижка',
        price: 80000,
        quantity: 1,
      },
    ],
    totalAmount: 80000,
    paymentMethod: 'card',
    date: formatDate(yesterday),
    createdAt: '2025-10-20T14:30:00Z',
  },
];

// ========== INITIALIZATION ==========

export function initializeMockData() {
  const store = useAppStore.getState();

  // Login user and set business
  store.login(mockUser);
  store.setBusiness(mockBusiness);

  // Set data
  store.setClients(mockClients);
  store.setVisits(mockVisits);
  store.setSales(mockSales);

  console.log('✅ Mock data initialized');
}

// Export for direct use if needed
export {
  mockUser,
  mockBusiness,
  mockServices,
  mockEmployees,
  mockClients,
  mockVisits,
  mockSales,
};
