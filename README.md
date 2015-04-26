copy.js
=======

copy by js !

![](http://blog-images.u.qiniudn.com/copy.png)

### 1. what's this

这是一个很简单的组件（100多行代码），用 `js` 实现复制文本的功能，这可能不太准确，因为如你所知，因为安全问题，
除IE以为的浏览器禁止用 `js` 将文本复制到剪贴板上，这个简单组件所能做的就是鼠标到目标文字时，使文本处于选中状
态，并提示 `ctrl + c 可复制`。

### 2. why

这么简单的功能竟然搞成组件！

纯粹是为了好玩。

其中核心的代码就是一个选中文本的方法：

``` javascript
function selectText (element) {
    var text = element,
        range,
        selection;

    if (body.createTextRange) {
        // IE
        range = body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        // Others
        selection = window.getSelection();
        range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        return false;
    }
}

```

然后做了一个提示用户复制成功的tips，这里需要监听用户按下`ctrl + c`，可以使用下面的方式：

``` javascript
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.keyCode === 67) {
          // 按下ctrl +c 
    };
});
```
`event`对象里包含有 `ctrlKey altKey shiftKey` 这样的布尔值。

### 3. How：

首先引入 `copy.js` and `copy.css`，为要复制的对象绑定事件：

``` javascript
// 选中
elem.addEventListener('mouseenter', function (e) {
    copy.selectText(this);
});
// 取消选中
elemaddEventListener('mouseleave', function (e) {
    copy.cancleSelected(this);
});
```

### 4. Last:

兼容IE7+，IE6没有测过，不太确定。 
后续会添加一个配置项，让这个小东西更加灵活一点，

---Over----



