function countText1() {
    var text = document.contactform.meno.value;
    document.getElementById('count-words1').innerText = "Písmená: " + text.length + "/20";
}

function countText2() {
    var text = document.contactform.priezvisko.value;
    document.getElementById('count-words2').innerText = "Písmená: " + text.length + "/20";
}

function countText3() {
    var text = document.contactform.txtnote.value;
    document.getElementById('count-words3').innerText = "Písmená: " + text.length + "/100";
}

function countText4() {
    var text = document.contactform.phone.value;
    document.getElementById('count-words4').innerText = "Čísla: " + text.length + "/9";
}

function countText5() {
    var text = document.contactform.email.value;
    document.getElementById('count-words5').innerText = "Písmená: " + text.length + "/30";
}

var price = 150;
function listener_1()
{
  if(select_1.options[select_1.selectedIndex].index == 0 && select_2.options[select_2.selectedIndex].index == 0) {
    select_2.options[0].text = "Francúzsko";
    select_2.options[0].value = "3";
    select_2.options[1].text = "Taliansko";
    select_2.options[1].value = "4";
    select_3.options[0].text = "Paríž";
    select_3.options[0].value = "7";
    select_3.options[1].text = "Nice";
    select_3.options[1].value = "8"; 
    if(select_3.options[select_3.selectedIndex].index == 0) {
        price = 150;
    } else {
       price = 140; 
    }
  }
  else if(select_1.options[select_1.selectedIndex].index == 0 && select_2.options[select_2.selectedIndex].index == 1) {
    select_2.options[0].text = "Francúzsko";
    select_2.options[0].value = "3";
    select_2.options[1].text = "Taliansko";
    select_2.options[1].value = "4";
    select_3.options[0].text = "Rím";
    select_3.options[0].value = "9";
    select_3.options[1].text = "Neapol";
    select_3.options[1].value = "10";  
    if(select_3.options[select_3.selectedIndex].index == 0) {
        price = 120;
    } else {
       price = 130; 
    } 
  }
  else if(select_1.options[select_1.selectedIndex].index == 1 && select_2.options[select_2.selectedIndex].index == 0) {
    select_2.options[0].text = "New York";
    select_2.options[0].value = "5";
    select_2.options[1].text = "California";
    select_2.options[1].value = "6";
    select_3.options[0].text = "New York city";
    select_3.options[0].value = "11";
    select_3.options[1].text = "Buffalo";
    select_3.options[1].value = "12"; 
    
    if(select_3.options[select_3.selectedIndex].index == 0) {
        price = 900;
    } else
    {
       price = 950; 
    }
  }
  else if(select_1.options[select_1.selectedIndex].index == 1 && select_2.options[select_2.selectedIndex].index == 1) {
    select_2.options[0].text = "New York";
    select_2.options[0].value = "5";
    select_2.options[1].text = "California";
    select_2.options[1].value = "6";
    select_3.options[0].text = "Los angeles";
    select_3.options[0].value = "13";
    select_3.options[1].text = "San Francisco";
    select_3.options[1].value = "14";
    if(select_3.options[select_3.selectedIndex].index == 0)
    {
        price = 1200;
    } else
    {
       price = 1300; 
    } 
  }
  document.getElementById('price').innerHTML = `Cena letenky: ${price}€`;
}

function onlyOne(checkbox) {
    var checkboxes = document.querySelectorAll(".check");
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
    });
}

function calcAge(){
    var getDtLive = document.getElementById("datumNarodenia").value;  

	var born_date = new Date(getDtLive);
	 
	var diff_dt=Date.now() - born_date.getTime(); 
	 	 
	var  ageDate = new Date(diff_dt); 
	var total_calc_member_age=   Math.abs(ageDate.getUTCFullYear() - 1970);
	document.getElementById("vek").value = total_calc_member_age;
} 

function checkAge(){
    var getDtLive = document.getElementById("datumNarodenia").value;  

	var born_date = new Date(getDtLive);
	 
	var diff_dt=Date.now() - born_date.getTime(); 
	 	 
	var  ageDate = new Date(diff_dt); 
	var total_calc_member_age=   Math.abs(ageDate.getUTCFullYear() - 1970);

    if(document.getElementById("vek").value != total_calc_member_age){
        alert("Dátum narodenia a vek sa nezhodujú, alebo nemáš zadaný dátum narodenina");
        document.getElementById("vek").value = total_calc_member_age;
        document.getElementById("datumNarodenia").style.borderColor = "red";
        return false;
    }
    document.getElementById("required-birth").innerHTML = "";
    document.getElementById("datumNarodenia").style.borderColor = "#aaa";
    return true;
}

