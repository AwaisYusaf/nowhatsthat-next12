
export const removeQuestionMark = (line: string) => {
    if (line[line.length - 1] == '?') {
        let newLine = '';
        for (let i = 0; i < line.length - 1; i++) {
            newLine += line[i]
        }
        return newLine;
    }
    return line;
}