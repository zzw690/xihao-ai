const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("userInput");
const chat = document.getElementById("chat-container");

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
  if(e.key==="Enter" && !e.shiftKey){e.preventDefault();sendMessage();}
});

function sendMessage(){
  const text = input.value.trim();
  if(!text) return;
  document.querySelector(".welcome")?.remove();

  const userDiv=document.createElement("div");
  userDiv.className="message user";
  userDiv.innerHTML=`<div class="bubble">${text}</div>`;
  chat.appendChild(userDiv);
  input.value="";
  chat.scrollTop=chat.scrollHeight;

  const typing=document.createElement("div");
  typing.className="message ai";
  typing.innerHTML=`<div class="bubble">AI正在思考...</div>`;
  chat.appendChild(typing);
  chat.scrollTop=chat.scrollHeight;

  fetch("https://yellow-water-c727.2592795053.workers.dev/", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({prompt:text})
  })
  .then(res=>res.json())
  .then(data=>{
    typing.remove();
    const aiDiv=document.createElement("div");
    aiDiv.className="message ai";
    aiDiv.innerHTML=`<div class="bubble">${data.answer}</div>`;
    chat.appendChild(aiDiv);
    chat.scrollTop=chat.scrollHeight;
  })
  .catch(err=>{
    typing.remove();
    const aiDiv=document.createElement("div");
    aiDiv.className="message ai";
    aiDiv.innerHTML=`<div class="bubble">AI接口调用失败，请稍后再试。</div>`;
    chat.appendChild(aiDiv);
  });
}

// 留资表单提交
document.getElementById("submitLead").addEventListener("click", () => {
  const name=document.getElementById("name").value.trim();
  const phone=document.getElementById("phone").value.trim();
  const caseDesc=document.getElementById("case").value.trim();
  if(!name||!phone||!caseDesc){alert("请填写完整信息"); return;}
  fetch("https://formspree.io/f/你的表单ID", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name,phone,case:caseDesc})
  }).then(()=>{alert("预约已提交"); document.getElementById("name").value="";document.getElementById("phone").value="";document.getElementById("case").value="";});
});
