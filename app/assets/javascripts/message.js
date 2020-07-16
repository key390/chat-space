$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
       `<div class="message-box">
       <div class="message-info">
        <div class="message-name">
           ${message.user_name}
        </div>
        <div class="message__date">
           ${message.created_at}
        </div>
       </div>
       <div class="message">
        <p class="Message__content">
           ${message.content}
        </p>
        <img class="message__image" src="${message.image}">
      </div>
    </div>`
    return html;
    } else {
      let html =
      `<div class="chat-messages">
        <div class="message-box">
          <div class="message-info">
            <div class="message-name">
              ${message.user_name}
            </div>
        <div class="message__date">
          ${message.created_at}
        </div>
      </div>
      <div class="message">
        <p class="Message__content">
          ${message.content}
        </p>
        </div>
      </div>
    </div>`
    return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました"); 
    })
    .always(function(){
      $('.submit-btn').prop('disabled', false);
    });
  });
});