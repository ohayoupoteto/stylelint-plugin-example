import { setupTest } from '../setup-test';
import dedent from 'ts-dedent';
import { LineheightUnitRule } from '../../src/rules/lineheight-unit.rule';

const { testRule, rule } = setupTest(LineheightUnitRule);
const { reject: message } = rule.formatMessages();

testRule({
  ruleName: rule.name,
  customSyntax: 'postcss-scss',
  config: true,
  accept: [
    {
      code: dedent`
      .a {
        line-height: normal;
        line-height: 1.5;
        line-height: 1.5em;
        line-height: 1.5rem;
        line-height: 150%;
      }`,
    },
  ],
  reject: [
    {
      code: dedent`
      .a {
        line-height: 15px;
      }`,
      message,
      line: 2,
      column: 3,
    },
    {
      code: dedent`
      .a {
        line-height: 15px;
        .b {
          line-height: 0px;
        }
      }`,
      warnings: [
        { message, line: 2, column: 3 },
        { message, line: 4, column: 5 },
      ],
    },
  ],
});
