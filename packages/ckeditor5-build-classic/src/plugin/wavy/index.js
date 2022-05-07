/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module basic-styles/wavy
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import WavyEditing from './editing';
import WavyUI from './ui';

/**
 * The wavy feature.
 *
 * For a detailed overview check the {@glink features/basic-styles Basic styles feature documentation}
 * and the {@glink api/basic-styles package page}.
 *
 * This is a "glue" plugin which loads the {@link module:basic-styles/wavy/wavyediting~WavyEditing} and
 * {@link module:basic-styles/wavy/wavyui~WavyUI} plugins.
 *
 * @extends module:core/plugin~Plugin
 */
export default class Wavy extends Plugin {
  /**
   * @inheritDoc
   */
  static get requires() {
    return [WavyEditing, WavyUI];
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'Wavy';
  }
}
