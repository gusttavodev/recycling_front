const formatErrors = (errors) => {
    let responseErrors = "{"
    responseErrors += Object.entries(errors)
        .map((element) => {
            return `"${element[0]}": "${element[1][0]}"`
        }).join(',')

    return JSON.parse(responseErrors+"}")
}

export default {
    formatErrors
}