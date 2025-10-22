import { useState, useMemo } from 'react';
import { useAppStore } from '@/shared/store/useAppStore';
import { ServiceCard } from '@/entities/service/ui/ServiceCard';
import { ServiceFormModal } from '@/features/service-form/ui/ServiceFormModal';
import { Icon } from '@/shared/ui/Icon';
import { SERVICE_CATEGORIES } from '@/shared/types';
import type { Service, ServiceCategory } from '@/shared/types';

export function CatalogPage() {
  const { services, visits, uiMode } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [showInactive, setShowInactive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Calculate stats
  const serviceStats = useMemo(() => {
    const stats: Record<string, { bookings: number; revenue: number }> = {};

    services.forEach(service => {
      stats[service.id] = { bookings: 0, revenue: 0 };
    });

    visits.forEach(visit => {
      visit.serviceIds.forEach(sid => {
        if (stats[sid]) {
          stats[sid].bookings++;
          if (visit.status === 'completed') {
            stats[sid].revenue += visit.totalPrice / visit.serviceIds.length;
          }
        }
      });
    });

    return stats;
  }, [services, visits]);

  // Filter services
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      // Search
      if (searchQuery && !service.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category
      if (selectedCategory !== 'all' && service.category !== selectedCategory) {
        return false;
      }

      // Active/Inactive
      if (!showInactive && !service.isActive) {
        return false;
      }

      return true;
    });
  }, [services, searchQuery, selectedCategory, showInactive]);

  // Group by category
  const groupedServices = useMemo(() => {
    const groups: Record<string, Service[]> = {};

    filteredServices.forEach(service => {
      if (!groups[service.category]) {
        groups[service.category] = [];
      }
      groups[service.category].push(service);
    });

    return groups;
  }, [filteredServices]);

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingService(null);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="h2 mb-1">Каталог услуг</h1>
            <p className="text-sm text-secondary">
              {filteredServices.length} {filteredServices.length === 1 ? 'услуга' : 'услуг'}
            </p>
          </div>
          <button onClick={handleAddNew} className="btn-primary">
            <Icon name="Calendar" size={18} />
            Добавить услугу
          </button>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Icon
                  name="search"
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск услуг..."
                  className="input pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ServiceCategory | 'all')}
              className="input w-full sm:w-48"
            >
              <option value="all">Все категории</option>
              {Object.entries(SERVICE_CATEGORIES).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            {/* Show Inactive Toggle */}
            <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap">
              <input
                type="checkbox"
                checked={showInactive}
                onChange={(e) => setShowInactive(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Показать неактивные</span>
            </label>
          </div>
        </div>

        {/* Services List */}
        {filteredServices.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-tertiary)] grid place-items-center">
              <Icon name="search" size={24} className="text-[var(--text-tertiary)]" />
            </div>
            <div className="text-lg font-medium mb-1">Услуги не найдены</div>
            <p className="text-sm text-secondary mb-4">
              {searchQuery ? 'Попробуйте изменить параметры поиска' : 'Добавьте первую услугу'}
            </p>
            {!searchQuery && (
              <button onClick={handleAddNew} className="btn-primary">
                Добавить услугу
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedServices).map(([category, categoryServices]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-3">
                  {SERVICE_CATEGORIES[category as ServiceCategory]}
                  <span className="ml-2 text-sm text-tertiary font-normal">
                    ({categoryServices.length})
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categoryServices.map(service => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      variant={uiMode === 'full' ? 'detailed' : 'compact'}
                      stats={serviceStats[service.id]}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <ServiceFormModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        editService={editingService}
      />
    </div>
  );
}
