import type { PostcssResult } from 'stylelint';
import type { Root } from 'postcss';
import { BaseRule } from './base.rule';
import { CSS_PROPS } from '../consts/css-props';

/**
 * Rule：line-heightの単位にpxは使用不可
 */
export class LineheightUnitRule extends BaseRule {
  protected readonly _name = 'oteto/lineheight-unit';
  protected readonly _messages = {
    reject: '"line-height" の単位にpxは使用できません',
  };

  protected validate(root: Root, result: PostcssResult): void {
    root.walkDecls(CSS_PROPS.LINE_HEIGHT, (decl) => {
      if (decl.value.endsWith('px')) {
        this.report({ result, node: decl });
      }
    });
  }
}
