/* =====================================================
   LAB 06
   HELPER FUNCTION
===================================================== */

function showMessage(element, type, message) {
  element.className = `alert alert-${type}`;
  element.textContent = message;
}


/* =====================================================
   TASK 1
   INTERACTIVE COURSE PLANNER
===================================================== */

const courseInput =
  document.getElementById("courseInput");

const addCourseBtn =
  document.getElementById("addCourseBtn");

const coursePlannerList =
  document.getElementById("coursePlannerList");

const courseMessage =
  document.getElementById("courseMessage");

const totalCourses =
  document.getElementById("totalCourses");

const completedCourses =
  document.getElementById("completedCourses");

const remainingCourses =
  document.getElementById("remainingCourses");

const clearCoursesBtn =
  document.getElementById("clearCoursesBtn");

const highlightLongestBtn =
  document.getElementById("highlightLongestBtn");


/* ---------- Counter ---------- */

function updateCourseStats() {

  const allCourses =
    coursePlannerList.querySelectorAll(
      ".course-item"
    );

  const completed =
    coursePlannerList.querySelectorAll(
      ".course-item.completed"
    );

  totalCourses.textContent =
    allCourses.length;

  completedCourses.textContent =
    completed.length;

  remainingCourses.textContent =
    allCourses.length -
    completed.length;
}


/* ---------- Add Course ---------- */

function addCourse() {

  const courseName =
    courseInput.value.trim();


  /* Empty check */

  if (courseName === "") {

    courseMessage.className =
      "course-error my-3";

    courseMessage.textContent =
      "Error: Course name cannot be empty.";

    courseInput.focus();

    return;
  }


  /* Duplicate check */

  const existingCourses =
    coursePlannerList.querySelectorAll(
      ".course-name"
    );

  let duplicateFound = false;


  existingCourses.forEach(
    (course) => {

      if (
        course.textContent
          .trim()
          .toLowerCase()
        ===
        courseName.toLowerCase()
      ) {

        duplicateFound = true;
      }

    }
  );


  if (duplicateFound) {

    courseMessage.className =
      "course-error my-3";

    courseMessage.textContent =
      "Error: Course already exists.";

    courseInput.focus();

    return;
  }


  /* Create list item */

  const li =
    document.createElement("li");

  li.classList.add(
    "course-item"
  );


  /* Course name */

  const nameSpan =
    document.createElement("span");

  nameSpan.classList.add(
    "course-name"
  );

  nameSpan.textContent =
    courseName;


  /* Delete button */

  const deleteBtn =
    document.createElement("button");

  deleteBtn.type =
    "button";

  deleteBtn.textContent =
    "Delete";

  deleteBtn.className =
    "btn btn-outline-danger btn-sm delete-course";


  li.appendChild(nameSpan);

  li.appendChild(deleteBtn);

  coursePlannerList.appendChild(li);


  courseMessage.className =
    "course-success my-3";

  courseMessage.textContent =
    `${courseName} added successfully.`;


  courseInput.value = "";

  courseInput.focus();

  updateCourseStats();
}


addCourseBtn.addEventListener(
  "click",
  addCourse
);


/* Press Enter to add */

courseInput.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {

      event.preventDefault();

      addCourse();
    }

  }
);


/* =====================================================
   TASK 1 EVENT DELEGATION
===================================================== */

coursePlannerList.addEventListener(
  "click",
  (event) => {


    /* Delete */

    if (
      event.target.classList.contains(
        "delete-course"
      )
    ) {

      const item =
        event.target.closest(
          ".course-item"
        );


      const courseName =
        item.querySelector(
          ".course-name"
        ).textContent;


      const confirmed =
        confirm(
          `Are you sure you want to delete "${courseName}"?`
        );


      if (!confirmed) {
        return;
      }


      item.remove();

      updateCourseStats();


      courseMessage.className =
        "course-success my-3";

      courseMessage.textContent =
        "Course deleted successfully.";


      return;
    }


    /* Completed toggle */

    if (
      event.target.classList.contains(
        "course-name"
      )
    ) {

      const item =
        event.target.closest(
          ".course-item"
        );


      item.classList.toggle(
        "completed"
      );


      updateCourseStats();
    }

  }
);


/* ---------- Clear All ---------- */

