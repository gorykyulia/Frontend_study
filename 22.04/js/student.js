
(function() {
  var group = [];

class Student {
  constructor(studentObj, nameOfObj) {
    this.name = studentObj.name;
    this.surname = studentObj.surname;
    this.grades = studentObj.grades;
    this.nameOfObj = nameOfObj;
    group.push(this);
  }

  fullName() {
    return this.name + " " + this.surname;
  }

  gradesAvarage() {
    var arr = this.grades;
    var result = arr.reduce((sum, current) => sum + current, 0);
    return (result / arr.length).toFixed(2);
  }

  static group () {
    console.log("Список студентів: ");
    return printGroup();
  }

  static showAllStudents() {
    console.log("Модифікований список студентів: ");
    return printModifyStudents(Student.sortStudents(group));
  }

  static showBestStudent() {
    Student.sortStudents(group);
    return printBestStudent(group[0]);
  }

  static bestStudent() {
    Student.sortStudents(group);
    return printNameOfObj(group[0]);
  }
  
  static sortStudents(arr) {
    return arr.sort((a, b) => b.gradesAvarage() - a.gradesAvarage());
  }
}

function printGroup() {
  var messages = [];
  group.forEach( (item, index) => messages.push(`${index + 1}. ${item.name} ${item.surname} ${item.grades}`));
  return messages;
}

function printBestStudent(student) {
  return (`${student.name} ${student.surname} - кращий студент курсу. Середній бал = ${student.gradesAvarage()}`);
}

function printModifyStudents(students) {
  var messages = [];
  students.forEach( (student, index) => messages.push(`${index}: ${student.fullName()}. Cередній бал = ${student.gradesAvarage()}`) );
  return messages;
}

function printNameOfObj(student) {
  return (`Найкращий студент - ${student.nameOfObj}`);
}


let student1 = new Student({ name: 'Ivan', surname: 'Ivanov', grades: [4, 5, 5] }, 'student1');
let student2 = new Student({ name: 'Semen', surname: 'Semenov', grades: [3, 5, 5] }, 'student2');
let student3 = new Student({ name: 'Petr', surname: 'Petrov', grades: [4, 3, 5] }, 'student3');

console.log(student1);
console.log(Student.group());
console.log(Student.showAllStudents());
console.log(Student.showBestStudent());
console.log(Student.bestStudent());

}());
