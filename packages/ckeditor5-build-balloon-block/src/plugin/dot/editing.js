/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module basic-styles/dot/dotediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import AttributeCommand from '@ckeditor/ckeditor5-basic-styles/src/attributecommand';

const DOT = 'dot';

/**
 * The dot editing feature.
 *
 * It registers the `'dot'` command, the <kbd>Ctrl+Shift+X</kbd> keystroke and introduces the
 * `dotsthrough` attribute in the model which renders to the view
 * as a `<s>` element.
 *
 * @extends module:core/plugin~Plugin
 */
export default class DotEditing extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'DotEditing';
  }

  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor;

    // Allow dot attribute on text nodes.
    editor.model.schema.extend('$text', { allowAttributes: DOT });
    editor.model.schema.setAttributeProperties(DOT, {
      isFormatting: true,
      copyOnEnter: true
    });

    editor.conversion.attributeToElement({
      model: DOT,
      view: 'd',
      upcastAlso: []
    });

    // Create dot command.
    editor.commands.add(DOT, new AttributeCommand(editor, DOT));

    // Set the Ctrl+Shift+D keystroke.
    editor.keystrokes.set('CTRL+SHIFT+D', 'dot');
  }
}
