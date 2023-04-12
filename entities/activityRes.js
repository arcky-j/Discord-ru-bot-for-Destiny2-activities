const ActivityDate = require("./activityDate");

module.exports = class ActivityRes extends ActivityDate{
    reservs = new Map();

    constructor(id, mess, name, quant, leader, date, br1, br2){
        super(id, mess, name, quant, leader, date, br1, br2);
    }

    add(user){      
        super.add(user);
        if (this.reservs.has(user.id)){
            this.reservs.delete(user.id);
            this.refreshMessage();
        }      
    }

    moveReserv(user){
        if (this.reservs.has(user.id)){ //проверка на запись в резерв
            this.reservs.delete(user.id);
        } else {
            if (user.id == this.leaderId){ //проверка на лидерство
                throw new Error('Лидер не может записаться в резерв!'); 
            }
            
            this.reservs.set(user.id, user); //запись в резерв

            if (this.members.has(user.id)){ //удаление из боевой группы, если нужно
                this.members.delete(user.id);
            }
        }
        this.refreshMessage();
    }

    refreshMessage(){
        this.refreshReservs();
        super.refreshMessage();
    }
    updateMessage(){
        this.refreshReservs();
        super.updateMessage();
    }
    refreshReservs(){
        const embed = this.message.embeds[0];
        embed.fields[4].value = this.getReservsString();
    }
    sendAlerts(reason){
        switch(reason){
            case 'uptime': //рассылка при скором начале активности
                if (this.reservs.size > 0 && this.members.size < this.quantity)
                this.reservs.forEach( async (us, id) =>{ //если есть резервы и боевой группы не хватает, оповещает резервистов
                    try{
                        us.send({content:`${this.name} начнётся в ближайшие **10 минут**! Вы были записаны в резерв и получаете это сообщение, потому что боевая группа меньше необходимого!`, embeds: this.message.embeds});
                    } catch (err){
                        console.log(`Ошибка рассылки для пользователя ${us.tag}: ${err.message}`)
                    }
                });
                //super.sendAlerts(reason);
            default: super.sendAlerts(reason);
        }
    }
    getReservsString(){
        let str = '';
        if (!this.reservs) return;
        if (this.reservs.size == 0){
            return '...';
        }
        this.reservs.forEach(function(value1, value2){
            str += `<@${value2}>\n`;
        });
        return str; //возвращает строку со всеми резервистами в столбик
    }
}