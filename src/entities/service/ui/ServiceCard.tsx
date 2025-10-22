import { useState } from 'react';
import type { Service } from '@/shared/types';
import { useAppStore } from '@/shared/store/useAppStore';
import { formatPrice, formatDuration, cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/Icon';

interface ServiceCardProps {
  service: Service;
  variant?: 'compact' | 'detailed';
  stats?: {
    bookings: number;
    revenue: number;
  };
}

export function ServiceCard({ service, variant = 'compact', stats }: ServiceCardProps) {
  const [showActions, setShowActions] = useState(false);
  const { updateService, deleteService } = useAppStore();

  const handleToggleActive = () => {
    updateService(service.id, { isActive: !service.isActive });
  };

  const handleDelete = () => {
    if (confirm(`Удалить услугу "${service.name}"?`)) {
      deleteService(service.id);
    }
  };

  return (
    <div
      className={cn(
        'card p-4 transition-all',
        !service.isActive && 'opacity-50',
        showActions && 'ring-2 ring-[var(--accent)]'
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-[15px] truncate">{service.name}</h3>
            {!service.isActive && (
              <span className="badge badge-gray text-xs">Неактивна</span>
            )}
          </div>

          {service.description && variant === 'detailed' && (
            <p className="text-sm text-secondary mb-2 line-clamp-2">
              {service.description}
            </p>
          )}

          <div className="flex items-center gap-3 text-sm text-secondary">
            <span className="flex items-center gap-1">
              <Icon name="Clock" size={14} />
              {formatDuration(service.duration)}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="tag" size={14} />
              {formatPrice(service.price)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0">
          {showActions ? (
            <div className="flex items-center gap-1">
              <button
                onClick={handleToggleActive}
                className="btn-ghost h-8 px-3 text-xs"
                title={service.isActive ? 'Деактивировать' : 'Активировать'}
              >
                <Icon name={service.isActive ? 'Check' : 'X'} size={14} />
              </button>
              <button
                onClick={() => {/* TODO: Edit modal */}}
                className="btn-ghost h-8 px-3 text-xs"
                title="Редактировать"
              >
                <Icon name="settings" size={14} />
              </button>
              <button
                onClick={handleDelete}
                className="btn-ghost h-8 px-3 text-xs text-[var(--danger)]"
                title="Удалить"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          ) : (
            <div className="text-right">
              <div className="font-semibold">{formatPrice(service.price)}</div>
              {stats && variant === 'detailed' && (
                <div className="text-xs text-tertiary mt-0.5">
                  {stats.bookings} записей
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats (только в detailed) */}
      {variant === 'detailed' && stats && (
        <div className="mt-3 pt-3 border-t border-[var(--border-light)] flex items-center gap-4 text-xs">
          <div>
            <span className="text-tertiary">Записей: </span>
            <span className="font-medium">{stats.bookings}</span>
          </div>
          <div>
            <span className="text-tertiary">Выручка: </span>
            <span className="font-medium">{formatPrice(stats.revenue)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