function checkGender(){
    var radios = document.getElementsByName("gender");

    for (var i = 0, len = radios.length; i < len; i++) {
         if (radios[i].checked) {
            document.getElementById("required-gender").innerHTML = "";
             return true;
         }
    }
    alert("Nemáš vyplnené pohlavie");
    return false;
}

function checkPhone(){
    let myPhone = document.getElementById("phone");
    let pos = myPhone.value.search(/^[0-9]{9}$/);
    if (pos != 0){
        if(myPhone.value == ""){
            return true;
        }
        alert("Telefónne čislo " + myPhone.value + " nie je v správnom tvare, alebo nie je zadané.\n"+
                "správny tvar je: [0-9]{9}");
        myPhone.focus();
        myPhone.select();
        myPhone.style.borderColor = "red";
        return false;
    }
    document.getElementById("check-phone").innerHTML = "";
    myPhone.style.borderColor = "#aaa";
    return true;
}

function checkMail(){
    let myMail = document.getElementById("email");
    let pos = myMail.value.search(/^[a-z0-9._-]{3,}@[a-z0-9.-]+\.[a-z]{2,4}$/);
    if (pos != 0){
        alert("Email " + myMail.value + " nie je v správnom tvare, alebo nie je zadané\n"+
                "správny tvar je: [a-z0-9._-]{3,}+@[a-z0-9.-]+\.[a-z]{2,}");
        myMail.focus();
        myMail.select();
        myMail.style.borderColor = "red";
        return false;
    }
    document.getElementById("required-email").innerHTML = "";
    myMail.style.borderColor = "#aaa";
    return true;
}

function checkName(){
    let myName = document.getElementById("meno");
    let pos = myName.value.search(/^([šŠa-zA-Z]|[à-ú]|[À-Ú])+$/);
    if (pos != 0){
        alert("Meno " + myName.value + " nie je v správnom tvare alebo nie je zadané\n"+
                "správny tvar je: [a-zA-Z]{1,20}");
        myName.focus();
        myName.select();
        myName.style.borderColor = "red";
        return false;
    }
    myName.style.borderColor = "#aaa";
    document.getElementById("required-name").innerHTML = "";
    return true;
}

function checkSurname(){
    let mySurname = document.getElementById("priezvisko");
    let pos = mySurname.value.search(/^^([šŠa-zA-Z]|[à-ú]|[À-Ú])+$/);
    if (pos != 0){
        alert("Priezvisko " + mySurname.value + " nie je v správnom tvare alebo nie je zadané\n"+
                "správny tvar je: [a-zA-Z]{1,20}");
        mySurname.focus();
        mySurname.select();
        mySurname.style.borderColor = "red";
        return false;
    }
    document.getElementById("required-surname").innerHTML = "";
    mySurname.style.borderColor = "#aaa";
    return true;
}

