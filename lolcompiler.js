function interprete(lolcode) {
    const lines = lolcode.trim().split("\n");
    if (lines[0] != "HAI")
        throw "YU DIDN HAI MI :-<";
    if (lines[lines.length - 1] != "KTHXBYE")
        throw "YU DIDN THX MI :-<";
    let i = 0;
    const js = [];
    let line;
    let ignore = false;
    let tagStack = [];
    for (let lineX of lines) {
        line = lineX.trim();
        if (line.endsWith("TLDR")) {
            ignore = false; continue;
        }
        if (line.startsWith("OBTW")) ignore = true;
        if (line.startsWith("BTW")) continue;
        if (ignore) continue;
        let splitted = line.split(' ');
        let last = splitted.length - 1;
        let operator;
        let tester;
        if (line.length == 0) {
            i++; continue;
        }
        switch (true) { // Sprawdzam regexy
            case /^HAI$/.test(line): break;
            case /^KTHXBYE$/.test(line): break;
            case /^VISIBLE (([a-zA-Z_$][\w$]+?[\(\)]?)|("(.+?)")(\.([a-zA-Z_$][\w$]+?\((([a-zA-Z_$][\w$]+?)|(\d+\.?\d*)|("(.*?)"))\)))?)$/.test(line):
            //case /^VISIBLE (([\w$]+?)|("(.*?)"))$/.test(line):
                js.push(`console.log(${splitted.slice(1, splitted.length).join(" ")});`);
                break;
            case /^SCRIM (([a-zA-Z_$][\w$]+?)|("(.+?)"))$/.test(line):
                js.push(`alert(${splitted[1]});`);
                break;
            case /^I HAS A [a-zA-Z_$][\w$]+$/.test(line):
                js.push(`let ${splitted[last]};`);
                break;
            case /^LOL [a-zA-Z_$][\w$\[\]]+? R ((\d+\.?\d*)|("(.+?)"))$/.test(line):
                js.push(`${splitted[1]} = ${splitted.slice(3, splitted.length).join(" ")};`);
                break;
            case /^NOT TACHIN MY [a-zA-Z_$][\w$]+ OF (([a-zA-Z_$][\w$]+?)|(\d+\.?\d*)|("(.*?)"))/.test(line):
                js.push(`const ${splitted[3]} = ${splitted[last]};`);
                break;
            case /^UR [a-zA-Z_$][\w$]+? IZ FUL OF ((([a-zA-Z_$][\w$]+?)|(\d+\.?\d*)|("(.*?)"))(, )?)+/.test(line):
                js.push(`const ${splitted[1]} = [${splitted.slice(5, splitted.length).join(" ")}];`);
                break;
            case /^[a-zA-Z_$][\w$]+? MUST (ALSO )?HAS (([a-zA-Z_$][\w$]+?)|("(.*?)"))/.test(line):
                tester = splitted[2] == "ALSO";
                js.push(`document.getElementById("${splitted[0]}").innerHTML ${tester ? "+" : ""}= ${splitted.slice(tester ? 4 : 3, splitted.length).join(" ")};`);
                break;
            case /^MEIK [a-zA-Z_$][\w$-]+? OF [a-zA-Z_$-][\w$]+? LIEK (([a-zA-Z_$-][\w$]+?)|("(.*?)"))/.test(line):
                js.push(`document.getElementById("${splitted[3]}").${splitted[1]} = ${splitted.slice(5, splitted.length).join(" ")};`);
                break;
            case /^DRAW [a-zA-Z_$][\w$-]+? OF [a-zA-Z_$-][\w$]+? LIEK (([a-zA-Z_$-][\w$]+?)|("(.*?)"))/.test(line):
                js.push(`document.getElementById("${splitted[3]}").style.${splitted[1]} = ${splitted.slice(5, splitted.length).join(" ")};`);
                break;
            case /^INVISIBLE [a-zA-Z_$][\w$\[\]]+$/.test(line):
                js.push(`throw ${splitted[last]};`);
                break;
            case /^IM IN YR [a-zA-Z_$][\w$]+? ((WILE)|(TIL)) (([a-zA-Z_$][\w$]+?)|(\d+\.?\d*)|("(.*?)")) ((LIEK)|(BIGR THAN)|(SMOLR THAN)) (([a-zA-Z_$][\w$]+?)|(\d+\.?\d*)|("(.*?)"))$/.test(line):
                tagStack.push(splitted[3]);
                switch (splitted[6]) {
                    case "LIEK": operator = "=="; break;
                    case "BIGR": operator = ">"; break;
                    case "SMOLR": operator = "<"; break;
                    default: throw "LOOPIN ERROR";
                }
                js.push(`while (${splitted[4]=="WILE" ? "" : "!"}(${splitted[5]} ${operator} ${splitted[last]})) {`);
                break;
            case /^IM IN YR [a-zA-Z_$][\w$]+? ((UPPIN)|(NERFIN)) YR [a-zA-Z_$][\w$]+? FROM (([a-zA-Z_$][\w$]+?)|(\d+\.?\d*)|("(.*?)")) BAI (([a-zA-Z_$][\w$]+?)|(\d+\.?\d*)|("(.+?)"))$/.test(line):
                tagStack.push(splitted[3]);
                js.push(`for (let ${splitted[6]} = ${splitted[8]}; true; ${splitted[6]} ${splitted[4]=="UPPIN" ? "+=" : "-="} ${splitted[last]}) {`);
                break;
            case /^IM IN YR [a-zA-Z_$][\w$]+? WATCHIN YR [a-zA-Z_$][\w$]+? ((OF)|(IN)) [a-zA-Z_$][\w$]+?$/.test(line):
                tagStack.push(splitted[3]);
                js.push(`for (let ${splitted[6]} ${splitted[7]=="OF" ? "of" : "in"} ${splitted[last]}) {`);
                break;
            case /^IM OUTTA YR [a-zA-Z_$][\w$]+$/.test(line):
                if (tagStack.pop() != splitted[3]) throw `WRONG NEIM USED IN LAIN ${i}: ${splitted[3]}`;
                js.push("}");
                break;
            case /^GTFO$/.test(line):
                js.push(`break;`);
                break;
            case /^NAH NEXT$/.test(line):
                js.push(`continue;`);
                break;
            case /^IZ (([a-zA-Z_$][\w$]+?)|(\d+\.?\d*)|("(.*?)")) (NOT )?((LIEK)|(BIGR THAN)|(SMOLR THAN)) (([a-zA-Z_$][\w$]+?)|(\d+\.?\d*)|("(.*?)"))$/.test(line):
                tester = splitted[2] == "NOT";
                switch (splitted[2 + (tester ? 1 : 0)]) {
                    case "LIEK": operator = "=="; break;
                    case "BIGR": operator = ">"; break;
                    case "SMOLR": operator = "<"; break;
                    default: throw "IZ THIS ERROR?";
                }
                js.push(`if (${tester ? "!" : ""} (${splitted[1]} ${operator} ${splitted[last]})) {`);
                break;
            case /^YARLY$/.test(line): break;
            case /^NOWAI$/.test(line):
                js.push(`} else {`);
                break;
            case /^KTHX$/.test(line):
                js.push(`}`);
                break;
            default:
                throw `IDK WOT U MEEN IN LAIN ${i}: ${line}`;
        }
        i++;
    }
    return js;
}

function runlol() {
    let lolcode = document.getElementById("code").value;
    try {
        const jsArray = interprete(lolcode);
        document.getElementById("logarea").style.backgroundColor = "LimeGreen";
        document.getElementById("logtext").style.color = "black";
        document.getElementById("logtext").innerHTML = "YEY, I WORK!";
        let jsCode = jsArray.join(" ")
        console.log('--- Compiled to: ---');
        console.log(jsCode);
        console.log("--------------------\n");
        eval(jsCode);
    } catch (err) {
        document.getElementById("logarea").style.backgroundColor = "red";
        document.getElementById("logtext").style.color = "white";
        document.getElementById("logtext").innerHTML = err;
        throw err;
    }
}