// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

    let activeEditor = vscode.window.activeTextEditor;
    
    function GetList()
    {
        if (!activeEditor) 
        {
            vscode.window.showInformationMessage('No active editor');
			return;
        }

        const matches = [];    
		const text = activeEditor.document.getText();
        const regEx =  /\b.\S+\(.*\)/g;
        // [^intvoidcharlongfunctionprivepublicdoublefloatdef_t\s]\s\b\S.\S+\(.*\)
        text.split('\n').forEach((line, num) => {
            [...line.matchAll(regEx)].forEach(match =>
                {
                    matches.push({line: num, result: match});                    
                });
        });

        return matches;
    }
        /* 
        vscode.window.showTextDocument(document, {
            viewColumn: vscode.ViewColumn.Beside
        }); */

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('list-function-calls.GetList', function () {
		// The code you place here will be executed every time your command is executed
    const outputChannel = vscode.window.createOutputChannel("List-Function-Calls");
    GetList().forEach(element => {       
        outputChannel.appendLine(`-line ${element.line}: ${element.result}`);
    });
    outputChannel.show();
    console.log(GetList()[0])
    /* 
    outputChannel.sendText(GetList().join("\n")); 
    outputChannel.show();
	 */	// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from List Function Calls!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
