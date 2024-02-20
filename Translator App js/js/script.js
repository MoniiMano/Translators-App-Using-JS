
const fromText=document.querySelector(".from-text"), 
toText=document.querySelector(".to-text"),
exchangeIcon=document.querySelector(".exchange"),
selectTag=document.querySelectorAll("select"),
icons=document.querySelectorAll(".row i")
translateBtn=document.querySelector("button");

selectTag.forEach((tag, id) => {
   for(const country_code in countries)
   {
    //Selecting English by defalut as From language and Hindi as To Language
        let selected;
        if(id==0 && country_code =="en-GB")
        {
            selected ="selected";
        }
        else if(id==1 && country_code =="ta-LK")
        {
            selected ="selected";
        }
       
        let option=`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);
   }
});

exchangeIcon.addEventListener("click", () => {

    // exchanging textarea and select tag values
    let tempText=fromText.value,
    tempLang=selectTag[0].value;
    fromText.value=toText.value;
    selectTag[0].value=selectTag[1].value;
    toText.value=tempText;
    selectTag[1].value=tempLang;
});

translateBtn.addEventListener("click", () => {
    let text=fromText.value,
    translateFrom =selectTag[0].value, //from select tag
    translateTo =selectTag[1].value; //to select tag

    if(!text) return;
    toText.setAttribute("placeholder","Translating");
   let  apiUrl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
   
   // fetching api response and returning it with parsing into js obj
   // and in another then methods receiving that obj
   fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        toText.value=data.responseData.translatedText;
        toText.setAttribute("placeholder","Translation")


   });
});

icons.forEach(icon=> { 

     icon.addEventListener("click", ({target}) => {

        if(target.classList.contains("fa-copy"))
        {
            // if clicked the  icon has from id, copy the fromTextarea value else copy the toTextarea
            if(target.id == "from")
            {
               navigator.clipboard.writeText(fromText.value);
            }
            else
            {
                navigator.clipboard.writeText(toText.value);
            }
        }
        else
        {
            let utterance;
            if(target.id == "from")
            {
               utterance= new SpeechSynthesisUtterance(fromText.value);
               utterance.lang=selectTag[0].value; // setting the utterance language to fromSelect tag value 
            }
            else
            {
               utterance= new SpeechSynthesisUtterance(toText.value);
               utterance.lang=selectTag[1].value //setting the utterance language to toSelect tag value 
            }
            speechSynthesis.speak(utterance); // speak the pause utterance
        }
    });
});