clearCoursesBtn.addEventListener(
  "click",
  () => {

    if (
      coursePlannerList.children.length === 0
    ) {

      courseMessage.className =
        "course-error my-3";

      courseMessage.textContent =
        "Course list is already empty.";

      return;
    }


    const confirmed =
      confirm(
        "Are you sure you want to clear all courses?"
      );


    if (!confirmed) {
      return;
    }


    coursePlannerList.replaceChildren();

    updateCourseStats();


    courseMessage.className =
      "course-success my-3";

    courseMessage.textContent =
      "All courses cleared.";


    courseInput.focus();
  }
);


/* ---------- Highlight Longest ---------- */

highlightLongestBtn.addEventListener(
  "click",
  () => {

    const items =
      coursePlannerList.querySelectorAll(
        ".course-item"
      );


    if (items.length === 0) {

      courseMessage.className =
        "course-error my-3";

      courseMessage.textContent =
        "Add at least one course first.";

      return;
    }


    items.forEach(
      (item) => {

        item.classList.remove(
          "longest-course"
        );

      }
    );


    let longestCourse =
      items[0];


    items.forEach(
      (item) => {

        const currentName =
          item.querySelector(
            ".course-name"
          ).textContent;


        const longestName =
          longestCourse.querySelector(
            ".course-name"
          ).textContent;


        if (
          currentName.length >
          longestName.length
        ) {

          longestCourse =
            item;
        }

      }
    );


    longestCourse.classList.add(
      "longest-course"
    );


    const name =
      longestCourse.querySelector(
        ".course-name"
      ).textContent;


    courseMessage.className =
      "course-success my-3";

    courseMessage.textContent =
      `Longest course: ${name}`;
  }
);


updateCourseStats();



/* =====================================================
   TASK 2
   LIVE STUDENT ID CARD
===================================================== */

const idCardForm =
  document.getElementById("idCardForm");

const idName =
  document.getElementById("idName");

const idRoll =
  document.getElementById("idRoll");

const idDepartment =
  document.getElementById(
    "idDepartment"
  );

const idSemester =
  document.getElementById(
    "idSemester"
  );

const idColor =
  document.getElementById(
    "idColor"
  );

const showCgpa =
  document.getElementById(
    "showCgpa"
  );

const cgpaInputGroup =
  document.getElementById(
    "cgpaInputGroup"
  );

const idCgpa =
  document.getElementById(
    "idCgpa"
  );

const studentIdCard =
  document.getElementById(
    "studentIdCard"
  );

const cardName =
  document.getElementById(
    "cardName"
  );

const cardRoll =
  document.getElementById(
    "cardRoll"
  );

const cardDepartment =
  document.getElementById(
    "cardDepartment"
  );

const cardSemester =
  document.getElementById(
    "cardSemester"
  );

const cardCgpaContainer =
  document.getElementById(
    "cardCgpaContainer"
  );

const cardCgpa =
  document.getElementById(
    "cardCgpa"
  );

const nameCounter =
  document.getElementById(
    "nameCounter"
  );

const downloadSummary =
  document.getElementById(
    "downloadSummary"
  );

const idCardResetBtn =
  document.getElementById(
    "idCardResetBtn"
  );


/* ---------- Update Live Card ---------- */

function updateStudentIdCard() {

  const name =
    idName.value.trim();

  const roll =
    idRoll.value.trim();

  const department =
    idDepartment.value;

  const semester =
    idSemester.value;

  const cgpa =
    idCgpa.value;


  cardName.textContent =
    name || "Your Name";


  cardRoll.textContent =
    roll ||
    "Your Roll Number";


  cardDepartment.textContent =
    department ||
    "Your Department";


  cardSemester.textContent =
    semester ||
    "Your Semester";


  /* Dynamic background */

  studentIdCard.style.backgroundColor =
    idColor.value;


  /* Character counter */

  const charactersLeft =
    idName.maxLength -
    idName.value.length;


  nameCounter.textContent =
    `Characters left: ${charactersLeft}`;


  /* CGPA Badge */

  if (showCgpa.checked) {

    cgpaInputGroup.classList.remove(
      "d-none"
    );

    cardCgpaContainer.classList.remove(
      "d-none"
    );


    cardCgpa.textContent =
      cgpa === ""
        ? "0.00"
        : Number(cgpa).toFixed(2);

  } else {

    cgpaInputGroup.classList.add(
      "d-none"
    );

    cardCgpaContainer.classList.add(
      "d-none"
    );

  }


  /* Download summary */

  const summary =
`Student ID Card
Name: ${name || "Your Name"}
Roll Number: ${roll || "Your Roll Number"}
Department: ${department || "Your Department"}
Semester: ${semester || "Your Semester"}
CGPA: ${
  showCgpa.checked
    ? (
        cgpa === ""
          ? "0.00"
          : Number(cgpa).toFixed(2)
      )
    : "Hidden"
}`;


  downloadSummary.value =
    summary;
}


