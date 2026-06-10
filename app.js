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

const text=input.value.trim();

if(!text) return;

document.querySelector(".welcome")?.remove();

const userDiv=document.createElement("div");

userDiv.className="message user";

userDiv.innerHTML=

`<div class="bubble">${text}</div>`;

chat.appendChild(userDiv);

input.value="";

chat.scrollTop=chat.scrollHeight;

const typing=document.createElement("div");

typing.className="message ai";

typing.innerHTML=

`
<div class="bubble">

<div class="typing">
<span></span>
<span></span>
<span></span>
</div>

</div>
`;

chat.appendChild(typing);

chat.scrollTop=chat.scrollHeight;

setTimeout(()=>{

typing.remove();

const ai=document.createElement("div");

ai.className="message ai";

ai.innerHTML=

`
<div class="bubble">

<h3>初步法律分析</h3>

<br>

您咨询的问题：

${text}

<br><br>

根据现有信息，
建议进一步收集相关证据材料。

<br><br>

本回复仅供参考，
不构成正式法律意见。

<br><br>

如需律师进一步分析，
请预约上海玺浩律师事务所。

</div>
`;

chat.appendChild(ai);

chat.scrollTop=chat.scrollHeight;

},1800);

}
