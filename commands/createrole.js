export default function createRole(msg, query) {
    try {
        const name =
            query[1] == null || query[1] === 'null' ? 'New Role' : query[1];
        const color =
            query[2] == null || query[2] === 'null' ? '#ABACAF' : query[2];
        let permissions =
            query[3] == null || query[3] === 'null'
                ? null
                : query[3]
                      .substr(1, query[3].length - 2)
                      .replace(/'/g, '')
                      .split(',');

        msg.guild.roles
            .create({
                data: {
                    name: name,
                    color: color,
                    permissions: permissions
                }
            })
            .then((role) => {
                msg.member.roles.add(role);
            });
    } catch (err) {
        console.log(err);
    }
}
