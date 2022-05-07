/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module basic-styles/wavy/wavyui
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { ButtonView } from '@ckeditor/ckeditor5-ui/src';

import wavyIcon from './icon.svg';

const DOT = 'wavy';

/**
 * The wavy UI feature. It introduces the Wavy button.
 *
 * @extends module:core/plugin~Plugin
 */
export default class WavyUI extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'WavyUI';
  }

  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor;
    const t = editor.t;

    // Add wavy button to feature components.
    editor.ui.componentFactory.add(DOT, locale => {
      const command = editor.commands.get(DOT);
      const view = new ButtonView(locale);

      view.set({
        label: t('Wavy'),
        icon: wavyIcon,
        keystroke: 'CTRL+SHIFT+W',
        tooltip: true,
        isToggleable: true
      });

      view.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute command.
      this.listenTo(view, 'execute', () => {
        editor.execute(DOT);
        editor.editing.view.focus();
      });

      return view;
    });
  }
}
