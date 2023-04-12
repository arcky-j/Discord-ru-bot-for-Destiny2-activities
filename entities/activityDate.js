const ActivityBron = require("./activityBron");

module.exports = class ActivityDate extends ActivityBron{
    date = new Date();
    today;
    timer;
    interval;
    tenMinutes = 600000;

    constructor(id, mess, name, quant, leader, date, br1, br2){
        super(id, mess, name, quant, leader, br1, br2);
        this.today = new Date();
        this.date = date;
        this.setTimer();
    }

    //смена даты
    changeDate(newDate){
        this.date = newDate; //установка даты    
        this.sendAlerts('dateChange'); 
        clearTimeout(this.timer);
        this.setTimer();
        this.refreshMessage();
    }
    setTimer(){        
        const t = this.date - this.today - this.tenMinutes; 
        if (this.t > 2147483647){
            this.interval = setInterval(() => {
                if (this.t < 2147483647){
                    this.setTimer();
                    clearInterval(this.interval);
                }
            }, this.day * 20);
            return;
        } 
        this.timer = setTimeout(() => {
            if (this.date - this.today > this.tenMinutes)
            this.sendAlerts('uptime');
            setTimeout(() => {
                try{
                    this.state = this.states.get(0);
                    this.refreshMessage();
                } catch (err){
                    console.log('Ошибка таймера: ' + err.message)
                }
            }, this.tenMinutes);
        }, t);          
    }
    //вспомогательный метод для создания строки с датой-временем
    getDateString(){
        //получает отдельные части даты
        const h = this.date.getHours();
        const m = this.date.getMinutes();

        const day = this.date.getDate();
        const mon = this.date.getMonth() + 1;
        const year = this.date.getFullYear();
        //если число однозначное, добавляет 0 в начале
        let hT = h, mT = m, dayT = day, monT = mon;
        if (h<10) hT = `0${h}`;
        if (m<10) mT = `0${m}`;
        if (day<10) dayT = `0${day}`;
        if (mon<10) monT = `0${mon}`;

        return `**${hT}:${mT}** МСК **${dayT}.${monT}.${year}**`; //возвращает строку со временем в предпочитаемом формате
    }
    sendAlerts(reason){
        switch(reason){
            case 'uptime': //рассылка при скором начале активности
                this.members.forEach( async (us, id) =>{ //оповещает всех участников
                    try{
                        us.send({content: `${this.name} начнётся в ближайшие **10 минут**!\n`, embeds: this.message.embeds});
                    } catch (err){
                        console.log(`Ошибка рассылки для пользователя ${us.tag}: ${err.message}`)
                    }
                });
                if (this.bron.size > 0 && this.members.size < this.quantity)
                this.bron.forEach( async (us, id) =>{ //если есть резервы и боевой группы не хватает, оповещает резервистов
                    try{
                        us.send({content:`${this.name} начнётся в ближайшие **10 минут**! Вам было забронировано место, поэтому вы получаете это сообщение!`, embeds: this.message.embeds});
                    } catch (err){
                        console.log(`Ошибка рассылки для пользователя ${us.tag}: ${err.message}`)
                    }
                });
                break;
            case 'dateChange': //рассылка при переносе активности
                this.members.forEach( async (us, id) =>{
                    if (this.leaderId != id) //рассылает оповещение всем участникам кроме лидера
                    try{
                        us.send({content: `Активность ${this.name}, в которую вы записаны, перенесёна пользователем ${this.getLeader().tag}! Новое время: ${this.getDateString()}`, embeds: this.message.embeds});
                    } catch (err){
                        console.log(`Ошибка рассылки для пользователя ${us.tag}: ${err.message}`)
                    }
                });
                break;
            default: super.sendAlerts(reason);
        }
    }
    async delete(){
        clearInterval(this.interval);
        clearTimeout(this.timer);
        super.delete();
    }
    refreshMessage(){
        this.refreshDate();
        super.refreshMessage();
    }
    updateMessage(){
        this.refreshDate();
        super.updateMessage();
    }
    refreshDate(){
        const embed = this.message.embeds[0];
        embed.fields[0].value = this.getDateString();
    }
}