/* Input Events */

idName.addEventListener(
  "input",
  updateStudentIdCard
);

idRoll.addEventListener(
  "input",
  updateStudentIdCard
);

idSemester.addEventListener(
  "input",
  updateStudentIdCard
);

idCgpa.addEventListener(
  "input",
  updateStudentIdCard
);


/* Change Events */

idDepartment.addEventListener(
  "change",
  updateStudentIdCard
);

idColor.addEventListener(
  "change",
  updateStudentIdCard
);

showCgpa.addEventListener(
  "change",
  updateStudentIdCard
);


/* ---------- RESET WITH CONFIRMATION ---------- */

idCardResetBtn.addEventListener(
  "click",
  () => {

    const confirmed =
      confirm(
        "Are you sure you want to reset the ID card form?"
      );


    if (!confirmed) {
      return;
    }


    idCardForm.reset();

    updateStudentIdCard();

  }
);


updateStudentIdCard();



/* =====================================================
   TASK 3
   COURSE REGISTRATION FORM
===================================================== */

const courseRegistrationForm =
  document.getElementById(
    "courseRegistrationForm"
  );

const regPhone =
  document.getElementById(
    "regPhone"
  );

const regDob =
  document.getElementById(
    "regDob"
  );

const regPassword =
  document.getElementById(
    "regPassword"
  );

const regConfirmPassword =
  document.getElementById(
    "regConfirmPassword"
  );

const showPassword =
  document.getElementById(
    "showPassword"
  );

const phoneLiveMessage =
  document.getElementById(
    "phoneLiveMessage"
  );

const courseRegistrationOutput =
  document.getElementById(
    "courseRegistrationOutput"
  );


/* =====================================================
   PHONE LIVE VALIDATION
===================================================== */

function updatePhoneState() {

  const state =
    regPhone.validity;


  if (state.valueMissing) {

    phoneLiveMessage.textContent =
      "Phone number is required.";

    phoneLiveMessage.className =
      "form-text text-danger";

  } else if (
    state.patternMismatch
  ) {

    phoneLiveMessage.textContent =
      "Phone must look like 03001234567.";

    phoneLiveMessage.className =
      "form-text text-danger";

  } else if (
    state.valid
  ) {

    phoneLiveMessage.textContent =
      "Phone number looks valid.";

    phoneLiveMessage.className =
      "form-text text-success";

  }

}


regPhone.addEventListener(
  "input",
  updatePhoneState
);


/* =====================================================
   PASSWORD MUST CONTAIN DIGIT
===================================================== */

function validatePasswordDigit() {

  const hasDigit =
    /\d/.test(
      regPassword.value
    );


  if (
    regPassword.value !== "" &&
    !hasDigit
  ) {

    regPassword.setCustomValidity(
      "Password must contain a digit."
    );

  } else {

    regPassword.setCustomValidity("");

  }

}


/* =====================================================
   PASSWORD MATCH
===================================================== */

function validatePasswordMatch() {

  if (
    regConfirmPassword.value !==
    regPassword.value
  ) {

    regConfirmPassword.setCustomValidity(
      "Passwords do not match."
    );

  } else {

    regConfirmPassword.setCustomValidity("");

  }

}


/* =====================================================
   AGE CALCULATION
===================================================== */

function calculateAge(dateString) {

  const birthDate =
    new Date(dateString);

  const today =
    new Date();


  let age =
    today.getFullYear() -
    birthDate.getFullYear();


  const monthDifference =
    today.getMonth() -
    birthDate.getMonth();


  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() <
      birthDate.getDate()
    )
  ) {

    age--;

  }


  return age;
}


function validateAge() {

  if (
    regDob.value === ""
  ) {

    regDob.setCustomValidity("");

    return;
  }


  const age =
    calculateAge(
      regDob.value
    );


  if (age < 16) {

    regDob.setCustomValidity(
      "Student must be at least 16 years old."
    );

  } else {

    regDob.setCustomValidity("");

  }

}


/* Validation Events */

regPassword.addEventListener(
  "input",
  () => {

    validatePasswordDigit();

    validatePasswordMatch();

  }
);


regConfirmPassword.addEventListener(
  "input",
  validatePasswordMatch
);


regDob.addEventListener(
  "change",
  validateAge
);


