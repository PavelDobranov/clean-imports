import * as vscode from "vscode";
import { isImportDeclaration, Node } from "typescript";
import {
  getDocumentContent,
  tsCreateSourceFile,
  tsGetParsedChildren,
} from "vsc-base";

const getText = (node: Node): string => node.getText();

export function activate(context: vscode.ExtensionContext) {
  console.log("Clean imports is now active!");

  const cleanImportsCmd = "clean-imports.cleanImports";
  const cleanImportsHandler = () => {
    const content = getDocumentContent();

    if (!content) {
      return;
    }

    const sourceFile = tsCreateSourceFile(content);
    const nodes = tsGetParsedChildren(sourceFile);
    const imports = nodes.filter(isImportDeclaration).map(getText);

    vscode.window.showInformationMessage(imports.join("\n"), { modal: true });
  };

  context.subscriptions.push(
    vscode.commands.registerCommand(cleanImportsCmd, cleanImportsHandler)
  );
}

export function deactivate() {}
