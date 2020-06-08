$(function(){
  
  function buildHTML(message){
    if ( message.image ) {
      var html =`
        <div class="chat_main" >
          <div class="chat__main__message" data-message-id=${message.id}>
            <div class="chat__main__message__user-info">
              <div class="chat__main__message__user-info__user-name">
                ${message.user_name}
              </div>
              <div class="chat__main__message__user-info__date">
                ${message.created_at}
              </div>
            </div>
            <div class="chat__main__message__chat-message">
              ${message.content}
            </div>
            <img class="input-box__image__file" src=${message.image}>
          </div>
        </div>`
      return html;
      
    } else {
      var html = 
      `<div class="chat_main">
        <div class="chat__main__message" data-message-id=${message.id}>
          <div class="chat__main__message__user-info">
            <div class="chat__main__message__user-info__user-name">
              ${message.user_name}
            </div>  
            <div class="chat__main__message__user-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat__main__message__chat-message">
            ${message.content}
          </div>
       </div>
      </div>`
      return html;
    };
    
  }
 
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data);
      var html = buildHTML(data);
      $('.chat__main').append(html);
      $('.chat__main').animate({ scrollTop: $('.chat__main')[0].scrollHeight});
      $('.new_message')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    }) 
    .always(function() {
      $('.submit-btn').prop("disabled",false);
    });
  });
  
  

    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        var last_message_id = $('.chat__main__message:last').data("message-id");
        console.log(last_message_id)
        $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.chat__main').append(insertHTML);
        $('.chat__main').animate({ scrollTop: $('.chat__main')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      })
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
});

