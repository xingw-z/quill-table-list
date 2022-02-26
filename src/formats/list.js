// Step 1: 自定义`formats/list`格式，并注册到`Quill`中
import Quill from 'quill'

const Container = Quill.import('blots/container')
const Block = Quill.import('blots/block')

export class ListContainer extends Container {}

ListContainer.blotName = 'list-container'
ListContainer.tagName = 'OL'

export default class ListItem extends Block {
  static register() {
    Quill.register({ 'formats/list-container': ListContainer }, true)
  }
}

ListItem.blotName = 'list'
ListItem.tagName = 'li'

ListContainer.allowedChildren = [ListItem]
ListItem.requiredContainer = ListContainer
