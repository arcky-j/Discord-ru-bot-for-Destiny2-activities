//код для кнопки записи в боевую группу
module.exports = {
    name: 'go_activity',
    async execute(interaction){    
        const user = interaction.user;
        //поиск нужной боевой группы
        const activity = interaction.client.activities.get(interaction.message.customId);
        if (!activity){
            await interaction.reply({content: `Скорее всего, активность уже стартовала. Возможно, произошла непредвиденная ошибка`, ephemeral: true});
            return;
        }
        //попытка записи Стража
        try{
            activity.add(user);
        } catch (err){
            await interaction.reply({content: err.message, ephemeral: true});
            return;
        }     
        interaction.update({embeds: activity.message.embeds});

    }
}