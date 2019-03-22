"use strict";

var group = [];

function Student(studentObj, nameOfObj) {

  this.name = studentObj.name;
  this.surname = studentObj.surname;
  this.grades = studentObj.grades;
  this.nameOfObj = nameOfObj;

  this.fullName = function(){
    return this.name + " " + this.surname;
  };

  this.gradesAvarage = function(){
    var arr = this.grades;
    var result = arr.reduce(function(sum, current){
      return sum + current;
    }, 0);
    return (result / arr.length).toFixed(2);
  };

  group.push(this);

}

Student.prototype.group = function() {
  console.log("Список студентів: ");
  return printGroup();
};

Student.prototype.showAllStudents = function() {
  console.log("Модифікований список студентів: ");
  return printModifyStudents(sortStudents(group));

};

Student.prototype.showBestStudent = function() {
  sortStudents(group);
  return printBestStudent(group[0]);
};

Student.prototype.bestStudent = function() {
  sortStudents(group);
  return printNameOfObj(group[0]);
};

function sortStudents(arr) {
  return arr.sort(function(a, b) {
    return b.gradesAvarage() - a.gradesAvarage();
  });
}

function printGroup(){
  var messages = [];
  group.forEach(function(item, index) {
    return messages.push( ((index + 1)+ ". " + item.name + " " + item.surname + " " + item.grades));
  });
  return messages;
}

function printBestStudent(student){
  return (student.name + " " + student.surname + " - кращий студент курсу. Середній бал = " + student.gradesAvarage());
}

function printModifyStudents(students) {
  var messages = [];
  students.forEach(function(student, index){
    return messages.push( index + ": " + student.fullName() + ". " + "Cередній бал = " + student.gradesAvarage());
  });
  return messages;
}

function printNameOfObj(student){
  return ("Найкращий студент - " + student.nameOfObj);
}

var student1 = new Student ({name: 'Ivan', surname: 'Ivanov', grades: [4,5,5]}, 'student1');
var student2 = new Student ({name: 'Semen', surname: 'Semenov', grades: [3,5,5]}, 'student2');
var student3 = new Student ({name: 'Petr', surname: 'Petrov', grades: [4,3,5]}, 'student3');

console.log(student1);
console.log(Student.prototype.group());
console.log(Student.prototype.showAllStudents());
console.log(Student.prototype.showBestStudent ());
console.log(Student.prototype.bestStudent());