/* =====================================================
   SHOW / HIDE PASSWORD
===================================================== */

showPassword.addEventListener(
  "change",
  () => {

    const type =
      showPassword.checked
        ? "text"
        : "password";


    regPassword.type =
      type;

    regConfirmPassword.type =
      type;

  }
);


/* =====================================================
   TASK 3 SUBMIT
===================================================== */

courseRegistrationForm.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    validatePasswordDigit();

    validatePasswordMatch();

    validateAge();


    /* Bootstrap validation */

    courseRegistrationForm.classList.add(
      "was-validated"
    );


    if (
      !courseRegistrationForm.checkValidity()
    ) {

      courseRegistrationForm.reportValidity();

      return;
    }


    /* Read form using FormData */

    const formData =
      new FormData(
        courseRegistrationForm
      );


    const data =
      Object.fromEntries(
        formData.entries()
      );


    /* Create summary card */

    const card =
      document.createElement(
        "div"
      );

    card.className =
      "summary-card";


    const title =
      document.createElement(
        "h4"
      );

    title.textContent =
      "Registration Successful";


    const name =
      document.createElement(
        "p"
      );

    name.textContent =
      `Name: ${data.fullName}`;


    const email =
      document.createElement(
        "p"
      );

    email.textContent =
      `Email: ${data.email}`;


    const phone =
      document.createElement(
        "p"
      );

    phone.textContent =
      `Phone: ${data.phone}`;


    const course =
      document.createElement(
        "p"
      );

    course.textContent =
      `Course: ${data.course}`;


    card.appendChild(title);

    card.appendChild(name);

    card.appendChild(email);

    card.appendChild(phone);

    card.appendChild(course);


    courseRegistrationOutput.replaceChildren(
      card
    );


    /* ========================================
       ALERT FIRST
       RESET ONLY AFTER USER PRESSES OK
    ======================================== */

    alert(
      "Registration Successful!"
    );


    /* Now reset form */

    courseRegistrationForm.reset();


    courseRegistrationForm.classList.remove(
      "was-validated"
    );


    phoneLiveMessage.textContent =
      "";


    regPassword.type =
      "password";

    regConfirmPassword.type =
      "password";

  }
);



/* =====================================================
   TASK 4
   STUDENT MANAGEMENT DASHBOARD
===================================================== */


/* Initial 6 Students */

const dashboardStudents = [

  {
    name: "Ali Khan",
    rollNumber: "BSCS-001",
    department: "Computer Science",
    semester: 6,
    cgpa: 3.45,
    email: "ali@example.com"
  },

  {
    name: "Sara Ahmed",
    rollNumber: "BSCS-023",
    department: "Software Engineering",
    semester: 5,
    cgpa: 3.80,
    email: "sara@example.com"
  },

  {
    name: "Ayesha Noor",
    rollNumber: "BSCS-014",
    department: "Data Science",
    semester: 4,
    cgpa: 1.90,
    email: "ayesha@example.com"
  },

  {
    name: "Hassan Ali",
    rollNumber: "BSCS-031",
    department: "Computer Science",
    semester: 7,
    cgpa: 2.70,
    email: "hassan@example.com"
  },

  {
    name: "Hamza Khan",
    rollNumber: "BSCS-041",
    department: "Software Engineering",
    semester: 3,
    cgpa: 3.10,
    email: "hamza@example.com"
  },

  {
    name: "Fatima Noor",
    rollNumber: "BSCS-052",
    department: "Data Science",
    semester: 2,
    cgpa: 3.20,
    email: "fatima@example.com"
  }

];


/* DOM Elements */

const dashboardForm =
  document.getElementById(
    "dashboardStudentForm"
  );


const dashboardFields = [

  "dashName",
  "dashRoll",
  "dashEmail",
  "dashDepartment",
  "dashSemester",
  "dashCgpa"

].map(
  (id) =>
    document.getElementById(id)
);


const dashboardStudentList =
  document.querySelector(
    "#dashboardStudentList"
  );


const dashboardSearch =
  document.getElementById(
    "dashboardSearch"
  );


const dashboardDepartmentFilter =
  document.getElementById(
    "dashboardDepartmentFilter"
  );


const sortCgpaBtn =
  document.getElementById(
    "sortCgpaBtn"
  );


const dashboardStats =
  document.getElementById(
    "dashboardStats"
  );


const dashboardMessage =
  document.getElementById(
    "dashboardMessage"
  );


const dashboardResetBtn =
  document.getElementById(
    "dashboardResetBtn"
  );


