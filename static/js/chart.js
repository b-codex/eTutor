
const cData = document.querySelectorAll(".c-data");
const studCard = document.getElementById("student-data");
const tutCard = document.getElementById("tutor-data");
const studPCard = document.getElementById("pendingS-data");
const tutPCard = document.getElementById("pendingT-data");
var student;
var tutor;
var user;


document.addEventListener("DOMContentLoaded",()=>{

  fetch_data().then(response=>{
    set_data(response);
  });
  
})

async function fetch_data(){
  const response = await fetch('/admin');//fetch data from flask app.py 
  const json = await response.json();//parse the returned data into json
  
  return json.body;
  
}

function set_data(data){
  
  student = data[2].par;
  tutor = data[1].tut;
  user = data[0].users;
  console.log(user);
 

  var countPS = 0;
  var countPT = 0;
  for(let i = 0; i<tutor.length; i++){
    if(!tutor.assigned) countPS++;
  }
  for(let i = 0; i<student.length; i++){
    if(!student.assigned) countPT++;
  }
  studPCard.innerHTML = countPS;
  tutPCard.innerHTML = countPT;
  studCard.innerHTML = student.length - countPS;
  tutCard.innerHTML = tutor.length - countPT;
  

}




google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart1);

function drawChart1() {

  let male = student.filter(stud=>{
    return stud.sex === 'male';
  }).length;
  let female = student.filter(stud=>{
    return stud.sex === 'female';
  }).length;
  

var data = google.visualization.arrayToDataTable([
    ['Sex', 'Count Student'],
    ['Male',     male],
    ['Female',      female],
    
]);

var options = {
    responsive:true,
    title: 'Student data by sex'
};

var chart = new google.visualization.PieChart(document.getElementById('piechart1'));
chart.draw(data, options);
}


//--------------------------------
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart2);

function drawChart2() {

  let male = tutor.filter(tut=>{
    return tut.sex === 'male';
  }).length;
  let female = tutor.filter(tut=>{
    return tut.sex === 'female';
  }).length;

var data = google.visualization.arrayToDataTable([
    ['Sex', 'Count employe'],
    ['Male',     male],
    ['Female',      female],
    
]);

var options = {
    responsive:true,
    title: 'Employe data by sex'
};

var chart = new google.visualization.PieChart(document.getElementById('piechart2'));
chart.draw(data, options);
}
//---------------- 

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(barchart1);
function barchart1() {
      let arr = populate_array(student);
      arr[0] = ['Level', 'Student'];
     
      var data = google.visualization.arrayToDataTable(arr);

      var options = {
        responsive:true,
        title: 'Number of students in each grade',
        vAxis: {
          title: 'Level of class',
          minValue: 1,
          textStyle: {
            bold: true,
            fontSize: 12,
            color: '#4d4d4d'
          },
         
        },
        hAxis: {
          title: 'Number of student',
          textStyle: {
            fontSize: 14,
            bold: true,
            color: '#848484'
          },
         
        }
      };
      var chart = new google.visualization.ColumnChart(document.getElementById('chart_bar1'));
      chart.draw(data, options);
    }

function populate_array(list){
  let array2d = [['Level', 'Student'],["1",0],["2",0],["3",0],["4",0],["5",0],["6",0],["7",0],["8",0],["9",0],["10",0],["11",0],["12",0],];
  list.forEach(element => {
    const level = element.grade_level_two;
    array2d[level][1]++;
  });
  return array2d;
}
