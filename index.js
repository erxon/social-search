

const { NlpManager } = require("node-nlp");

const manager = new NlpManager({ languages: ["en"] });
manager.load();

var readline = require("readline");
var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt("> ");
rl.prompt();

rl.on("line", async function (line){
    const response = await manager.process("en", line);
    rl.prompt();
}).on("close", function (){
    process.exit(0);
});