let dashboardSearchText =
  "";

let dashboardDepartment =
  "";

let sortHighFirst =
  true;


/* =====================================================
   CGPA STATUS
===================================================== */

const getCgpaStatus =
  (cgpa) =>

    cgpa >= 3.00
      ? "Excellent"

      : cgpa >= 2.50
        ? "Good"

        : cgpa >= 2.00
          ? "Satisfactory"

          : "Academic Warning";


function getStatusClass(status) {

  if (
    status === "Excellent"
  ) {

    return "status-excellent";
  }


  if (
    status === "Good"
  ) {

    return "status-good";
  }


  if (
    status === "Satisfactory"
  ) {

    return "status-satisfactory";
  }


  return "status-warning";
}


/* =====================================================
   VALIDATION MESSAGE
===================================================== */

function getDashboardError(field) {

  const state =
    field.validity;


  if (
    state.valueMissing
  ) {

    return "This field is required.";
  }


  if (
    state.typeMismatch
  ) {

    return "Please enter a valid email.";
  }


  if (
    state.patternMismatch
  ) {

    return (
      field.title ||
      "Invalid format."
    );

  }


  if (
    state.tooShort
  ) {

    return (
      "Minimum " +
      field.minLength +
      " characters required."
    );

  }


  if (
    state.rangeUnderflow
  ) {

    return (
      "Minimum value is " +
      field.min +
      "."
    );

  }


  if (
    state.rangeOverflow
  ) {

    return (
      "Maximum value is " +
      field.max +
      "."
    );

  }


  if (
    state.stepMismatch
  ) {

    return "Please enter a valid value.";
  }


  return "";
}


/* =====================================================
   VALIDATE FIELD
===================================================== */

function validateDashboardField(field) {

  /* Remove previous custom error */

  field.setCustomValidity("");


  let message =
    getDashboardError(field);


  /* Unique Roll Number */

  if (
    message === "" &&
    field.id === "dashRoll"
  ) {

    const roll =
      field.value.trim();


    const exists =
      dashboardStudents.some(
        (student) =>
          student.rollNumber
            .toLowerCase()
          ===
          roll.toLowerCase()
      );


    if (exists) {

      message =
        "This roll number is already registered.";


      field.setCustomValidity(
        message
      );

    }

  }


  const errorElement =
    document.getElementById(
      field.id + "Error"
    );


  errorElement.textContent =
    message;


  const valid =
    message === "" &&
    field.checkValidity();


  field.classList.toggle(
    "is-valid",
    valid
  );


  field.classList.toggle(
    "is-invalid",
    !valid
  );


  return valid;
}


/* =====================================================
   VALIDATION EVENTS
===================================================== */

dashboardFields.forEach(
  (field) => {

    /* Blur */

    field.addEventListener(
      "blur",
      () => {

        validateDashboardField(
          field
        );

      }
    );


    /* Input */

    field.addEventListener(
      "input",
      () => {

        if (
          field.classList.contains(
            "is-invalid"
          )
        ) {

          validateDashboardField(
            field
          );

        }

      }
    );


    /* Change */

    field.addEventListener(
      "change",
      () => {

        if (
          field.classList.contains(
            "is-invalid"
          )
        ) {

          validateDashboardField(
            field
          );

        }

      }
    );

  }
);


/* =====================================================
   CLEAR VALIDATION
===================================================== */

function clearDashboardValidation() {

  dashboardFields.forEach(
    (field) => {

      field.classList.remove(
        "is-valid",
        "is-invalid"
      );


      field.setCustomValidity("");


      document.getElementById(
        field.id + "Error"
      ).textContent =
        "";

    }
  );

}


/* =====================================================
   RENDER STUDENTS
===================================================== */

