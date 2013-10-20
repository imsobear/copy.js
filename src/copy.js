(function (doc) {
    // 提供一些兼容性的方法
    var util = {
        // 延时函数
        delay: function (second, func) {
            setTimeout(func, second * 1000);
        },
        show: function (elem) {
            elem.css('display', 'block');
        },
        hide: function (elem) {
            elem.css('display', 'none');
        }
    };

    var Copy = function () {
        var self = this;

        //ctrl + c 对应的span
        this.copytip = doc.createElement('span');
        this.copytip.className = 'copy-tip';
        this.copytip.innerHTML = 'Ctrl+C 直接复制';

        // 复制成功对应的span
        this.success = doc.createElement('span');
        this.success.className = 'success-tip';
        this.success.innerHTML = '复制成功！';
        doc.body.appendChild(this.success);
        // this.success = doc.getElementsByClassName('success-tip')[0];

        return this;
    };

    // 选中对应元素的内容
    // 参考：http://stackoverflow.com/a/987376/1189321
    Copy.prototype.selectText = function (element) {
        var text = element,
            range,
            selection;

        // 选中
        if (doc.body.createTextRange) {
            // IE
            range = doc.body.createTextRange();
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

        element.appendChild(this.copytip);
        
        // this.copytip = element.getElementsByClassName('copy-tip')[0];

        // 绑定键盘事件
        this._bindKeyDown();
    };

    // 取消选中
    Copy.prototype.cancleSelected = function (element) {
        var text = element,
            range,
            selection;

        if (doc.body.createTextRange) {
            // IE
            range = doc.body.createTextRange();
            range.moveToElementText(text);
        } else if (window.getSelection) {
            // Others
            selection = window.getSelection();        
            range = doc.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
        } else {
            return false;
        }

        this._removeKeyDown();
    };

    // 怎么判断同时按下 ctrl + c?
    Copy.prototype._bindKeyDown = function () {
        var self = this;
        // 显示ctrl + c的提示信息
        self.copytip.style.display =  'inline';
        // 绑定键盘事件
        doc.addEventListener('keydown', function (e) {
            if (e.ctrlKey && e.keyCode === 67) {
                // 按下 ctrl + c
                self.success.style.display = 'inline';
                // 复制成功，隐藏copytip
                self.copytip.style.display = 'none';
            };
        });
    };

    Copy.prototype._removeKeyDown = function () {
        this.copytip.style.display = 'none';
        this.success.style.display = 'none';
        doc.removeEventListener('keydown');
    };

    // Copy.prototype.

    window.copy = new Copy();

}(document));