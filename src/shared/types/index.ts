// ========== USER & AUTH ==========

export type UserRole = 'solo_master' | 'salon_owner' | 'employee' | 'client';
export type UIMode = 'simple' | 'full';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  businessId?: string;
  preferredUIMode: UIMode;
  avatar?: string;
  createdAt: string;
}

// ========== BUSINESS ==========

export type BusinessType = 'solo' | 'salon';

export interface Business {
  id: string;
  name: string;
  type: BusinessType;
  ownerId: string;
  address: string;
  phone: string;
  description?: string;
  logo?: string;
  services: Service[];
  employees: Employee[];
  settings: BusinessSettings;
  createdAt: string;
}

// ========== SERVICES ==========

export type ServiceCategory = 'haircut' | 'beard' | 'coloring' | 'styling' | 'spa' | 'nails' | 'other';

export interface Service {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  duration: number; // minutes
  price: number;
  category: ServiceCategory;
  isActive: boolean;
  imageUrl?: string;
}

// ========== EMPLOYEES ==========

export interface Employee {
  id: string;
  userId: string;
  businessId: string;
  position: string;
  services: string[]; // service IDs
  schedule: Schedule;
  salary: SalaryConfig;
  isActive: boolean;
  hiredAt: string;
}

export interface Schedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isWorking: boolean;
  start: string;
  end: string;
  breaks: Array<{ start: string; end: string }>;
}

// ========== VISITS ==========

export type VisitStatus =
  | 'upcoming'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export type VisitSource = 'online' | 'phone' | 'walk_in' | 'manual';

export interface Visit {
  id: string;
  businessId: string;
  employeeId: string;
  clientId: string;
  serviceIds: string[];

  date: string;
  startTime: string;
  endTime: string;

  status: VisitStatus;
  totalPrice: number;
  isPaid: boolean;
  paymentMethod?: 'cash' | 'card' | 'transfer';

  notes?: string;
  source: VisitSource;

  createdAt: string;
  updatedAt: string;
}

// ========== CLIENTS ==========

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  totalVisits: number;
  totalSpent: number;
  lastVisit?: string;
  notes?: string;
  tags?: string[];
  createdAt: string;
}

// ========== SALES ==========

export interface Sale {
  id: string;
  businessId: string;
  employeeId?: string;
  clientId?: string;
  items: SaleItem[];
  totalAmount: number;
  paymentMethod: 'cash' | 'card' | 'transfer';
  date: string;
  createdAt: string;
}

export interface SaleItem {
  type: 'service' | 'product';
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// ========== SALARY ==========

export type SalaryType = 'fixed' | 'percentage' | 'hybrid';

export interface SalaryConfig {
  type: SalaryType;
  fixedAmount?: number;
  percentage?: number;
  bonuses?: Array<{
    condition: string;
    amount: number;
  }>;
}

// ========== SETTINGS ==========

export interface BusinessSettings {
  currency: 'UZS' | 'USD';
  timezone: string;
  locale: 'ru' | 'uz' | 'en';
  bookingSettings: {
    allowOnlineBooking: boolean;
    requireDeposit: boolean;
    depositAmount?: number;
    cancellationPolicy: string;
    minAdvanceBooking: number;
  };
  notifications: {
    smsReminders: boolean;
    emailConfirmations: boolean;
    reminderHoursBefore: number;
  };
  workingHours: {
    start: string;
    end: string;
    slotDuration: number;
  };
}
