const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("userInput");
const chat = document.getElementById("chat-container");

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", function(e){
  if(e.key==="Enter" && !e.shiftKey){
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage(){
  const text = input.value.trim();
  if(!text) return;

  document.querySelector(".welcome")?.remove();

  // 用户消息
  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.innerHTML = `<div class="bubble">${text}</div>`;
  chat.appendChild(userDiv);
  input.value="";
  chat.scrollTop=chat.scrollHeight;

  // AI 打字动画
  const typing = document.createElement("div");
  typing.className = "message ai";
  typing.innerHTML=`<div class="bubble"><div class="typing"><span></span><span></span><span></span></div></div>`;
  chat.appendChild(typing);
  chat.scrollTop=chat.scrollHeight;

  // 调用 Cloudflare Worker API
  fetch("https://你的-worker子域.workers.dev", {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({prompt:text})
  })
  .then(res=>res.json())
  .then(data=>{
    typing.remove();
    const ai = document.createElement("div");
    ai.className="message ai";
    ai.innerHTML=`<div class="bubble">${data.answer}</div>`;
    chat.appendChild(ai);
    chat.scrollTop=chat.scrollHeight;
  })
  .catch(err=>{
    typing.remove();
    const ai = document.createElement("div");
    ai.className="message ai";
    ai.innerHTML=`<div class="bubble">抱歉，AI接口调用失败，请稍后重试。</div>`;
    chat.appendChild(ai);
    chat.scrollTop=chat.scrollHeight;
  });
}
