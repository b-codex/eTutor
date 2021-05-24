

const enrolled = document.getElementById("enrolled-list");
const employed = document.getElementById("employed-list");
const pendingS = document.getElementById("pending-s-list");
const enroleEmail = document.getElementById("stud-enrole-email");
const toggleBtn = document.getElementById("sidebarToggleTop");
const sidebar = document.getElementById("sidebar");
const unenrollBtn = document.getElementById("unenroll-checked");
const checkedText = document.getElementById("checked-count")
const pend = document.querySelector('.pend');
const cancelIcon = document.getElementById("cancel");
const form = document.getElementById("pop-up");
const recommended = document.getElementById("recommended");
var checked = 0;

var enrolled_list = "";

document.addEventListener("DOMContentLoaded",()=>{

    
    fetch_data().then(data=>{
        console.log(data);
        display_employed(data[1]);
        display_pendingS(data[2]);
        display_enrolled(data[2]);
    })
 
    
  
});

async function fetch_data(){
    const response = await fetch('/admin');//fetch data from flask app.py 
    const json = await response.json();//parse the returned data into json
    
    return json.body;
    
}

window.openLink = openLink;
window.onSelect = onSelect;
function openLink(e,id){
    let tab_content,tab_link;

    tab_content = document.querySelectorAll(".tab-content");
    tab_content.forEach(element => {
        element.style.display = "none";
    });
    
    tab_link = document.querySelectorAll(".tab-links");
    tab_link.forEach(element => {
        element.className = element.className.replace("active ","");
    });

    e.currentTarget.className += " active "
    document.getElementById(id).style.display = "block"
    
}

// pending student section

function display_pendingS(data){
    const pending_list = data.par;
    for (let i = 0; i < pending_list.length; i++) {
        if(!pending_list[i].assigned){
            const element = pending_list[i];
            const output = `
                        <div class ="enrole">
                            <ul class="list-inline row list-item mt-0" >
                              
                                <li class="col-2 ">${element.child_first_name}</li> 
                                <li class="col-2 ">${element.parent_first_name}</li>
                                <li class="col-2 ">${element.email}</li>
                                <li class="col-1 ">${element.grade_level}</li>
                                <li class="col-1 ">${element.sex}</li>
                                <li  class="col-2 ">${element.address}</li>
                                <li class="col-2 ">${element.subjects[0]}</li>
                                
                            </ul>
                        </div>
                    <hr class="divider">`;
            

            pendingS.innerHTML += output;
        }
        else{
            continue;
        }
        
        
    }
  
}
function display_enrolled(data){
    const enrolled_list = data.par;
    for (let i = 0; i < enrolled_list.length; i++) {
        if(enrolled_list[i].assigned){
            const element = enrolled_list[i];
            const output = `
                <tr>
                    <td><input class="input-group" type="checkbox" onclick="onSelect(event)" value="" name="list" /></td>
                    <td>${element.child_first_name}</td>
                    <td>${element.parent_first_name}</td>
                    <td>${element.email}</td>
                    <td>${element.grade_level}</td>
                    <td>${element.sex}</td>
                    <td>${element.address}</td>
                    <td>${element.subjects[0]}</td>
                    
                </tr>`;
            
        enrolled.innerHTML += output;
        }
        else{
            continue;
        }
        
        
    }

}



// employed tutor section

function display_employed(data){
    const employed_list = data.tut;
   
    
    for (let i = 0; i < employed_list.length; i++) {
        const element = employed_list[i];
     
        const output = `
            <tr class="py-0">
                <td class = "py-0">${element.tutor_first_name} ${element.tutor_last_name}</td>
                <td class = "py-0">${element.address}</td>
                <td class = "py-0">${element.address}</td>
                <td class = "py-0">${element.sex}</td>
                <td class = "py-0">${element.subjects[0]}</td>
                <td class = "py-0">${element.assigned}</td>
            </tr>`;
          
            
        employed.innerHTML += output;
    }   
  
}

//checkbox
const selectAllBox = document.querySelectorAll(".select-all");

selectAllBox[0].onclick = function() {
    
    let checkboxes = document.getElementsByName('list')
   
    if (selectAllBox[0].checked) {
        for (let index = 0; index < checkboxes.length; index++) {
        
            checkboxes[index].checked = true;
            checkboxes[index].parentElement.parentElement.style.background = "#0a1d57";
            checkboxes[index].parentElement.parentElement.style.color ="#fff";
            checked = document.querySelectorAll("input[type='checkbox']:checked").length;
        }
        
       
        unenrollBtn.style.visibility = 'visible'
    } else {
        for (let index = 0; index < checkboxes.length; index++) {
            checkboxes[index].checked = false;
            checkboxes[index].parentElement.parentElement.style.background = "";
            checkboxes[index].parentElement.parentElement.style.color ="#000";
            checked = document.querySelectorAll("input[type='checkbox']:checked").length;
        }
       
        
        unenrollBtn.style.visibility = 'hidden'
    }
    checkedText.innerHTML = checked

}

function onSelect(event) {
    checked = document.querySelectorAll("input[type='checkbox']:checked").length;
    if (event.target.checked) {
        event.target.parentElement.parentElement.style.background = "#0a1d57"
        event.target.parentElement.parentElement.style.color ="#fff";
        
      
        unenrollBtn.style.visibility = 'visible'
    } else {
        event.target.parentElement.parentElement.style.background = ""
        event.target.parentElement.parentElement.style.color ="#000";
        if(checked === 0){
            
            unenrollBtn.style.visibility = 'hidden'
        }
      
    }
    checkedText.innerHTML = checked;

}


toggleBtn.addEventListener("click", ()=>{

    if(sidebar.style.display === "block"){
        sidebar.style.display ="none"
    }
    else{
        sidebar.style.display ="block"
    }
    
   
})

pend.addEventListener('click', async function(e) {
    var children = e.target.parentElement.children;

    
    const subj = children[6].innerHTML;
    const address = children[5].innerHTML;
    const response = await fetch(`/match?subject=${subj}&address=${address}`);//fetch data from flask app.py 
    const json = await response.json();//parse the returned data into json
    console.log(json);
    console.log(json.body);
    if(json){
        let list = json.body;
        recommended.innerHTML = "";
        for(let i = 0; i<list.length; i++){
            const ele = list[i];
            const output = `<option value="${ele}">${ele}</option>`
            recommended.innerHTML += output;
        }
        enroleEmail.value = children[2].innerHTML;
    }

    
    form.style.display = "block";
    

});
cancelIcon.addEventListener('click', function() {
    form.style.display = "none";
    
});