function renderDashboardStudents() {

  dashboardStudentList.replaceChildren();


  /* Search + Filter */

  let visibleStudents =
    dashboardStudents.filter(
      (student) => {

        const text =
          dashboardSearchText
            .toLowerCase();


        const matchesSearch =

          student.name
            .toLowerCase()
            .includes(text)

          ||

          student.rollNumber
            .toLowerCase()
            .includes(text);


        const matchesDepartment =

          dashboardDepartment === ""

          ||

          student.department ===
          dashboardDepartment;


        return (
          matchesSearch &&
          matchesDepartment
        );

      }
    );


  /* Sort copy */

  visibleStudents =
    [...visibleStudents].sort(
      (a, b) =>

        sortHighFirst
          ? b.cgpa - a.cgpa
          : a.cgpa - b.cgpa

    );


  /* No Result */

  if (
    visibleStudents.length === 0
  ) {

    const empty =
      document.createElement(
        "p"
      );


    empty.className =
      "text-muted";


    empty.textContent =
      "No students found.";


    dashboardStudentList.appendChild(
      empty
    );


    return;
  }


  /* Create Cards */

  visibleStudents.forEach(
    (student) => {

      const {
        name,
        rollNumber,
        department,
        semester,
        cgpa,
        email
      } = student;


      const status =
        getCgpaStatus(cgpa);


      const card =
        document.createElement(
          "div"
        );


      card.className =
        "student-dashboard-card";


      /* Student Name */

      const title =
        document.createElement(
          "h4"
        );

      title.textContent =
        name;


      /* Roll */

      const rollLine =
        document.createElement(
          "p"
        );

      rollLine.textContent =
        `Roll No: ${rollNumber}`;


      /* Email */

      const emailLine =
        document.createElement(
          "p"
        );

      emailLine.textContent =
        `Email: ${email}`;


      /* Department */

      const departmentLine =
        document.createElement(
          "p"
        );

      departmentLine.textContent =
        `Department: ${department}`;


      /* Semester */

      const semesterLine =
        document.createElement(
          "p"
        );

      semesterLine.textContent =
        `Semester: ${semester}`;


      /* CGPA */

      const cgpaLine =
        document.createElement(
          "p"
        );

      cgpaLine.textContent =
        `CGPA: ${cgpa.toFixed(2)}`;


      /* Status */

      const statusLine =
        document.createElement(
          "p"
        );


      const statusLabel =
        document.createElement(
          "strong"
        );

      statusLabel.textContent =
        "Status: ";


      const statusValue =
        document.createElement(
          "span"
        );

      statusValue.textContent =
        status;

      statusValue.className =
        getStatusClass(status);


      statusLine.appendChild(
        statusLabel
      );

      statusLine.appendChild(
        statusValue
      );


      /* Buttons */

      const buttonArea =
        document.createElement(
          "div"
        );

      buttonArea.className =
        "dashboard-buttons";


      /* Edit CGPA Button */

      const editButton =
        document.createElement(
          "button"
        );

      editButton.type =
        "button";

      editButton.className =
        "btn btn-warning btn-sm edit-cgpa-btn";

      editButton.dataset.roll =
        rollNumber;

      editButton.textContent =
        "Edit CGPA";


      /* Delete Button */

      const deleteButton =
        document.createElement(
          "button"
        );

      deleteButton.type =
        "button";

      deleteButton.className =
        "btn btn-danger btn-sm delete-student-btn";

      deleteButton.dataset.roll =
        rollNumber;

      deleteButton.textContent =
        "Delete";


      buttonArea.appendChild(
        editButton
      );

      buttonArea.appendChild(
        deleteButton
      );


      /* ========================================
         EDIT CGPA AREA
      ======================================== */

      const editArea =
        document.createElement(
          "div"
        );

      editArea.className =
        "edit-cgpa-area d-none";


      const editLabel =
        document.createElement(
          "label"
        );

      editLabel.className =
        "form-label";

      editLabel.textContent =
        "New CGPA";


      const editInput =
        document.createElement(
          "input"
        );

      editInput.type =
        "number";

      editInput.min =
        "0";

      editInput.max =
        "4";

      editInput.step =
        "0.01";

      editInput.value =
        cgpa;

      editInput.className =
        "form-control mb-2 edit-cgpa-input";


      const editError =
        document.createElement(
          "div"
        );

      editError.className =
        "text-danger small mb-2 edit-cgpa-error";


      /* Save */

      const saveButton =
        document.createElement(
          "button"
        );

      saveButton.type =
        "button";

      saveButton.className =
        "btn btn-success btn-sm me-2 save-cgpa-btn";

      saveButton.dataset.roll =
        rollNumber;

      saveButton.textContent =
        "Save";


      /* Cancel */

      const cancelButton =
        document.createElement(
          "button"
        );

      cancelButton.type =
        "button";

      cancelButton.className =
        "btn btn-secondary btn-sm cancel-cgpa-btn";

      cancelButton.textContent =
        "Cancel";


      editArea.appendChild(
        editLabel
      );

      editArea.appendChild(
        editInput
      );

      editArea.appendChild(
        editError
      );

      editArea.appendChild(
        saveButton
      );

      editArea.appendChild(
        cancelButton
      );


      /* Append everything */

      card.appendChild(
        title
      );

      card.appendChild(
        rollLine
      );

      card.appendChild(
        emailLine
      );

      card.appendChild(
        departmentLine
      );

      card.appendChild(
        semesterLine
      );

      card.appendChild(
        cgpaLine
      );

      card.appendChild(
        statusLine
      );

      card.appendChild(
        buttonArea
      );

      card.appendChild(
        editArea
      );


      dashboardStudentList.appendChild(
        card
      );

    }
  );

}


