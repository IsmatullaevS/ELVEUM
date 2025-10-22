import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { ThemeSwitcher } from '@/features/theme-switcher';

export function ThemeDemo() {
  return (
    <div className="min-h-screen p-8 bg-[var(--color-bg-primary)]">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">
            Система дизайн-токенов
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Демонстрация компонентов с поддержкой тем
          </p>
          <div className="flex justify-center">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Buttons */}
        <Card>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            Кнопки
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                Primary варианты:
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button variant="primary" size="sm">
                  Маленькая
                </Button>
                <Button variant="primary" size="md">
                  Средняя
                </Button>
                <Button variant="primary" size="lg">
                  Большая
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                Secondary варианты:
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button variant="secondary" size="sm">
                  Маленькая
                </Button>
                <Button variant="secondary" size="md">
                  Средняя
                </Button>
                <Button variant="secondary" size="lg">
                  Большая
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                Ghost варианты:
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button variant="ghost" size="sm">
                  Маленькая
                </Button>
                <Button variant="ghost" size="md">
                  Средняя
                </Button>
                <Button variant="ghost" size="lg">
                  Большая
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                Disabled состояние:
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button variant="primary" disabled>
                  Отключена
                </Button>
                <Button variant="secondary" disabled>
                  Отключена
                </Button>
                <Button variant="ghost" disabled>
                  Отключена
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Inputs */}
        <Card>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            Поля ввода
          </h2>
          <div className="space-y-4">
            <Input placeholder="Обычное поле ввода" />
            <Input placeholder="Поле с ошибкой" error="Это сообщение об ошибке" />
            <Input placeholder="Отключенное поле" disabled />
          </div>
        </Card>

        {/* Cards */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Карточки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                Карточка 1
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Это пример карточки с контентом
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                Карточка 2
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Карточки адаптируются под тему
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                Карточка 3
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Попробуйте сменить тему выше!
              </p>
            </Card>
          </div>
        </div>

        {/* Colors */}
        <Card>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            Цветовая палитра
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                Фоны:
              </p>
              <div className="grid grid-cols-4 gap-2">
                <div className="h-20 rounded bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] flex items-center justify-center text-xs">
                  Primary
                </div>
                <div className="h-20 rounded bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] flex items-center justify-center text-xs">
                  Secondary
                </div>
                <div className="h-20 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border-default)] flex items-center justify-center text-xs">
                  Tertiary
                </div>
                <div className="h-20 rounded bg-[var(--color-bg-brand)] flex items-center justify-center text-xs text-white">
                  Brand
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                Текст:
              </p>
              <div className="space-y-1">
                <p className="text-[var(--color-text-primary)]">
                  Primary текст
                </p>
                <p className="text-[var(--color-text-secondary)]">
                  Secondary текст
                </p>
                <p className="text-[var(--color-text-tertiary)]">
                  Tertiary текст
                </p>
                <p className="text-[var(--color-text-brand)]">Brand текст</p>
                <p className="text-[var(--color-text-success)]">Success текст</p>
                <p className="text-[var(--color-text-error)]">Error текст</p>
                <p className="text-[var(--color-text-warning)]">
                  Warning текст
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Typography */}
        <Card>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            Типографика
          </h2>
          <div className="space-y-2">
            <p className="text-4xl text-[var(--color-text-primary)]">
              Heading 1
            </p>
            <p className="text-3xl text-[var(--color-text-primary)]">
              Heading 2
            </p>
            <p className="text-2xl text-[var(--color-text-primary)]">
              Heading 3
            </p>
            <p className="text-xl text-[var(--color-text-primary)]">
              Heading 4
            </p>
            <p className="text-lg text-[var(--color-text-primary)]">
              Large text
            </p>
            <p className="text-base text-[var(--color-text-primary)]">
              Base text
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Small text
            </p>
            <p className="text-xs text-[var(--color-text-tertiary)]">
              Extra small text
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
