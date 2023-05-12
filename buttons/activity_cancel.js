//код для кнопки отмены записи в боевую группу
module.exports = {
    name: 'activity_cancel',
    async execute(interaction){
        const user = interaction.user;
        //поиск нужной боевой группы
        const activity = interaction.client.activities.get(interaction.message.customId);
        if (!activity || activity.state == 'Закрыт'){
            const embed = interaction.client.genEmbed(`Скорее всего, активность уже стартовала. Возможно, произошла непредвиденная ошибка`, 'Ошибка!');
            interaction.reply({embeds: [embed], ephemeral:true});
            return;
        }
        //попытка удаления Стража
        try {
            const embed = activity.removeUpdate(user.id);
            interaction.update({embeds: [embed]});
        } catch (err) {
            const embed = interaction.client.genEmbed(`${err.message}`, 'Ошибка!');
            interaction.reply({embeds: [embed], ephemeral:true});
        }
    }
}