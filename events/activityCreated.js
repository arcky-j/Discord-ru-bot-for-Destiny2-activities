const {ActivityEvents, Guardian} = require('../fireteams_module');
//срабатывает при вступлении пользователя на сервер
module.exports = {
    name: ActivityEvents.Created,
    async execute(fireteam) {
        const clan = fireteam.client.d2clans.get(fireteam.guildId);
        if (clan.guardians.cache.has(fireteam.leader.id)){
            const guardian = clan.guardians.get(fireteam.leader.id);
            guardian.leadCountInc();
            clan.guardians.save(guardian);
        } else {
            const guardian = new Guardian(fireteam.leader, 1, 1);
            clan.guardians.set(guardian);
        }
    },
};