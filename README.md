# Discord-бот для сбора активностей в Destiny 2.

## Главная задача

Автоматизация сбора активностей в **Destiny 2**. При помощи соответствующих слэш-команд позволяет собрать боевую группу в **рейд**, **подземелье** или в **любою другую активность**. Создаёт сообщение с информацией о сборе и о записанных в него участниках, а также кнопками для взаимодействия. Лидер сбора может управлять отменить и перенести сбор, а также передать лидерство.

Так в среднем выглядят команды бота.

![пример команды для создания сбора](https://sun9-43.userapi.com/impg/xYKeVlCYqKt5mDEBJIsWcfnvhOqTfg70oFCDzA/zRKToaL-YIU.jpg?size=1203x353&quality=96&sign=59c0b98b2c3a826087c10ee172a875a6&type=album)

А это пример использования команды выше. 

![пример сообщения сбора](https://sun9-60.userapi.com/impg/vXOl6uRWiQgYjyCczwNzRMEPdNTAUxwEIQKfeQ/ZdOgoDgMJ5w.jpg?size=715x373&quality=96&sign=323df88a269c14ed6a5a58edfe0a9338&type=album)

### Прочие возможности

Позволяет создавать пользователям произвольные embed-сообщения. Админы могут модерировать сборы в активности. Всё прочее я убрал, пока не доведу сборы до лучшего состояния.

Лидеры могут бронировать места в сборах. Количество брони ограничено и каждую бронь Страж подтверждает или отклоняет отдельно, в личных сообщениях.

А ещё время теперь необязательно указывать - можно сделать сбор по готовности. Команда кастомного сбора вообще позволяет собрать кого-угодно и куда-угодно - её я предполагаю использовать для локальных турниров. 

## Используемые технологии

Код написан на *JavaScript* при использовании библиотеки *discord.js*. Выполняется в среде *node.js*. Для загрузки необходимых модулей используйте *npm* (кроме *discord.js* установится ещё *dotenv*). Бот не имеет глобальных команд и вообще не создан для массового использования. По крайней мере, на данный момент точно (09.01.23).
>Дополнение от 24.04.23: скоро решу вопрос с глобальными командами.

## Развёртывание бота

>Дополнение от 24.04.23: абзац ниже - это полный кошмар, вопрос с развёртыванием решу в ближайшее время; сделаю также глобальные команды и возможность просто добавить бота на сервер, так как теперь я в боте уверен

Код работает для любого Discord-бота. Достаточно добавить в папку файл с названием "**.env**" и записать туда переменную "TOKEN" с токеном бота. Для регистрации команд бота в этот же **.env** файл надо добавить переменные "clientId" - это id вашего бота и "guildId" - это id вашего сервера. Теперь можно при помощи команды  "**node deploy-commands.js**" зарегистрировать команды бота на сервере. Главный исполняемый файл - **index.js**. Через него и запускается бот.

> Если вдруг кто-то когда-нибудь найдёт этот репозиторий и захочет развернуть этого бота у себя, можете делать это свободно. При возникновении трудностей, можно обращаться ко мне в Discord - Arcky#8348.
