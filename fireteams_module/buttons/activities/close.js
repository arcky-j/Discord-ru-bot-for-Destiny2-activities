const {ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require('discord.js');

module.exports = {
    async execute(interaction, activity, user){
        const modal = new ModalBuilder()
        .setCustomId(`reason_close_${activity.id}`)
        .setTitle('Отмена активности');

        const reasonT = new TextInputBuilder()
        .setCustomId('reason')
        .setLabel('Причина отмены')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Если хотите, укажите причину (отправить форму обязательно даже пустой)')
        .setRequired(false);

        const actionRow0 = new ActionRowBuilder().addComponents(reasonT);
        modal.addComponents(actionRow0);

        await interaction.showModal(modal);
        const filter = (interactionM) => interactionM.customId === `reason_close_${activity.id}`;
        const modalInt = await interaction.awaitModalSubmit({filter, time: 300000})
        .catch(err => {
            console.log(err.message);
            // const embed = interaction.client.genEmbed(`Форма для действия со сбором ${activity} не была отправлена\n${err.message}`, 'Ошибка!');
            // interaction.reply({embeds: [embed]});
        });
        if (!modalInt){
            const row = activity.createActionRow();
            interaction.message.edit({components: [row]}); 
            return;
        }
        const reason = modalInt.fields.getTextInputValue('reason');
        activity.cancel();
        //удаление сообщения
        if (reason) {
            const embed = interaction.client.genEmbed(`Сбор ${activity} успешно отменён!\nПричина: ${reason}`, 'Успех!');
            modalInt.reply({embeds: [embed]});
        } else {
            const embed = interaction.client.genEmbed(`Сбор ${activity} успешно отменён!`, 'Успех!');
            modalInt.reply({embeds: [embed]});
        }  
        //запись уведомления в логи
        const logMess = await modalInt.fetchReply();
        setTimeout(() => {
            logMess.delete().catch(async err => {
                console.log('Ошибка удаления сообщения лога удаления сбора (каво?): ' + err.message);
            });
        }, 86400000);
    }
}