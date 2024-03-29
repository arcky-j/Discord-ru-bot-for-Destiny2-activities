const {SlashCommandBuilder} = require('discord.js');
const {getRandomColor, Activity, ActivityEvents} = require('../fireteams_module');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('сбор')
        .setDescription('Команда для начала сбора')
            .addSubcommand(subcommand =>
                subcommand
            .setName('рейд')
            .setDescription('Начинает сбор в рейд')
            .addStringOption(option => 
                option.setName('название')
                    .setDescription('В какой рейд вы хотите собрать людей?')
                    .setRequired(true)
                    .addChoices(
                        {name: 'Крах Кроты', value: 'Крах Кроты'},
                        {name: 'Источник Кошмаров', value: 'Источник Кошмаров'},
                        {name: 'Гибель Короля', value: 'Гибель Короля'},
                        {name: 'Клятва Послушника', value: 'Клятва Послушника'},
                        {name: 'Хрустальный Чертог', value: 'Хрустальный Чертог'},
                        {name: 'Склеп Глубокого Камня', value: 'Склеп Глубокого Камня'},
                        {name: 'Сад Спасения', value: 'Сад Спасения'},
                        {name: 'Последнее Желание', value: 'Последнее Желание'}                                              
                    ))
            .addStringOption(option => 
                option.setName('время')
                    .setDescription('Время рейда по мск в формате "ЧЧ:ММ". Не вводите для сбора по готовности.')
                    .setRequired(false))
            .addStringOption(option => 
                option.setName('дата')
                    .setDescription('Дата рейда в формате "ДД.ММ". Не вводите для сбора по готовности.')
                    .setRequired(false))
            .addStringOption(option =>
                option.setName('требования')
                    .setDescription('Ваши требования к участникам (необязательно)'))
            .addStringOption(option =>
                option.setName('описание')
                    .setDescription('Ваши дополнительные заметки (необязательно)'))
            .addStringOption(option =>
                option.setName('медиа')
                    .setDescription('Ссылка на картинку или гифку для оформления (ТОЛЬКО URL!)'))
            .addStringOption(option =>
                option.setName('сложность')
                    .setDescription('Установка сложности рейда (по умолчанию обычная)')
                    .addChoices(
                        {name: 'Обычная', value: 'Обычная'},
                        {name: 'Мастер', value: 'Мастер'}
                    ))
            .addUserOption(option =>
                option.setName('бронь1')
                    .setDescription('Забронируйте место для Стража (всего 2 места для брони в рейд)'))
            .addUserOption(option =>
                option.setName('бронь2')
                    .setDescription('Забронируйте место для Стража (всего 2 места для брони в рейд)')))
        .addSubcommand(subcommand =>
            subcommand
            .setName('подземелье')
            .setDescription('Начинает сбор в подземелье')
            .addStringOption(option => 
                option.setName('название')
                    .setDescription('В какое поземелье вы хотите собрать людей?')
                    .setRequired(true)
                    .addChoices(
                        {name: 'Руины Полководца', value: 'Руины Полководца'},
                        {name: 'Призраки Глубин', value: 'Призраки Глубин'},
                        {name: 'Шпиль Хранителя', value: 'Шпиль Хранителя'},
                        {name: 'Дуальность', value: 'Дуальность'},
                        {name: 'Тиски Алчности', value: 'Тиски Алчности'},
                        {name: 'Откровение', value: 'Откровение'},
                        {name: 'Яма Ереси', value: 'Яма Ереси'},
                        {name: 'Расколотый Трон', value: 'Расколотый Трон'}                       
                    ))
            .addStringOption(option => 
                option.setName('время')
                    .setDescription('Время начала похода в подземелье по мск в формате "ЧЧ:ММ"')
                    .setRequired(false))
            .addStringOption(option => 
                option.setName('дата')
                    .setDescription('Дата похода в подземелье в формате "ДД.ММ". Форматы "ДД.ММ.ГГ" и "ДД.ММ.ГГГГ" поддерживаются')
                    .setRequired(false))
            .addStringOption(option =>
                option.setName('требования')
                    .setDescription('Ваши требования к участникам (необязательно)'))
            .addStringOption(option =>
                option.setName('описание')
                    .setDescription('Ваши дополнительные заметки (необязательно)'))
            .addStringOption(option =>
                option.setName('медиа')
                    .setDescription('Ссылка на картинку или гифку для оформления (ТОЛЬКО URL!)'))
            .addStringOption(option =>
                option.setName('сложность')
                    .setDescription('Установка сложности подземелья (по умолчанию обычная)')
                    .addChoices(
                        {name: 'Обычная', value: 'Обычная'},
                        {name: 'Мастер', value: 'Мастер'}
                    ))
            .addUserOption(option =>
                option.setName('бронь1')
                    .setDescription('Забронируйте место для Стража (всего 1 место для брони в подземелье)')))
        .addSubcommand(subcommand =>
            subcommand
            .setName('другое')
            .setDescription('Начинает сбор в любую указанную вами активность. Не используйте для рейдов и подземелий')
            .addStringOption(option => 
                option.setName('название')
                    .setDescription('В какую активность вы хотите собрать людей? Пишите правильнее - это будет в заголовке сбора!')
                    .setRequired(true))
            .addIntegerOption(option => 
                option.setName('количество')
                    .setDescription('Сколько Стражей должно быть в боевой группе? Допустимы значения от 3 до 12')
                    .setRequired(true)
                    .setMaxValue(12)
                    .setMinValue(3))
            .addStringOption(option => 
                option.setName('время')
                    .setDescription('Время начала вашей активности по мск в формате "ЧЧ:ММ"')
                    .setRequired(false))
            .addStringOption(option => 
                option.setName('дата')
                    .setDescription('Дата вашей активности в формате "ДД.ММ". Форматы "ДД.ММ.ГГ" и "ДД.ММ.ГГГГ" поддерживаются')
                    .setRequired(false))
            .addStringOption(option =>
                option.setName('требования')
                    .setDescription('Ваши требования к участникам (необязательно)'))
            .addStringOption(option =>
                option.setName('описание')
                    .setDescription('Ваши дополнительные заметки (необязательно)'))
            .addStringOption(option =>
                option.setName('медиа')
                    .setDescription('Ссылка на картинку или гифку для оформления (ТОЛЬКО URL!)'))),

    async execute(interaction) {
        //получение данных из команды
        let actName = interaction.options.getString('название');
        let quant = interaction.options.getInteger('количество');
        const time = interaction.options.getString('время');
        const date = interaction.options.getString('дата');
        const requiries = interaction.options.getString('требования');     
        const descript = interaction.options.getString('описание');  
        const difficulty = interaction.options.getString('сложность');
        const res1 = interaction.options.getMember('бронь1');   
        const res2 = interaction.options.getMember('бронь2'); 
        const media = interaction.options.getString('медиа'); 
        //установка даты через специальный метод
        const clan = interaction.client.d2clans.get(interaction.guild.id);
        let rDate;
        if (time || date){
            try {
                rDate = interaction.client.d2clans.utility.dateSet(time, date);
            } catch (err) {
                const embed = interaction.client.genEmbed(`Не удалось установить дату: ${err.message}`, 'Ошибка!');
                interaction.reply({embeds: [embed], ephemeral:true});
                return;
            } 
        }
             
        //добавление тэгов ролей, если такие есть
        let strTags = '';
        if (clan.config.rolesToTag || clan.config.rolesToTag.size > 0){
            clan.config.rolesToTag.forEach((val) => {
                strTags += `${val} `;
            });
        }
        //оформление embed
        let bannerUrl, embColor, embDesc = '', actType = '';
        if (interaction.options.getSubcommand() === 'рейд'){
            actType = 'raid';
            quant = 6;
            switch (actName){
                case 'Последнее Желание': bannerUrl = 'https://i.ibb.co/103DBb4/last-wish.jpg';
                    embColor = 0x8675e6;
                    break;
                case 'Сад Спасения': bannerUrl = 'https://i.ibb.co/dfgVs0Q/garden-of-salvation.png';
                    embColor = 0x378a4d;
                    break;
                case 'Склеп Глубокого Камня': bannerUrl = 'https://i.ibb.co/QnYXxRt/deep-stone-crypt.png';
                    embColor = 0x4f9db3;
                    break;
                case 'Клятва Послушника': bannerUrl = 'https://i.ibb.co/6mZTtq1/vow-of-the-disciple.jpg';
                    embColor = 0x2d4527;
                    break;
                case 'Хрустальный Чертог': bannerUrl = 'https://i.ibb.co/nw7ZjjC/vault-of-glass.jpg';
                    embColor = 0x97c9c2;
                    break;
                case 'Гибель Короля': bannerUrl = 'https://i.ibb.co/fHDQL1b/kings-fall.jpg';
                    embColor = 0x83a362;
                    break;
                case 'Источник Кошмаров': bannerUrl = 'https://i.ibb.co/7V0Lk4r/destiny-2-lightfall-raid-0.jpg';
                    embColor = 0xfff8f2;
                    break;
                case 'Крах Кроты': bannerUrl = 'https://i.ibb.co/qM86t9C/Crota-s-End-landing-16x9-png-jpgcopy.jpg';
                    embColor = 0x88e3a0;
                    break;
            }
            //добавление требований и описания, если есть
            if (requiries){
                embDesc += `Рейд!\nТребования: ${requiries}\n`;
            } else {
                embDesc += `Рейд!\n`;
            }
            if (descript){
                embDesc += `\n${descript}\n`;
            } 
        }
        if (interaction.options.getSubcommand() === 'подземелье'){
            actType = 'dungeon';
            quant = 3;
            switch (actName){
                case 'Расколотый Трон': bannerUrl = 'https://i.ibb.co/2MVCV65/shattered-throne.jpg';
                    embColor = 0x626d70;
                    break;
                case 'Яма Ереси': bannerUrl = 'https://i.ibb.co/yYxrmfV/pit-of-heresy.jpg';
                    embColor = 0x7a2c2c;
                    break;
                case 'Откровение': bannerUrl = 'https://i.ibb.co/DCZF3ss/prophecy.jpg';
                    embColor = 0x9e59c9;
                    break;
                case 'Тиски Алчности': bannerUrl = 'https://i.ibb.co/fQwpX8N/grasp-of-avarice.jpg';
                    embColor = 0xc9c14b;
                    break;
                case 'Дуальность': bannerUrl = 'https://i.ibb.co/BVpYCXS/duality.jpg';
                    embColor = 0x8f2d17;
                    break;
                case 'Шпиль Хранителя': bannerUrl = 'https://i.ibb.co/7WvDcvw/spire-of-the-watcher.jpg';
                    embColor = 0xb3974d;
                    break;
                case 'Призраки Глубин': bannerUrl = 'https://i.ibb.co/9NnnQDZ/2023-Ghost-of-the-Deep-Press-Kit-Dungeon-COMPRESSED-011.jpg';
                    embColor = 0x68bee3;
                    break;
                case 'Руины Полководца': bannerUrl = 'https://i.ibb.co/8xPqSdy/warlord-s-ruin.jpg';
                    embColor = 0xdff5f2;
                    break;
            }
            if (requiries){
                embDesc += `Подземелье!\nТребования: ${requiries}\n`;
            } else {
                embDesc += `Подземелье!\n`;
            }
            if (descript){
                embDesc += `\n${descript}\n`;
            }
        }
        if (interaction.options.getSubcommand() === 'другое'){
            bannerUrl = 'https://i.ibb.co/fDV3yJM/year-one-moments-of-triumph.png'; embColor = getRandomColor(); embDesc = ''; //стандартное оформление       
            actType = 'other';
            (() => { //специальное оформление, если есть ключевые слова
                if (actName.match(/источник/i)){
                    bannerUrl = 'https://i.ibb.co/NWQtT50/wellspring.jpg';
                    embColor = 0x60c957;
                    return;
                } else if (actName.match(/железное знамя/i) ){
                    bannerUrl = 'https://i.ibb.co/5G5w8ML/iron-banner.jpg';
                    embColor = 0x9e6b31;
                    return;
                } else if (actName.match(/горнило/i) ){
                    bannerUrl = 'https://i.ibb.co/2tGwSwn/crucible.jpg';
                    embColor = 0xd93030;
                    return;
                } else if (actName.match(/гамбит/i) ){
                    bannerUrl = 'https://i.ibb.co/Q9gkvL8/gambit.jpg';
                    embColor = 0x32850f;
                    return;
                }  else if (actName.match(/налет/i) || actName.match(/налёт/i) || actName.match(/сумра/i)){
                    bannerUrl = 'https://i.ibb.co/NmbVX7x/vanguard.png';
                    embColor = 0x38468f;
                    return;
                } else if (actName.match(/осирис/i)){
                    bannerUrl = 'https://i.ibb.co/9vn67RV/trials-of-osiris.jpg';
                    embColor = 0xdec943;
                    return;
                } else if (actName.match(/кампан/i) || actName.match(/100к мисси/i) || actName.match(/сплав/i)){
                    bannerUrl = 'https://i.ibb.co/HKVW2r4/lightfall-campaign.jpg';
                    embColor = 0x4fe0a4;
                    return;
                } else if (actName.match(/вечност/i)){
                    bannerUrl = 'https://i.ibb.co/vHFWq2D/Dares-of-Eternity-Xur.jpg';
                    embColor = 0x4f90e0;
                    return;
                } else if (actName.match(/экзот/i)){
                    bannerUrl = 'https://i.ibb.co/2PrkMBJ/destiny-2-exotic-engram.jpg';
                    embColor = 0xf0f573;
                    return;
                } else if (actName.match(/ГМ/) || actName.match(/грандмастер/i)){
                    bannerUrl = 'https://i.ibb.co/SKRg5pB/EYZZg-R1-Uc-AEX3-Np.jpg';
                    embColor = 0xf0f2ae;
                    return;
                } else if (actName.match(/рыба/i)){
                    bannerUrl = 'https://i.ibb.co/zxLXL31/2023-Season-of-the-Deep-Press-Kit-Deep-Dive-Fishing-Compressed-006.jpg';
                    embColor = 0xb2de99;
                    return;
                }
            })();
            if (requiries){
                if (quant < 5){
                    embDesc += `Сбор! Нужно *${quant}* Стража.\nТребования: ${requiries}\n`;
                } else {
                    embDesc += `Сбор! Нужно *${quant}* Стражей.\nТребования: ${requiries}\n`;
                }
            } else {
                if (quant < 5){
                    embDesc += `Сбор! Нужно *${quant}* Стража.\n`;
                } else {
                    embDesc += `Сбор! Нужно *${quant}* Стражей.\n`;
                }
            }
            if (descript){
                embDesc += `\n${descript}\n`;
            }
        }    
        //формирование embed
        const id = interaction.client.d2clans.utility.generateId(clan.activities.cache);
        if (difficulty == 'Мастер'){
            actName = `Мастер ${actName}`;
        }       
        //отправка сообщения
        let fireDate;
        if (rDate){
            fireDate = rDate;
        } else {
            fireDate = 'По готовности';
        }
        const activity = new Activity({id: id, clan: clan, name: actName, date: fireDate, quant: quant, leader: interaction.member, bron1: res1, bron2: res2}); 
        try{
            const embed = activity.createEmbed(embColor, embDesc, bannerUrl, media);
            const row = activity.createActionRow();
            const mess1 = await interaction.channel.send({content: strTags, embeds: [embed], components: [row]});
            mess1.customId = id;
            activity.message = mess1;   
        } catch (err){
            if (activity.message){
                await activity.message.delete().catch();
            }     
            const embed = interaction.client.genEmbed(`Ошибка при создании сбора: ${err.message}`, 'Ошибка!');
            interaction.reply({embeds: [embed], ephemeral:true});
            return;
        }         
        //формирование внутренней структуры данных       
        clan.activities.set(activity);
        interaction.client.emit(ActivityEvents.Created, activity);
        //уведомление, если всё прошло успешно
        const embed = interaction.client.genEmbed(`Сбор ${actName} создан`, 'Успех!');
        interaction.reply({embeds: [embed], ephemeral:true});
    }
}