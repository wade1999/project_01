$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()
    // 发送按钮
    $('#btnSend').on('click', function () {
        var text = $('#ipt').val().trim()
        if (text.length <= 0) { return $('#ipt').val('') }
        $('.talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
        $('#ipt').val('')
        resetui()
        getMsg(text);
    })
    // 回车发送
    $('#ipt').on('keyup', function (e) {
        // console.log(e.keyCode);
        if (e.keyCode === 13)
            $('#btnSend').click()

    })
    // 获取机器人发回的数据
    function getMsg(text) {
        $.ajax({
            method: 'Get',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                // console.log(res);
                if (res.message === 'success') {
                    // 接收消息
                    var msg = res.data.info.text
                    $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /><span>' + msg + '</span></li>')
                    resetui()
                    getVoice(msg)
                }
            }

        })
    }
    // 文字转化为语音
    function getVoice(text) {
        $.ajax({
            method: 'Get',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                // console.log(res);
                if (res.status === 200) {
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        })
    }
})