/* =====================================================
   STATISTICS
===================================================== */

function renderDashboardStats() {

  const total =
    dashboardStudents.length;


  /* Average with reduce */

  const sum =
    dashboardStudents.reduce(
      (result, student) =>
        result + student.cgpa,
      0
    );


  const average =
    total > 0
      ? (
          sum / total
        ).toFixed(2)
      : "0.00";


  /* Highest CGPA */

  let highestStudent =
    null;


  if (total > 0) {

    highestStudent =
      dashboardStudents.reduce(
        (highest, student) =>

          student.cgpa >
          highest.cgpa

            ? student

            : highest
      );

  }


  /* Academic Warning */

  const warningCount =
    dashboardStudents.filter(
      (student) =>
        student.cgpa < 2.0
    ).length;


  dashboardStats.replaceChildren();


  const statistics = [

    {
      label:
        "Total Students",

      value:
        total
    },

    {
      label:
        "Average CGPA",

      value:
        average
    },

    {
      label:
        "Highest CGPA",

      value:
        highestStudent
          ? `${highestStudent.cgpa.toFixed(2)} (${highestStudent.name})`
          : "N/A"
    },

    {
      label:
        "Academic Warning",

      value:
        warningCount
    }

  ];


  statistics.forEach(
    (stat) => {

      const column =
        document.createElement(
          "div"
        );

      column.className =
        "col-md-6 col-lg-3";


      const card =
        document.createElement(
          "div"
        );

      card.className =
        "dashboard-stat";


      const heading =
        document.createElement(
          "h4"
        );

      heading.textContent =
        stat.value;


      const label =
        document.createElement(
          "p"
        );

      label.className =
        "mb-0 text-muted";

      label.textContent =
        stat.label;


      card.appendChild(
        heading
      );

      card.appendChild(
        label
      );

      column.appendChild(
        card
      );

      dashboardStats.appendChild(
        column
      );

    }
  );

}


/* =====================================================
   REFRESH DASHBOARD
===================================================== */

function refreshDashboard() {

  renderDashboardStudents();

  renderDashboardStats();

}


/* =====================================================
   ADD NEW STUDENT
===================================================== */

dashboardForm.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const results =
      dashboardFields.map(
        (field) =>
          validateDashboardField(
            field
          )
      );


    const allValid =
      results.every(
        (result) =>
          result === true
      );


    if (!allValid) {

      showMessage(
        dashboardMessage,
        "danger",
        "Please correct the highlighted fields."
      );


      const firstInvalid =
        dashboardForm.querySelector(
          ".is-invalid"
        );


      if (firstInvalid) {

        firstInvalid.focus();
      }


      return;
    }


    /* Create Student Object */

    const student = {

      name:
        document.getElementById(
          "dashName"
        ).value.trim(),

      rollNumber:
        document.getElementById(
          "dashRoll"
        ).value.trim(),

      email:
        document.getElementById(
          "dashEmail"
        ).value.trim(),

      department:
        document.getElementById(
          "dashDepartment"
        ).value,

      semester:
        Number(
          document.getElementById(
            "dashSemester"
          ).value
        ),

      cgpa:
        Number(
          document.getElementById(
            "dashCgpa"
          ).value
        )

    };


    /* Add to array */

    dashboardStudents.push(
      student
    );


    /* Update Dashboard */

    refreshDashboard();


    /* ========================================
       ALERT COMES FIRST
    ======================================== */

    alert(
      `${student.name} was registered successfully.`
    );


    /* ========================================
       RESET ONLY AFTER OK
    ======================================== */

    dashboardForm.reset();

    clearDashboardValidation();


    /* Page success message */

    showMessage(
      dashboardMessage,
      "success",
      `${student.name} was added successfully.`
    );

  }
);


/* =====================================================
   MANUAL RESET WITH CONFIRM()
===================================================== */

dashboardResetBtn.addEventListener(
  "click",
  () => {

    const confirmed =
      confirm(
        "Are you sure you want to reset the form?"
      );


    /* Cancel */

    if (!confirmed) {

      return;
    }


    /* OK */

    dashboardForm.reset();

    clearDashboardValidation();

    dashboardMessage.className =
      "";

    dashboardMessage.textContent =
      "";

  }
);


