import type { NewableClass } from '../types/utils.type';
import type { BaseRule } from './base.rule';
import { LineheightUnitRule } from './lineheight-unit.rule';

export const RULES: NewableClass<BaseRule>[] = [LineheightUnitRule];
