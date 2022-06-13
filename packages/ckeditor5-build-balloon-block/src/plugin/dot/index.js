/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module basic-styles/dot
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import DotEditing from './editing';
import DotUI from './ui';

/**
 * The dot feature.
 *
 * For a detailed overview check the {@glink features/basic-styles Basic styles feature documentation}
 * and the {@glink api/basic-styles package page}.
 *
 * This is a "glue" plugin which loads the {@link module:basic-styles/dot/dotediting~DotEditing} and
 * {@link module:basic-styles/dot/dotui~DotUI} plugins.
 *
 * @extends module:core/plugin~Plugin
 */
export default class Dot extends Plugin {
  /**
   * @inheritDoc
   */
  static get requires() {
    return [DotEditing, DotUI];
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'Dot';
  }
}
