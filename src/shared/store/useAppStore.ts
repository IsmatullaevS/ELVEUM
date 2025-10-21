import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  User, Business, Visit, Client, Service, Employee, UIMode, Sale
} from '@/shared/types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  business: Business | null;
  uiMode: UIMode;
  visits: Visit[];
  clients: Client[];
  services: Service[];
  employees: Employee[];
  sales: Sale[];
  selectedDate: string;
  selectedEmployeeIds: string[];
  visitStatusFilter: string[];
}

interface AppActions {
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setBusiness: (business: Business) => void;
  updateBusiness: (updates: Partial<Business>) => void;
  setUIMode: (mode: UIMode) => void;
  toggleUIMode: () => void;
  setVisits: (visits: Visit[]) => void;
  addVisit: (visit: Visit) => void;
  updateVisit: (id: string, updates: Partial<Visit>) => void;
  deleteVisit: (id: string) => void;
  setClients: (clients: Client[]) => void;
  addClient: (client: Client) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  setServices: (services: Service[]) => void;
  addService: (service: Service) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  setEmployees: (employees: Employee[]) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  setSales: (sales: Sale[]) => void;
  addSale: (sale: Sale) => void;
  setSelectedDate: (date: string) => void;
  setSelectedEmployeeIds: (ids: string[]) => void;
  setVisitStatusFilter: (statuses: string[]) => void;
  reset: () => void;
}

export type AppStore = AppState & AppActions;

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  business: null,
  uiMode: 'simple',
  visits: [],
  clients: [],
  services: [],
  employees: [],
  sales: [],
  selectedDate: new Date().toISOString().slice(0, 10),
  selectedEmployeeIds: [],
  visitStatusFilter: ['upcoming', 'in_progress'],
};

export const useAppStore = create<AppStore>()(
  immer<AppStore>((set) => ({
    ...initialState,

    login: (user) => set((state) => {
      state.user = user;
      state.isAuthenticated = true;
      state.uiMode = user.preferredUIMode;
    }),

    logout: () => set((state) => {
      Object.assign(state, initialState);
    }),

    updateUser: (updates) => set((state) => {
      if (state.user) {
        Object.assign(state.user, updates);
      }
    }),

    setBusiness: (business) => set((state) => {
      state.business = business;
      state.services = business.services;
      state.employees = business.employees;
    }),

    updateBusiness: (updates) => set((state) => {
      if (state.business) {
        Object.assign(state.business, updates);
      }
    }),

    setUIMode: (mode) => set((state) => {
      state.uiMode = mode;
      if (state.user) {
        state.user.preferredUIMode = mode;
      }
    }),

    toggleUIMode: () => set((state) => {
      const newMode = state.uiMode === 'simple' ? 'full' : 'simple';
      state.uiMode = newMode;
      if (state.user) {
        state.user.preferredUIMode = newMode;
      }
    }),

    setVisits: (visits) => set((state) => { state.visits = visits; }),
    addVisit: (visit) => set((state) => { state.visits.push(visit); }),
    updateVisit: (id, updates) => set((state) => {
      const visit = state.visits.find(v => v.id === id);
      if (visit) Object.assign(visit, updates, { updatedAt: new Date().toISOString() });
    }),
    deleteVisit: (id) => set((state) => {
      state.visits = state.visits.filter(v => v.id !== id);
    }),

    setClients: (clients) => set((state) => { state.clients = clients; }),
    addClient: (client) => set((state) => { state.clients.push(client); }),
    updateClient: (id, updates) => set((state) => {
      const client = state.clients.find(c => c.id === id);
      if (client) Object.assign(client, updates);
    }),

    setServices: (services) => set((state) => { state.services = services; }),
    addService: (service) => set((state) => { state.services.push(service); }),
    updateService: (id, updates) => set((state) => {
      const service = state.services.find(s => s.id === id);
      if (service) Object.assign(service, updates);
    }),
    deleteService: (id) => set((state) => {
      state.services = state.services.filter(s => s.id !== id);
    }),

    setEmployees: (employees) => set((state) => { state.employees = employees; }),
    addEmployee: (employee) => set((state) => { state.employees.push(employee); }),
    updateEmployee: (id, updates) => set((state) => {
      const employee = state.employees.find(e => e.id === id);
      if (employee) Object.assign(employee, updates);
    }),

    setSales: (sales) => set((state) => { state.sales = sales; }),
    addSale: (sale) => set((state) => { state.sales.push(sale); }),

    setSelectedDate: (date) => set((state) => { state.selectedDate = date; }),
    setSelectedEmployeeIds: (ids) => set((state) => { state.selectedEmployeeIds = ids; }),
    setVisitStatusFilter: (statuses) => set((state) => { state.visitStatusFilter = statuses; }),

    reset: () => set((state) => { Object.assign(state, initialState); }),
  }))
);

// Selectors
export const selectUpcomingVisits = (state: AppStore) =>
  state.visits.filter(v => v.status === 'upcoming');

export const selectCurrentVisits = (state: AppStore) =>
  state.visits.filter(v => v.status === 'in_progress');

export const selectPastVisits = (state: AppStore) =>
  state.visits.filter(v =>
    v.status === 'completed' || v.status === 'cancelled' || v.status === 'no_show'
  );
