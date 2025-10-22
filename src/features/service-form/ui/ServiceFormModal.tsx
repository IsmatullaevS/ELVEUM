import { useState, useEffect } from 'react';
import { useAppStore } from '@/shared/store/useAppStore';
import { generateId, cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/Icon';
import type { Service, ServiceCategory } from '@/shared/types';
import { SERVICE_CATEGORIES } from '@/shared/types';

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editService?: Service | null;
}

export function ServiceFormModal({ isOpen, onClose, editService }: ServiceFormModalProps) {
  const { addService, updateService, business } = useAppStore();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 30,
    price: 0,
    category: 'haircut' as ServiceCategory,
    isActive: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editService) {
      setFormData({
        name: editService.name,
        description: editService.description || '',
        duration: editService.duration,
        price: editService.price,
        category: editService.category,
        isActive: editService.isActive,
      });
    } else {
      // Reset form
      setFormData({
        name: '',
        description: '',
        duration: 30,
        price: 0,
        category: 'haircut',
        isActive: true,
      });
    }
    setErrors({});
  }, [editService, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите название услуги';
    }

    if (formData.duration <= 0) {
      newErrors.duration = 'Длительность должна быть больше 0';
    }

    if (formData.price < 0) {
      newErrors.price = 'Цена не может быть отрицательной';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    if (!business) return;

    if (editService) {
      // Update
      updateService(editService.id, formData);
    } else {
      // Create
      const newService: Service = {
        id: generateId('srv'),
        businessId: business.id,
        ...formData,
      };
      addService(newService);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[var(--border-light)] px-6 py-4 flex items-center justify-between">
          <h2 className="h3">
            {editService ? 'Редактировать услугу' : 'Новая услуга'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[var(--bg-secondary)] grid place-items-center transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Название услуги <span className="text-[var(--danger)]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={cn(
                'input',
                errors.name && 'border-[var(--danger)] focus:border-[var(--danger)]'
              )}
              placeholder="Например: Мужская стрижка"
            />
            {errors.name && (
              <p className="text-xs text-[var(--danger)] mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Описание
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input min-h-[80px] resize-none"
              placeholder="Краткое описание услуги..."
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Категория <span className="text-[var(--danger)]">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ServiceCategory })}
              className="input"
            >
              {Object.entries(SERVICE_CATEGORIES).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Duration & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Длительность (мин) <span className="text-[var(--danger)]">*</span>
              </label>
              <input
                type="number"
                min="5"
                step="5"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                className={cn(
                  'input',
                  errors.duration && 'border-[var(--danger)]'
                )}
              />
              {errors.duration && (
                <p className="text-xs text-[var(--danger)] mt-1">{errors.duration}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Цена (UZS) <span className="text-[var(--danger)]">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                className={cn(
                  'input',
                  errors.price && 'border-[var(--danger)]'
                )}
              />
              {errors.price && (
                <p className="text-xs text-[var(--danger)] mt-1">{errors.price}</p>
              )}
            </div>
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[var(--accent)] transition-colors">
                <div className={cn(
                  "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                  formData.isActive && "translate-x-5"
                )} />
              </div>
            </label>
            <span className="text-sm">
              {formData.isActive ? 'Услуга активна' : 'Услуга неактивна'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              {editService ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
