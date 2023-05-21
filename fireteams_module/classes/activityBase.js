const Base = require("./base");
const ActivityEvents = require('../consts/activityEvents');

module.exports = class ActivityBase extends Base{
    id;
    message;
    name;
    quantity;
    leader;
    guildId;
    members = new Map();
    state;
    delTimer;
    day = 86400000;

    states = {
        0: 'Закрыт',
        1: 'Открыт',
        2: 'Заполнен'
    }

    constructor(id, guildId, name, quant, leader){
        super();
        this.id = id;
        this.name = name;
        this.quantity = quant;
        this.leader = leader;
        this.guildId = guildId;
        this.state = this.states[1];
    }

    add(user){
        if (this.members.has(user.id)){ //проверка на присутствие в боевой группе
            const err = new Error('Пользователь уже записан!');
            this.client.emit(ActivityEvents.Error, this, err);
            throw err; 
        } 
        if (this.state == this.states[2]){ //проверка на количество стражей
            throw new Error('Сбор уже укомплектован!');
        }
        if (user.bot){ //проверка на случай, если кто-то насильно догадается записать в сбор бота
            throw new Error('Возмутительно! Я не думал, что кому-то придёт в голову совать в сбор бота, но и к этому я был готов');
        }

        this.members.set(user.id, user);
        //this.checkQuantity();
        this.refreshMessage();
        this.client.emit(ActivityEvents.MemberAdd, this, user);
    }

    remove(id){
        if (!this.members.has(id)){ //проверка на отсутствие в боевой группе
            throw new Error('Пользователь не был записан в эту боевую группу! Не в моих силах его из неё убрать'); 
        } 
        
        this.members.delete(id); //удаление из боевой группы
        //this.checkQuantity();
        this.refreshMessage();
        this.client.emit(ActivityEvents.MemberRemove, this, id);
    }

    changeLeader(user){
        if (user.id == this.leader.id){ //проверка на случай попытки сменить себя на себя
            throw new Error('Лидер пытается сменить себя на себя! чзх? я не буду это комментировать...');
        }

        if (user.bot){ //на всякий случай проверка, пытаются ли сделать лидером бота
            throw new Error('Возмутительно! Я не думал, что кому-то придёт назначать лидером бота, но и к этому я был готов');
        }
       
        this.leader = user; 
        this.refreshMessage();
        this.client.emit(ActivityEvents.ChangedLeader, this, user);
    }

    checkQuantity(){
        if (this.state == this.states[0]){
            return;
        }
        if (this.members.size == this.quantity){
            this.state = this.states[2];
        } else {
            this.state = this.states[1];
        }
    }

    //рассылка оповещений в личные сообщения
    async sendAlerts(reason){
        switch(reason){
            case 'del': //рассылка при удалении активности
                if (!this.message){
                    break;
                }
                this.members.forEach( async (us, id) =>{
                    if (this.leader.id != id) {
                        const embed = ActivityBase.client.genEmbed(`Активность «${this}» была отменёна пользователем ${this.leader}.`, 'Уведомление');
                        us.send({embeds:[embed, this.message.embeds[0]]})
                        .catch(async err =>{
                            console.log(`Ошибка рассылки для пользователя ${us.tag}: ${err.message}`);
                            if (this.guildId){
                                const sett = ActivityBase.client.settings.get(this.guildId);
                                sett.sendLog(`Ошибка рассылки (удаление сбора ${this}) для пользователя ${us}: ${err.message}`, 'Запись логов: ошибка');
                            }
                        });
                    } //рассылает оповещение всем участникам кроме лидера                   
                });
                break;
            case 'admin_del': //рассылка при удалении активности администратором
                if (!this.message){
                    break;
                }
                this.members.forEach( async (us, id) =>{
                    const embed = ActivityBase.client.genEmbed(`Активность «${this}» была отменёна администратором. Более подробная информация в канале сбора.`, 'Уведомление');
                    us.send({embeds:[embed, this.message.embeds[0]]})
                    .catch(async err =>{
                        console.log(`Ошибка рассылки для пользователя ${us.tag}: ${err.message}`);
                        if (this.guildId){
                            const sett = ActivityBase.client.settings.get(this.guildId);
                            sett.sendLog(`Ошибка рассылки (админское удаление сбора ${this}) для пользователя ${us}: ${err.message}`, 'Запись логов: ошибка');
                        }
                    }); 
                });
                break;
            case 'start': //рассылка при скором начале активности
                if (!this.message){
                    break;
                }               
                this.members.forEach(async (us, id) =>{ //если есть резервы и боевой группы не хватает, оповещает резервистов
                    if (id != this.leader.id){
                        const embed = ActivityBase.client.genEmbed(`Активность «${this}» начата лидером (${this.leader}) активности!`, 'Уведомление');
                        us.send({embeds:[embed, this.message.embeds[0]]})
                        .catch(async err =>{
                            console.log(`Ошибка рассылки для пользователя ${us.tag}: ${err.message}`);
                            if (this.guildId){
                                const sett = ActivityBase.client.settings.get(this.guildId);
                                sett.sendLog(`Ошибка рассылки (старт сбора ${this}) для пользователя ${us}: ${err.message}`, 'Запись логов: ошибка');
                            }
                        }); 
                    }                 
                });
        }
    }

    async refreshMessage(){
        this.checkQuantity();      
        const embed = this.message.embeds[0];
        embed.fields[1].value = this.state;
        if (this.state == 'Закрыт'){
            this.client.emit(ActivityEvents.Closed, this);
            if (this.delTimer){
                return;
            }
            this.delTimer = setTimeout(() => {
                this.message.delete().catch(async err =>{
                    console.log(`Ошибка автоматического удаления сообщения сбора ${this}: ${err.message}`);
                    if (this.guildId){
                        const sett = ActivityBase.client.settings.get(this.guildId);
                        sett.sendLog(`Ошибка автоматического удаления сообщения сбора ${this}: ${err.message}`, 'Запись логов: ошибка');
                    }
                });    
            }, this.day);
            this.message.edit({content: '', embeds: [embed], components: []}).catch(async err =>{
                console.log(`Ошибка закрытия сбора ${this}: ${err.message}`);
                if (this.guildId){
                    const sett = ActivityBase.client.settings.get(this.guildId);
                    sett.sendLog(`Ошибка закрытия сбора ${this}: ${err.message}`, 'Запись логов: ошибка');
                }
            });          
            return;
        }
        embed.fields[2].value = `${this.leader}`;
        embed.fields[3].value = this.getMembersString();
        this.message.edit({embeds: [embed]}).catch(async err =>{
            console.log(`Ошибка изменения сбора ${this}: ${err.message}`);
            if (this.guildId){
                const sett = ActivityBase.client.settings.get(this.guildId);
                sett.sendLog(`Ошибка изменения сбора ${this}: ${err.message}`, 'Запись логов: ошибка');
            }
        });
        this.client.emit(ActivityEvents.MessageRefreshed, this);
    }

    async delete(){
        clearTimeout(this.delTimer);
        this.message = undefined;
        this.client.emit(ActivityEvents.Deleted, this);
    }

    //вспомогательный метод для создания строки с участниками боевой группы
    getMembersString(){
        let str = '';
        this.members.forEach(function(value1, value2, mp){
            str += `${value1}\n`;
        });
        return str; //возвращает строку со всеми участниками боевой группы в столбик
    }

    start(){
        this.state = this.states[0];
        this.sendAlerts('start');
        this.refreshMessage();
        this.client.emit(ActivityEvents.Started, this);
    }

    toString(){
        return `${this.name} (ID: ${this.id})`;
    }
}