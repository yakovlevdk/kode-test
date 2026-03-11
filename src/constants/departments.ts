export const DEPARTMENT_LABELS: Record<string, string> = {
  all: 'Все',
  android: 'Android',
  ios: 'iOS',
  design: 'Дизайн',
  management: 'Менеджмент',
  qa: 'QA',
  back_office: 'Бэк-офис',
  frontend: 'Frontend',
  hr: 'HR',
  pr: 'PR',
  backend: 'Backend',
  support: 'Техподдержка',
  analytics: 'Аналитика',
} as const;

export const DEPARTMENT_KEYS = Object.keys(DEPARTMENT_LABELS).filter(
  (k) => k !== 'all',
) as Exclude<keyof typeof DEPARTMENT_LABELS, 'all'>[];
