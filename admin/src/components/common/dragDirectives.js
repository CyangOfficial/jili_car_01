import Vue from "vue"

Vue.directive('drag', {
    bind(el, binding, vnode, oldVnode) {
        const dialogHead = el.querySelector('.el-dialog__header');
        const dialog = el.querySelector('.el-dialog');
        css(dialogHead, { 'cursor': 'move','top': '0' });
        css(dialog, {
            'left': 0,
            "top": 0
        });
        function css(el, attr) {
            if (typeof attr !== 'object') {
                return parseFloat(getComputedStyle(el)[attr]);
            }
            for (let key in attr) {
                el.style[key] = attr[key];
            }
        }
        dialogHead.addEventListener('mousedown', function (ev) {
            let downX = ev.clientX,
                downY = ev.clientY;

            let dialogL = dialogHead.offsetLeft,
                dialogT = dialogHead.offsetTop;

            let disX = downX - dialogL,
                disY = downY - dialogT;

            let left = css(dialog,'left'),
                top = css(dialog,'top');

            let screenWid = document.documentElement.clientWidth,
                screenHei = document.documentElement.clientHeight;

            let dragMaxleft = dialog.offsetLeft;
            console.log('left:'+dragMaxleft)
                
            document.addEventListener('mousemove', move);

            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', move)
            });

            function move(ev) {
                let moveX = ev.clientX - disX,
                    moveY = ev.clientY - disY;
                css(dialog, {
                    'left': (moveX + left) + "px",
                    "top": (moveY + top) + "px"
                });
                // console.log(moveX);
            }

        });
    }
});