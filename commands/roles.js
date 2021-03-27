function createRole(msg, query) {
    try {
        let name =
            query[1] == null || query[1] === 'null' ? 'New Role' : query[1];
        const color =
            query[2] == null || query[2] === 'null' ? '#ABACAF' : query[2];
        let permissions =
            query[3] == null || query[3] === 'null'
                ? null
                : query[3]
                      .substr(1, query[3].length - 2)
                      .replace(/'/g, '')
                      .toUpperCase()
                      .split(',');

        let doNotRespond = false;

        for (let i = 0; i < query.length; i++) {
            if (query[i] === '-r') {
                msg.content =
                    msg.content.substr(0, msg.content.indexOf('-')) +
                    msg.content.substr(msg.content.indexOf('-') + 2);

                query.splice(i, 1);
                doNotRespond = true;
            }
        }

        msg.guild.roles
            .create({
                data: {
                    name: name,
                    color: color,
                    permissions: permissions,
                },
            })
            .then((role) => {
                msg.member.roles.add(role);
                if (!doNotRespond) {
                    msg.channel.send(
                        `:white_check_mark: **Done!**, created \`${name}\` role!`
                    );
                }
            });
    } catch (err) {
        console.log(err);
    }
}

function deleteRole(msg, query) {
    const role = query[1];

    msg.guild.roles.find((role) => role.name === role).delete();
}

function addRole(msg, query, client) {
    const user = client.users.cache.find(
        (user) => user.id === query[2].substring('3', query[2].length - 1)
    );
    const role = msg.guild.roles.cache.find((r) => r.name === query[1]);

    console.log(user);
}

export { createRole, deleteRole, addRole };
