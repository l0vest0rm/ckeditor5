/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module question/questionui
 */
import { Plugin, icons } from '@ckeditor/ckeditor5-core/src';
import { ButtonView } from '@ckeditor/ckeditor5-ui/src';

/**
 * The block quote UI plugin.
 *
 * It introduces the `'question'` button.
 *
 * @extends module:core/plugin~Plugin
 */
export default class QuestionUI extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'QuestionUI';
  }

  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add('question', locale => {
      const command = editor.commands.get('question');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t('Question'),
        icon: icons.quote,
        tooltip: true,
        isToggleable: true
      });

      // Bind button model to command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute command.
      this.listenTo(buttonView, 'execute', () => {
        editor.execute('question');
        editor.editing.view.focus();
      });

      return buttonView;
    });
  }
}
