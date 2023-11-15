import {
  createPlugin,
  type PostcssResult,
  type Rule as stylelintRule,
  type RuleBase,
  type Severity,
  utils,
} from 'stylelint';
import type { Root } from 'postcss';
import type {
  FormattedRuleMessage,
  RuleMessages,
  RuleName,
  RuleReportOptions,
} from '../types/rule.type';

/**
 * ルールの抽象クラス
 */
export abstract class BaseRule {
  protected abstract readonly _name: RuleName;
  protected abstract readonly _messages: RuleMessages;
  protected readonly _severity: Severity = 'error';

  protected abstract validate(root: Root, result: PostcssResult): void;

  get name(): RuleName {
    return this._name;
  }

  get messages(): RuleMessages {
    return this._messages;
  }

  get severity(): Severity {
    return this._severity;
  }

  createPlugin(): ReturnType<typeof createPlugin> {
    return createPlugin(
      this.name,
      this.createRuleFunc() as unknown as stylelintRule,
    );
  }

  formatMessages(): RuleMessages {
    return utils.ruleMessages(this.name, this.messages);
  }

  protected formatMessage(message: string): FormattedRuleMessage {
    return `${message} (${this.name})`;
  }

  protected report({
    result,
    node,
    message,
    severity,
  }: RuleReportOptions): void {
    const reportMessage = message || this.formatMessages().reject;

    utils.report({
      ruleName: this.name,
      severity: severity || this.severity,
      message: reportMessage,
      result,
      node,
    });
  }

  private createRuleFunc(): RuleBase {
    return () => {
      return (postcssRoot, postcssResult) => {
        if (!utils.validateOptions(postcssResult, this.name)) return;
        this.validate(postcssRoot, postcssResult);
      };
    };
  }
}
