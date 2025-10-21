import { useState } from 'react';
import { useAppStore } from '@/shared/store/useAppStore';
import { Icon, type IconName } from '@/shared/ui/Icon';
import { cn, formatTime, formatCurrency, getVisitStatusColor, getVisitStatusLabel, getToday } from '@/shared/lib/utils';
import type { Visit } from '@/shared/types';

export function SimpleModePage() {
  const selectedDate = useAppStore(state => state.selectedDate);
  const visits = useAppStore(state => state.visits);
  const clients = useAppStore(state => state.clients);
  const services = useAppStore(state => state.services);
  const updateVisit = useAppStore(state => state.updateVisit);

  const todayVisits = visits.filter(v => v.date === selectedDate);
  const upcomingVisits = todayVisits.filter(v => v.status === 'upcoming');
  const inProgressVisits = todayVisits.filter(v => v.status === 'in_progress');
  const completedVisits = todayVisits.filter(v => v.status === 'completed');

  const handleStartVisit = (visitId: string) => {
    updateVisit(visitId, { status: 'in_progress' });
  };

  const handleCompleteVisit = (visitId: string) => {
    updateVisit(visitId, {
      status: 'completed',
      isPaid: true,
      paymentMethod: 'cash'
    });
  };

  const handleCancelVisit = (visitId: string) => {
    updateVisit(visitId, { status: 'cancelled' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-2">
          Визиты
        </h1>
        <p className="text-[var(--text-secondary)]">
          {selectedDate === getToday() ? 'Сегодня' : selectedDate}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard
          icon="Clock"
          label="Предстоит"
          value={upcomingVisits.length}
          color="blue"
        />
        <StatCard
          icon="Play"
          label="В процессе"
          value={inProgressVisits.length}
          color="green"
        />
        <StatCard
          icon="Check"
          label="Завершено"
          value={completedVisits.length}
          color="gray"
        />
      </div>

      {/* In Progress Section */}
      {inProgressVisits.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            Сейчас в работе
          </h2>
          <div className="space-y-3">
            {inProgressVisits.map(visit => (
              <VisitCard
                key={visit.id}
                visit={visit}
                client={clients.find(c => c.id === visit.clientId)}
                services={services.filter(s => visit.serviceIds.includes(s.id))}
                onComplete={() => handleCompleteVisit(visit.id)}
                onCancel={() => handleCancelVisit(visit.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Section */}
      {upcomingVisits.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            Предстоящие визиты
          </h2>
          <div className="space-y-3">
            {upcomingVisits.map(visit => (
              <VisitCard
                key={visit.id}
                visit={visit}
                client={clients.find(c => c.id === visit.clientId)}
                services={services.filter(s => visit.serviceIds.includes(s.id))}
                onStart={() => handleStartVisit(visit.id)}
                onCancel={() => handleCancelVisit(visit.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Completed Section */}
      {completedVisits.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            Завершенные визиты
          </h2>
          <div className="space-y-3">
            {completedVisits.map(visit => (
              <VisitCard
                key={visit.id}
                visit={visit}
                client={clients.find(c => c.id === visit.clientId)}
                services={services.filter(s => visit.serviceIds.includes(s.id))}
                isCompleted
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {todayVisits.length === 0 && (
        <div className="text-center py-16">
          <Icon name="Calendar" size={48} className="text-[var(--text-tertiary)] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[var(--text-secondary)] mb-2">
            Нет визитов на сегодня
          </h3>
          <p className="text-sm text-[var(--text-tertiary)]">
            Визиты появятся здесь по мере добавления
          </p>
        </div>
      )}
    </div>
  );
}

// ========== STAT CARD ==========

interface StatCardProps {
  icon: IconName;
  label: string;
  value: number;
  color: 'blue' | 'green' | 'gray';
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    gray: 'bg-gray-50 text-gray-600',
  };

  return (
    <div className="bg-[var(--bg-primary)] rounded-2xl p-5 border border-[var(--border)]">
      <div className={cn('w-10 h-10 rounded-full flex items-center justify-center mb-3', colorClasses[color])}>
        <Icon name={icon} size={20} />
      </div>
      <div className="text-2xl font-semibold text-[var(--text-primary)] mb-1">
        {value}
      </div>
      <div className="text-sm text-[var(--text-secondary)]">
        {label}
      </div>
    </div>
  );
}

// ========== VISIT CARD ==========

interface VisitCardProps {
  visit: Visit;
  client?: { name: string; phone: string };
  services: { name: string; price: number; duration: number }[];
  onStart?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
  isCompleted?: boolean;
}

function VisitCard({ visit, client, services, onStart, onComplete, onCancel, isCompleted }: VisitCardProps) {
  const [showActions, setShowActions] = useState(false);

  const totalDuration = services.reduce((sum, s) => sum + s.duration, 0);

  return (
    <div
      className={cn(
        'bg-[var(--bg-primary)] rounded-2xl p-5 border border-[var(--border)]',
        'transition-all hover:shadow-md',
        isCompleted && 'opacity-60'
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Time */}
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Clock" size={16} className="text-[var(--text-secondary)]" />
            <span className="text-lg font-semibold text-[var(--text-primary)]">
              {formatTime(visit.startTime)} - {formatTime(visit.endTime)}
            </span>
            <span className="text-sm text-[var(--text-tertiary)]">
              ({totalDuration} мин)
            </span>
          </div>

          {/* Client */}
          <div className="flex items-center gap-2 mb-3">
            <Icon name="User" size={16} className="text-[var(--text-secondary)]" />
            <span className="text-base text-[var(--text-primary)]">
              {client?.name || 'Клиент не найден'}
            </span>
            {client && (
              <span className="text-sm text-[var(--text-tertiary)]">
                {client.phone}
              </span>
            )}
          </div>

          {/* Services */}
          <div className="flex flex-wrap gap-2 mb-3">
            {services.map(service => (
              <span
                key={service.name}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-light)] text-[var(--accent)]"
              >
                {service.name}
              </span>
            ))}
          </div>

          {/* Notes */}
          {visit.notes && (
            <div className="flex items-start gap-2 mt-2">
              <Icon name="MessageSquare" size={14} className="text-[var(--text-tertiary)] mt-0.5" />
              <span className="text-sm text-[var(--text-secondary)]">
                {visit.notes}
              </span>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className={cn('px-3 py-1 rounded-full text-xs font-medium', getVisitStatusColor(visit.status))}>
          {getVisitStatusLabel(visit.status)}
        </div>
      </div>

      {/* Price & Payment */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-[var(--text-primary)]">
            {formatCurrency(visit.totalPrice)}
          </span>
          {visit.isPaid && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              <Icon name="Check" size={12} />
              Оплачено
            </span>
          )}
        </div>

        {/* Actions */}
        {!isCompleted && (
          <div className={cn(
            'flex items-center gap-2 transition-opacity',
            showActions ? 'opacity-100' : 'opacity-0'
          )}>
            {onStart && (
              <button
                onClick={onStart}
                className="btn-primary flex items-center gap-2 px-4 py-2 rounded-full"
              >
                <Icon name="Play" size={16} />
                Начать
              </button>
            )}
            {onComplete && (
              <button
                onClick={onComplete}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all"
              >
                <Icon name="Check" size={16} />
                Завершить
              </button>
            )}
            {onCancel && (
              <button
                onClick={onCancel}
                className="btn-secondary flex items-center gap-2 px-3 py-2 rounded-full text-red-600"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
