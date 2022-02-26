# 在 Quill 表格中插入列表

本项目基于：
- `quill@2.0.0-dev.3`
- `quill-better-table@1.2.10`

关键步骤：
1. Step 1: 自定义`formats/list`格式，并注册到`Quill`中
2. Step 2: 修改`TableCell`的`checkMerge`方法
3. Step 3: 给`TableCell`的`allowedChildren`增加`ListItem`和`ListContainer`
