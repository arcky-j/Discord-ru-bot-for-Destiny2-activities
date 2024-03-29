const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
//команда для вызова помощи
module.exports = {
    data: new SlashCommandBuilder()
        .setName('помощь')
        .setDescription('Показывает справку для пользования ботом. Укажите команду, чтобы получить точную справку по ней')
        .addStringOption(option => 
            option.setName('команда')
                .setDescription('Ввод команды для подробной справке о ней')
                .addChoices(
                    {name: '/сбор рейд', value: 'raid'},
                    {name: '/сбор подземелье', value: 'dung'},
                    {name: '/сбор другое', value: 'custom'},
                    {name: '/отменить', value: 'cancel'},
                    {name: '/перенести', value: 'dateChange'},
                    {name: '/передать', value: 'leaderChange'},
                    {name: '/создать_embed', value: 'embed'},
                    {name: '/бронь добавить', value: 'bronAdd'},
                    {name: '/бронь удалить', value: 'bronDel'},
                )),

    async execute(interaction) {
        const command = interaction.options.getString('команда');
        //сообщение строится из нескольких констант
        //не лучшая идея весь этот текст держать в константах, но пока так; команд ещё не слишком много
        //рекомендую просматривать этот файл с включённым word wrap'ом
        const title = 'Выполнен запрос на получение справки...\n\n';
        let description = '"{}" - обязательные параметры,  "[]" - дополнительные параметры.\n\n';
        const cmd1 = 'Команда для сбора команды в рейды. Создаёт сообщение с карточкой сбора. Карточка содержит: название рейда, требования и заметку от лидера (если есть), время и дату начала рейда (если таковые есть), готовых пойти Стражей, Стражей в резерве и ID для взаимодействия с карточкой. Присутствуют кнопки для вступления в боевую группу и резерв, а также выхода из них.\nЗа 10 минут до начала рейда все участники получат уведомление в личные сообщения (или по старту активности лидером, если сбор был по готовности). Если в боевой группе нет 6 Стражей, уведомление получают и резервисты.\nРейд можно отменить, перенести и передать другому игроку, если вы лидер группы.\n';
        const cmd2 = 'Тоже самое, что и рейд, но с подземельями. За 10 минут до начала подземелья участники получат уведомление в личные сообщения. Если в боевой группе нет 3 Стражей, уведомление получают и резервисты.\nПодземелье можно отменить, перенести и передать другому игроку, если вы лидер группы.\n';
        const cmd3 = 'Команда для сбора команды куда угодно - это вы определяете сами. Создаёт сообщение с карточкой сбора. Созданное сообщение содержит: название активности, требования и заметку от лидера (если есть), время и дату начала активности (если таковые есть), готовых пойти Стражей, Стражей в резерве и ID для взаимодействия. Присутствуют кнопки для вступления в боевую группу и резерв, а также выхода из них.\nЗа 10 минут до начала активности все участники получат уведомление в личные сообщения (или по старту активности лидером, если сбор был по готовности). Если в боевой группе нет указанного количества Стражей, уведомление получают и резервисты.\nАктивность можно отменить, перенести и передать другому игроку, если вы лидер группы.\n';
        const cmd4 = 'Удаляет активный сбор. Работает только если вы лидер группы. ID сообщения прикреплено внизу карточки сбора, просто копируйте его оттуда.\nПри отмене активности уведомление появится в канале, где был сбор (там же будет написана причина, если она указана), и все записанные в боевую группу участники (кроме лидера - он же отменял, сам знает) получат личное уведомление о отмене.\n';
        const cmd5 = 'Передаёт лидерство активного сбора другому пользователю. Работает только если вы лидер группы. ID сообщения прикреплено внизу карточки сбора, просто копируйте его оттуда.\nПри передаче активности уведомление появится в канале, где был сбор (там же будет написана причина, если она указана).\n';
        const cmd6 = 'Переносит время начала и дату активного сбора. Работает только если вы лидер группы. ID сообщения прикреплено внизу карточки сбора, просто скопируйте его оттуда.\nПри переносе активности уведомление появится в канале, где был сбор (там же будет написана причина, если она указана), и все записанные в боевую группу участники (кроме вас) получат личное уведомление о отмене.\n';
        const cmd7 = 'Позволяет создать своё простое embed-сообщение. Выполните команду, чтобы открыть всплывающее окно с параметрами. В первую строку вводите заголовок, а во второе поле - содержание и отправляете форму. Остальное бот сделает за вас: выберет случайный цвет, добавит вашу аватарку в качестве баннера и подпишет сообщение.\n';
        const cmd10 = 'Позволяет лидеру активности забронировать место в сборе любому стражу.';
        const cmd11 = 'Позволяет лидеру активности отозвать бронь в сборе';

        const conclusion = `Респект за обращение! Если остались вопросы, можете обращаться к Arcky#8348\nХорошего дня, вечера или чего бы там у вас не было, ${interaction.user.tag}!`;
        
        if (!command){
            description = 'Общая информация. Бот создан упростить поиск боевых групп в активности Destiny 2. Для создания сбора воспользуйтесь командами /сбор рейд /сбор подземелье или, если вам надо что-то вне рейдов и подземелий, /сбор другое. Эти команды создают сообщение с карточкой сбора. У такого сообщения есть кнопки, чтобы другие стражи могли записываться в ваш сбор. Для управления сборами лидер может использовать команды /отменить /перенести и /передать. Для получения более подробной справки о комманде введите "/помощь [команда]".';
        }
        //создание embed, для каждой команды своя информация
        const embed = new EmbedBuilder()
            .setColor(0x3cb8de)
            .setTitle(title)
            .setDescription(description)
            //.setThumbnail('https://i.ibb.co/pdRdLHT/image.png')
            .setFooter({text: conclusion});
        switch (command){
            case 'raid': embed.addFields({name: '**/рейд {название рейда} [время начала рейда по МСК] [дата рейда] [требования к участникам] [заметка от лидера сбора] [сложность] [бронь 1] [бронь2]**', value:cmd1});
                break;
            case 'dung': embed.addFields({name: '**/подземелье {название подземелья} [время начала подземелья по МСК] [дата подземелья] [требования к участникам] [заметка от лидера сбора] [сложность] [бронь 1]**', value:cmd2});
                break;
            case 'custom': embed.addFields({name: '**/сбор_настройка {название активности} {количество человек} [время начала активности по МСК] [дата активности] [требования к участникам] [заметка от лидера сбора]**', value:cmd3});
                break;
            case 'cancel': embed.addFields({name: '**/отменить {id активности} [причина]**', value:cmd4});
                break;
            case 'dateChange': embed.addFields({name: '**/передать {ник нового лидера} {id активности} [причина]**', value:cmd5});
                break;
            case 'leaderChange': embed.addFields({name: '**/перенести {новое время рейда} [новая дата рейда] {id активности} [причина]**', value:cmd6});
                break;
            case 'embed': embed.addFields({name: '**/создать_embed**', value:cmd7});
                break;
            case 'bronAdd': embed.addFields({name: '**/бронь добавить {пользователь} {id сбора}**', value:cmd10});
                break;
            case 'bronDel': embed.addFields({name: '**/бронь удалить {пользователь} {id сбора}**', value:cmd11});
                break;
            default: embed.addFields({name: '**/помощь**', value:'В этом месте отображаются подробные описания комманд при вводе "/помощь [команда]"'});
                break;
        }
        await interaction.reply({embeds: [embed], ephemeral:true});
    }
}