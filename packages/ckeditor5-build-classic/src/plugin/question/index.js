/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module question/question
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import QuestionEditing from './editing';
import QuestionUI from './ui';

/**
 * The block quote plugin.
 *
 * For more information about this feature check the {@glink api/question package page}.
 *
 * This is a "glue" plugin which loads the {@link module:question/questionediting~QuestionEditing block quote editing feature}
 * and {@link module:question/questionui~QuestionUI block quote UI feature}.
 *
 * @extends module:core/plugin~Plugin
 */
export default class Question extends Plugin {
  /**
   * @inheritDoc
   */
  static get requires() {
    return [QuestionEditing, QuestionUI];
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'Question';
  }
}