function openModal(){
    var spanClose = document.createElement("span");
	spanClose.innerHTML = "&times";
	spanClose.classList.add("close");

    var h2 = document.createElement("h2");
    h2.innerHTML = "Zhrnutie";
    h2.classList.add("summary");

    var name = document.getElementById("meno").value;
	var parName = document.createElement("p");
	parName.innerHTML = "Meno: " + name;

    var surname = document.getElementById("priezvisko").value;
	var parSurname = document.createElement("p");
	parSurname.innerHTML = "Priezvisko: " + surname;

    var birth = document.getElementById("datumNarodenia").value;
	var parBirth = document.createElement("p");
	parBirth.innerHTML = "Dátum narodenia: " + birth;

    var age = document.getElementById("vek").value;
	var parAge = document.createElement("p");
	parAge.innerHTML = "Vek: " + age;

	var parGender = document.createElement("p");
	parGender.innerHTML = "Pohlavie: " + displayRadioValue();

    var email = document.getElementById("email").value;
	var parEmail = document.createElement("p");
	parEmail.innerHTML = "Email: " + email;

    var parBag = document.createElement("p");
    parBag.innerHTML = "Veľkosť kufra: " + displayRadioValue2();

    var parPrice = document.createElement("p");
	parPrice.innerHTML = "Cena: " + price + "€";
    parPrice.classList.add("parPrice");

    var submitBtn = document.createElement("INPUT");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("form","myForm");
    submitBtn.classList.add("mySubmit");


	var modalContent = document.createElement("div");
	modalContent.appendChild(spanClose);
    modalContent.appendChild(h2);   
	modalContent.appendChild(parName);
    modalContent.appendChild(parSurname);
    modalContent.appendChild(parBirth);
    modalContent.appendChild(parAge);
    modalContent.appendChild(parGender);
    if(!document.getElementById('vaha-i').value == ""){
        var weight = document.getElementById("vaha-i").value;
        var parWeight = document.createElement("p");
        parWeight.innerHTML = "Váha: " + weight + "kg";
        modalContent.appendChild(parWeight);
    }    

    if(!document.getElementById('vyska-i').value == ""){
        var height = document.getElementById("vyska-i").value;
	    var parHeight = document.createElement("p");
	    parHeight.innerHTML = "Výška: " + height + "cm";
        modalContent.appendChild(parHeight);
    }    
    
    modalContent.appendChild(parEmail);

    if(!document.getElementById("phone").value == ""){
        var countryCode = document.getElementById("countryCode").value;
        var phone = document.getElementById("phone").value;
        var parPhone = document.createElement("p");
        parPhone.innerHTML = "Telefóne číslo: " + countryCode + " " + phone;
        modalContent.appendChild(parPhone);
    }
    
    modalContent.appendChild(parBag);

    if(!document.getElementById("txtnote").value == ""){
        var note = document.getElementById("txtnote").value;
        var parNote = document.createElement("p");
        parNote.innerHTML = "Poznámka: " + note;
        modalContent.appendChild(parNote);
    }

    modalContent.appendChild(parPrice);
    modalContent.appendChild(submitBtn);
	modalContent.classList.add("modal-content");
	
	var myModal  = document.getElementById("myModal");
    myModal.innerHTML = "";
	myModal.appendChild(modalContent);
    myModal.style.display = "block";

    spanClose.onclick = function (){
        myModal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == myModal) {
          myModal.style.display = "none";
        }
      };
}

function displayRadioValue() {
    var ele = document.getElementsByName('gender');
      
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        return ele[i].value;
    }
}

function displayRadioValue2() {
    var ele = document.querySelectorAll(".check");
      
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        return ele[i].value + " litrov";
    }
}

function otherValue(){
    var other = document.getElementById("other");
    var other_text = document.getElementById("other-text").value;
    other.value = other_text;
}

function validateForm(){
    all_ok = 1;
  
    if(!checkName()) {
    all_ok = 0;
    document.getElementById("required-name").innerHTML = "Name is not valid";
  }

  if(document.getElementById('meno').value == "") {
    all_ok = 0;
    document.getElementById("required-name").innerHTML = "required";
  }
  
  if(!checkSurname()) {
    all_ok = 0;
    document.getElementById("required-surname").innerHTML = "Surname is not valid";
  }

  if(document.getElementById('priezvisko').value == "") {
    all_ok = 0;
    document.getElementById("required-surname").innerHTML = "required";
  }
  
  if(!checkAge()) {
    all_ok = 0;
    document.getElementById("required-birth").innerHTML = "Age is not valid";
  }

  if(document.getElementById('vek').value == "") {
    all_ok = 0;
    document.getElementById("required-birth").innerHTML = "required";
  }


  if(!checkGender()){
    all_ok=0;
    document.getElementById("required-gender").innerHTML = "required";
  }


  if(!checkMail()) {
    all_ok = 0;
    document.getElementById("required-email").innerHTML = "Email is not valid";
  }

  if(document.getElementById('email').value == "") {
    all_ok = 0;
    document.getElementById("required-email").innerHTML = "required";
  }

  if(!checkPhone()) {
    all_ok = 0;
    document.getElementById("check-phone").innerHTML = "Number is not valid";
  }
  
  if(all_ok == 1) {
    return true;  
  }
  else {
    return false;
  }
}

function showWeight(){
    vaha = document.getElementById("vaha").style.display = "block";
    vyska = document.getElementById("vyska").style.display = "none";
    
}
function showHeight() {
    vaha = document.getElementById("vaha").style.display = "none";
    vyska = document.getElementById("vyska").style.display = "block";
}

function hideBoth() {
    vaha = document.getElementById("vaha").style.display = "none";
    vyska = document.getElementById("vyska").style.display = "none";
}

function deleteNote(){
    var note = document.getElementById("txtnote");
    note.value = "";
    countText3();
}