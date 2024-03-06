document.addEventListener("DOMContentLoaded", function () {
  const scheduleData = JSON.parse(localStorage.getItem("scheduleData")) || [
    {
      id: 1,
      name: "Йога",
      time: "10:00 - 11:00",
      maxParticipants: 15,
      currentParticipants: 8,
    },
    {
      id: 2,
      name: "Пилатес",
      time: "11:30 - 12:30",
      maxParticipants: 10,
      currentParticipants: 5,
    },
    {
      id: 3,
      name: "Кроссфит",
      time: "13:00 - 14:00",
      maxParticipants: 20,
      currentParticipants: 15,
    },
    {
      id: 4,
      name: "Танцы",
      time: "14:30 - 15:30",
      maxParticipants: 12,
      currentParticipants: 10,
    },
    {
      id: 5,
      name: "Бокс",
      time: "16:00 - 17:00",
      maxParticipants: 8,
      currentParticipants: 6,
    },
  ];

  function renderSchedule() {
    const scheduleBody = document.getElementById("schedule-body");
    scheduleBody.innerHTML = "";

    scheduleData.forEach((course) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.time}</td>
                <td>${course.maxParticipants}</td>
                <td>${course.currentParticipants}</td>
                <td>
                    <button class="btn ${
                      course.currentParticipants >= course.maxParticipants
                        ? "inactive"
                        : ""
                    }"
                        onclick="enroll(${course.id})" ${
        course.currentParticipants >= course.maxParticipants ? "disabled" : ""
      }>
                        Записаться
                    </button>
                    <button class="btn ${
                      course.currentParticipants === 0 ? "inactive" : ""
                    }"
                        onclick="cancelEnrollment(${course.id})" ${
        course.currentParticipants === 0 ? "disabled" : ""
      }>
                        Отменить запись
                    </button>
                </td>
            `;
      scheduleBody.appendChild(row);
    });
  }

  function updateLocalStorage() {
    localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
  }

  window.enroll = function (courseId) {
    const course = scheduleData.find((course) => course.id === courseId);
    if (course && course.currentParticipants < course.maxParticipants) {
      course.currentParticipants++;
      updateLocalStorage();
      renderSchedule();
    }
  };

  window.cancelEnrollment = function (courseId) {
    const course = scheduleData.find((course) => course.id === courseId);
    if (course && course.currentParticipants > 0) {
      course.currentParticipants--;
      updateLocalStorage();
      renderSchedule();
    }
  };

  renderSchedule();
});
