// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.workspace.onDidOpenTextDocument(async (document: vscode.TextDocument) => {
        // Check if the file matches our criteria
        if (isSecretFile(document.fileName)) {
            // Close the file
            await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
            // Show the prompt and handle user response
            await handlePrompt(document.fileName);
        }
    });

    context.subscriptions.push(disposable);
}

function isSecretFile(fileName: string): boolean {
    // Simple check: You can make this more sophisticated
    return fileName.endsWith('.secret');
}

async function handlePrompt(fileName: string) {
    let selection = await vscode.window.showInformationMessage(`The file ${fileName} is a secret file. Do you want to open it?`, 'Yes', 'No');
    if (selection === 'Yes') {
        await vscode.window.showTextDocument(vscode.Uri.file(fileName));
    }
}

// This method is called when your extension is deactivated
export function deactivate() {}
