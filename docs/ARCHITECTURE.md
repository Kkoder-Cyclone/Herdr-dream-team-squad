# Архитектура Dream Team Squad

## Слои

```
Пользователь → Herdr TUI → workspace «Dream Team Squad» (4 таба)
```

## Роли и маршрут

| Alias | CLI | Роль |
|---|---|---|
| mayak | Claude | лид: цель, план, раздача, приёмка |
| veter | Hermes | заместитель: аудит, ревью, координация |
| forge | OpenCode | тяжёлый код, серверы, PR |
| iskra | Grok | мост: поиск, черновики, связь |

Маршрут: **пользователь → Маяк → Гермес → Forge / Грок → Маяк → пользователь**.

## Git-цикл

Задача → ветка → коммиты → push ветки → PR → ревью (Гермес/Маяк) → merge с подтверждением владельца. Напрямую в основную ветку не пушим; конфликт — блокер в карточке. Merge ≠ деплой.

## Механика запуска (TUI)

```
herdr workspace list            # найти/создать «Dream Team Squad»
herdr tab create --workspace wK --cwd <место агента>
herdr agent start <name> --kind <cli> --pane <pane> --timeout 90000
herdr tab rename <tab> <label>
herdr agent list                # проверка статусов
```

Идемпотентность: перед подъёмом — проверка имени в agent list; живой — «уже работает».

## Приёмка

1. `a dream check` — четверо с статусами и табами.
2. Повторный `a dream all` — без дублей.
3. Запуск в папке проекта: `a dream mayak <папка>` — cwd проекта, профиль свой.
