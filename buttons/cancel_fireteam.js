//код для кнопки отмены записи в боевую группу
module.exports = {
    name: 'cancel_fireteam',
    async execute(interaction){
        const embed = interaction.message.embeds[0];
        const user = interaction.user;
        //поиск нужной боевой группы
        const fireteam = interaction.client.fireteams.get(interaction.message.id);
        if (!fireteam){
            await interaction.reply({content: `Скорее всего, активность уже стартовала. Возможно, произошла непредвиденная ошибка`, ephemeral: true});
            return;
        }
        //попытка удаления Стража
        try {
            fireteam.memberDel(user.id);
        } catch (err) {
            await interaction.reply({content: err.message, ephemeral: true});
            return;
        }        
        //обновление сообщения сбора
        embed.fields[1].value = fireteam.getMembersString();
        embed.fields[2].value = fireteam.getReservsString();
        fireteam.setEmbed(embed);
        await interaction.update({embeds: [embed]});
    }
}