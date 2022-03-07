import Quill from 'quill';
import { CELL_ATTRIBUTES, CELL_IDENTITY_KEYS, rowId, cellId, CELL_DEFAULT } from '../quill-better-table/formats/table';
const Container = Quill.import('blots/container');
const Block = Quill.import('blots/block');

export class ListContainer extends Container {
  checkMerge() {
    if (super.checkMerge() && this.next.children.head !== null && this.next.children.head !== undefined) {
      const getCellId = (node) => {
        return (
          (node.formats && node.formats()[node.statics.blotName]) || { cell: node.domNode.getAttribute('data-cell') }
        );
      };
      const thisHead = getCellId(this.children.head);
      const thisTail = getCellId(this.children.tail);
      const nextHead = getCellId(this.next.children.head);
      const nextTail = getCellId(this.next.children.tail);
      return thisHead.cell === thisTail.cell && thisHead.cell === nextHead.cell && thisHead.cell === nextTail.cell;
    }
    return false;
  }
  static create(value) {
    const node = super.create(value);
    CELL_IDENTITY_KEYS.forEach(key => {
      const identityMaker = key === 'row'
        ? rowId : cellId;
      node.setAttribute(`data-${key}`, value[key] || identityMaker());
    });

    CELL_ATTRIBUTES.forEach(attrName => {
      node.setAttribute(`data-${attrName}`, value[attrName] || CELL_DEFAULT[attrName]);
    });

    if (value['cell-bg']) {
      node.setAttribute('data-cell-bg', value['cell-bg']);
    }
    // console.log(value, 'value', node, 'container create');

    return node;
  }

  static formats(domNode) {
    const formats = {};
    const result = CELL_ATTRIBUTES.concat(CELL_IDENTITY_KEYS).concat(['cell-bg']).reduce((formats, attribute) => {
      if (domNode.hasAttribute(`data-${attribute}`)) {
        formats[attribute] = domNode.getAttribute(`data-${attribute}`) || undefined;
      }
      return formats;
    }, formats);
    // console.log(result, 'container formats', domNode);

    return result;
  }

  formats() {
    const formats = {};

    if (this.domNode.hasAttribute('data-row')) {
      formats.row = this.domNode.getAttribute('data-row');
    }

    if (this.domNode.hasAttribute('data-cell-bg')) {
      formats['cell-bg'] = this.domNode.getAttribute('data-cell-bg');
    }

    return CELL_ATTRIBUTES.reduce((formats, attribute) => {
      if (this.domNode.hasAttribute(attribute)) {
        formats[attribute] = this.domNode.getAttribute(attribute);
      }

      return formats;
    }, formats);
  }

  optimize(context) {
    const rowId = this.domNode.getAttribute('data-row');
    const rowspan = this.domNode.getAttribute('data-rowspan');
    const colspan = this.domNode.getAttribute('data-colspan');
    const cellBg = this.domNode.getAttribute('data-cell-bg');

    if (this.statics.requiredContainer
      && !(this.parent instanceof this.statics.requiredContainer)) {
      this.wrap(this.statics.requiredContainer.blotName, {
        row: rowId,
        colspan,
        rowspan,
        'cell-bg': cellBg,
      });
    }
    super.optimize(context);
  }

  tableCell() {
    return this.parent;
  }
}

ListContainer.blotName = 'list-container';
ListContainer.tagName = 'OL';

export default class ListItem extends Block {
  static register() {
    Quill.register({ 'formats/list-container': ListContainer }, true);
  }
  static create(value) {
    const node = super.create(value);

    CELL_IDENTITY_KEYS.forEach(key => {
      const identityMaker = key === 'row'
        ? rowId : cellId;
      node.setAttribute(`data-${key}`, value[key] || identityMaker());
    });

    CELL_ATTRIBUTES.forEach(attrName => {
      node.setAttribute(`data-${attrName}`, value[attrName] || CELL_DEFAULT[attrName]);
    });

    if (value['cell-bg']) {
      node.setAttribute('data-cell-bg', value['cell-bg']);
    }
    // console.log(value, node, 'item create');

    return node;
  }

  static formats(domNode) {
    const formats = {};
    const result = CELL_ATTRIBUTES.concat(CELL_IDENTITY_KEYS).concat(['cell-bg']).reduce((formats, attribute) => {
      if (domNode.hasAttribute(`data-${attribute}`)) {
        formats[attribute] = domNode.getAttribute(`data-${attribute}`) || undefined;
      }
      return formats;
    }, formats);
    // console.log(result, 'item formats', domNode);
    return result;
  }

  optimize(context) {
    const rowId = this.domNode.getAttribute('data-row');
    const rowspan = this.domNode.getAttribute('data-rowspan');
    const colspan = this.domNode.getAttribute('data-colspan');
    const cellBg = this.domNode.getAttribute('data-cell-bg');

    if (this.statics.requiredContainer
      && !(this.parent instanceof this.statics.requiredContainer)) {
      this.wrap(this.statics.requiredContainer.blotName, {
        row: rowId,
        colspan,
        rowspan,
        'cell-bg': cellBg,
      });
    }
    super.optimize(context);
  }
}

ListItem.blotName = 'list';
ListItem.tagName = 'li';

ListContainer.allowedChildren = [ListItem];
ListItem.requiredContainer = ListContainer;
