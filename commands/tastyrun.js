function getAllIndexes(string, text) {
    const indexes = [];

    while (1) {
        const index = string.indexOf(
            text,
            indexes[0] == null ? 0 : indexes[indexes.length - 1] + 1
        );
        if (index === -1) break;
        indexes.push(index);
    }

    return indexes;
}

export default function tastyrun(msg, manageCommands) {
    console.log(msg.content);

    let variables = [
        {
            name: 'null',
            value: null,
        },
    ];

    // let rows = msg.content.split('\r\n|\r|\n').length;

    msg.content.split('\n').forEach((row) => {
        const splitRow = row.split(' ');

        //making a var
        if (splitRow[0] === 'make') {
            const varName = splitRow[1];
            const varValue = row.substring(row.indexOf('=') + 2);

            variables.push({
                name: varName,
                value: varValue,
            });
        }

        //running functions
        if (row.includes('(') && row.includes(')')) {
            //the function in query format
            let command = [];

            //adding function name to query
            command.push(row.substring(0, row.indexOf('(')));

            console.log(variables);

            //adding params to query
            row.substring(row.indexOf('(') + 1, row.indexOf(')'))
                .split(',')
                .forEach((param) => {
                    //getting rid of extra spaces
                    if (param.substring(param.length - 1) === ' ')
                        param = param.substring(0, param.length - 1);
                    if (param.substring(0, 1) === ' ')
                        param = param.substring(1);

                    //logging param without vars
                    console.log(param);

                    //checking for variables
                    if (param.includes('<') && param.includes('>')) {
                        //function for checking how many variables are in the param
                        function countOccurences(string, word) {
                            return string.split(word).length - 1;
                        }

                        const varAmount = countOccurences(param, '<');
                        const openvars = getAllIndexes(param, '<');
                        const closevars = getAllIndexes(param, '>');

                        console.log(openvars);
                        console.log(closevars);

                        //getting all of the variables
                        for (let i = 0; i < varAmount; i++) {
                            const foundVariable = param.substring(
                                openvars[i] + i,
                                closevars[i] + i + 1
                            );

                            const foundVariableName = foundVariable
                                .replace('<', '')
                                .replace('>', '');

                            variables.forEach((variable) => {
                                if (variable.name === foundVariableName) {
                                    param = param.replace(
                                        foundVariable,
                                        variable.value
                                    );
                                }
                            });
                        }
                    }

                    //adding param to command
                    command.push(param);
                });

            msg.content = '';
            command.forEach((element) => {
                msg.content = `${msg.content} ${element}`;
            });

            const query = command;

            let word = msg.content.includes(' ')
                ? query[0]
                : msg.content.substr(prefixLength, msg.content.length);

            manageCommands(word, query);
        }
    });
}
