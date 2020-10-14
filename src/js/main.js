"use strict";

// Variabler
let coursesEl = document.getElementById("db-courses");
let addCourseBtn = document.getElementById("addCourse");
let courseCode = document.getElementById("coursecode");
let courseName = document.getElementById("coursename");
let courseProg = document.getElementById("courseprog");
let courseSyllabus = document.getElementById("coursesyllabus");

// Händelsehanterare
window.addEventListener('load', getCourses);
addCourseBtn.addEventListener("click", addCourse);

// Funktioner
function getCourses(){
    coursesEl.innerHTML = '';

    fetch('http://studenter.miun.se/~peek1901/dt173g/Moment%205%20-%20Del%201/courses.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(course => {
            console.log(course);
            coursesEl.innerHTML +=
            `
            <div class="course">
            <p><b>Kurskod:</b> <span class="course-code">${course.coursecode}</span> 
            <br>
            <b>Kursnamn:</b> <span class="course-name">${course.coursename}</span> 
            <br>
            <b>Kursprogression:</b> ${course.courseprog} 
            <br>
            <b>Kursplan:</b> <a href="${course.coursesyllabus}">Öppna kursplan</a>
            </p>
            <button id="${course.coursecode}" onClick="deleteCourse('${course.coursecode}')">Radera</button>
            </div>
            `
        })
    })
}

function deleteCourse(coursecode){
    fetch('http://studenter.miun.se/~peek1901/dt173g/Moment%205%20-%20Del%201/courses.php?code=' + coursecode, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        getCourses();
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}

function addCourse(){
    let code = courseCode.value;
    let name = courseName.value;
    let prog = courseProg.value;
    let syllabus = courseSyllabus.value;

    let course = {
        'coursecode': code,
        'coursename': name,
        'courseprog': prog,
        'coursesyllabus': syllabus
    };

    fetch('http://studenter.miun.se/~peek1901/dt173g/Moment%205%20-%20Del%201/courses.php', {
        method: 'POST',
        body: JSON.stringify(course),
    })
    .then(response => response.json())
    .then(data => {
        getCourses();
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}