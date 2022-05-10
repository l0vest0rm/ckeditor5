/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module question/questionediting
 */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Enter from '@ckeditor/ckeditor5-enter/src/enter';
import Delete from '@ckeditor/ckeditor5-typing/src/typing';

import QuestionCommand from './command';

/**
 * The block quote editing.
 *
 * Introduces the `'question'` command and the `'question'` model element.
 *
 * @extends module:core/plugin~Plugin
 */
export default class QuestionEditing extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'QuestionEditing';
  }

  /**
   * @inheritDoc
   */
  static get requires() {
    return [Enter, Delete];
  }

  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor;
    const schema = editor.model.schema;

    editor.commands.add('question', new QuestionCommand(editor));

    schema.register('question', {
      inheritAllFrom: '$container'
    });

    //editor.conversion.elementToElement({ model: 'question', view: 'question' });
    editor.conversion
      .elementToElement({
        model: 'question',
        view: (modelElement, conversionApi) => {
          const { writer } = conversionApi;
          //console.log('modelElement.getAttribute()', modelElement.getAttribute('id'))
          return writer.createContainerElement('question', { id: modelElement.getAttribute('id') ? modelElement.getAttribute('id') : Date.now() });;
        }
      });

    // Postfixer which cleans incorrect model states connected with block quotes.
    editor.model.document.registerPostFixer(writer => {
      const changes = editor.model.document.differ.getChanges();

      for (const entry of changes) {
        if (entry.type == 'insert') {
          const element = entry.position.nodeAfter;

          if (!element) {
            // We are inside a text node.
            continue;
          }

          if (element.is('element', 'question') && element.isEmpty) {
            // Added an empty question - remove it.
            writer.remove(element);

            return true;
          } else if (element.is('element', 'question') && !schema.checkChild(entry.position, element)) {
            // Added a question in incorrect place. Unwrap it so the content inside is not lost.
            writer.unwrap(element);

            return true;
          } else if (element.is('element')) {
            // Just added an element. Check that all children meet the scheme rules.
            const range = writer.createRangeIn(element);

            for (const child of range.getItems()) {
              if (
                child.is('element', 'question') &&
                !schema.checkChild(writer.createPositionBefore(child), child)
              ) {
                writer.unwrap(child);

                return true;
              }
            }
          }
        } else if (entry.type == 'remove') {
          const parent = entry.position.parent;

          if (parent.is('element', 'question') && parent.isEmpty) {
            // Something got removed and now question is empty. Remove the question as well.
            writer.remove(parent);

            return true;
          }
        }
      }

      return false;
    });

    const viewDocument = this.editor.editing.view.document;
    const selection = editor.model.document.selection;
    const questionCommand = editor.commands.get('question');

    // Overwrite default Enter key behavior.
    // If Enter key is pressed with selection collapsed in empty block inside a quote, break the quote.
    this.listenTo(viewDocument, 'enter', (evt, data) => {
      if (!selection.isCollapsed || !questionCommand.value) {
        return;
      }

      const positionParent = selection.getLastPosition().parent;

      if (positionParent.isEmpty) {
        editor.execute('question');
        editor.editing.view.scrollToTheSelection();

        data.preventDefault();
        evt.stop();
      }
    }, { context: 'question' });

    // Overwrite default Backspace key behavior.
    // If Backspace key is pressed with selection collapsed in first empty block inside a quote, break the quote.
    this.listenTo(viewDocument, 'delete', (evt, data) => {
      if (data.direction != 'backward' || !selection.isCollapsed || !questionCommand.value) {
        return;
      }

      const positionParent = selection.getLastPosition().parent;

      if (positionParent.isEmpty && !positionParent.previousSibling) {
        editor.execute('question');
        editor.editing.view.scrollToTheSelection();

        data.preventDefault();
        evt.stop();
      }
    }, { context: 'question' });
  }
}
