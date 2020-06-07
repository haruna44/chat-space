$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =`
        <div class="chat_main">
          <div class="chat__main__message">
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
        <div class="chat__main__message">
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
      var html = buildHTML(data);
      $('.chat__main').append(html);
      $('.chat__main').animate({ scrollTop: $('.chat__main')[0].scrollHeight});
      $('.new_message')[0].reset();
      // $('.submit-btn').prop("disabled",false)
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      // $('.submit-btn').prop("disabled",false)
    }) 
    .always(function() {
      $('.submit-btn').prop("disabled",false);
    });
  });
});