/* =====================================================
   SEARCH
===================================================== */

dashboardSearch.addEventListener(
  "input",
  () => {

    dashboardSearchText =
      dashboardSearch.value.trim();


    renderDashboardStudents();

  }
);


/* =====================================================
   DEPARTMENT FILTER
===================================================== */

dashboardDepartmentFilter.addEventListener(
  "change",
  () => {

    dashboardDepartment =
      dashboardDepartmentFilter.value;


    renderDashboardStudents();

  }
);


/* =====================================================
   SORT BY CGPA
===================================================== */

sortCgpaBtn.addEventListener(
  "click",
  () => {

    sortHighFirst =
      !sortHighFirst;


    sortCgpaBtn.textContent =
      sortHighFirst
        ? "Sort CGPA: High → Low"
        : "Sort CGPA: Low → High";


    renderDashboardStudents();

  }
);


/* =====================================================
   EVENT DELEGATION
   DELETE + EDIT CGPA
===================================================== */

dashboardStudentList.addEventListener(
  "click",
  (event) => {


    /* =================================================
       DELETE STUDENT
    ================================================= */

    const deleteButton =
      event.target.closest(
        ".delete-student-btn"
      );


    if (deleteButton) {

      const roll =
        deleteButton.dataset.roll;


      const index =
        dashboardStudents.findIndex(
          (student) =>
            student.rollNumber === roll
        );


      if (index === -1) {

        return;
      }


      const student =
        dashboardStudents[index];


      /* ========================================
         CONFIRM BEFORE DELETING
      ======================================== */

      const confirmed =
        confirm(
          `Are you sure you want to delete ${student.name}?`
        );


      /* Cancel */

      if (!confirmed) {

        return;
      }


      /* Card reference */

      const studentCard =
        deleteButton.closest(
          ".student-dashboard-card"
        );


      /* Delete from Array */

      const removed =
        dashboardStudents.splice(
          index,
          1
        )[0];


      /* Remove element from DOM */

      if (studentCard) {

        studentCard.remove();

      }


      /* Refresh stats + cards */

      refreshDashboard();


      /* Page Message */

      showMessage(
        dashboardMessage,
        "warning",
        `${removed.name} was deleted successfully.`
      );


      return;
    }


    /* =================================================
       SHOW EDIT CGPA FORM
    ================================================= */

    const editButton =
      event.target.closest(
        ".edit-cgpa-btn"
      );


    if (editButton) {

      const card =
        editButton.closest(
          ".student-dashboard-card"
        );


      const editArea =
        card.querySelector(
          ".edit-cgpa-area"
        );


      editArea.classList.toggle(
        "d-none"
      );


      return;
    }


    /* =================================================
       CANCEL CGPA EDIT
    ================================================= */

    const cancelButton =
      event.target.closest(
        ".cancel-cgpa-btn"
      );


    if (cancelButton) {

      const card =
        cancelButton.closest(
          ".student-dashboard-card"
        );


      const editArea =
        card.querySelector(
          ".edit-cgpa-area"
        );


      editArea.classList.add(
        "d-none"
      );


      return;
    }


    /* =================================================
       SAVE CGPA
    ================================================= */

    const saveButton =
      event.target.closest(
        ".save-cgpa-btn"
      );


    if (saveButton) {

      const card =
        saveButton.closest(
          ".student-dashboard-card"
        );


      const input =
        card.querySelector(
          ".edit-cgpa-input"
        );


      const error =
        card.querySelector(
          ".edit-cgpa-error"
        );


      const newCgpa =
        Number(
          input.value
        );


      /* Validate */

      if (
        input.value === "" ||
        Number.isNaN(newCgpa) ||
        newCgpa < 0 ||
        newCgpa > 4
      ) {

        error.textContent =
          "CGPA must be between 0 and 4.";

        return;
      }


      const roll =
        saveButton.dataset.roll;


      const index =
        dashboardStudents.findIndex(
          (student) =>
            student.rollNumber === roll
        );


      if (
        index !== -1
      ) {

        dashboardStudents[index].cgpa =
          newCgpa;


        refreshDashboard();


        showMessage(
          dashboardMessage,
          "success",
          "CGPA updated successfully."
        );

      }

    }

  }
);


/* =====================================================
   INITIAL DASHBOARD
===================================================== */

refreshDashboard();