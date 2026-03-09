async function loadCourses() {
  try {
    const response = await fetch("/api/courses");
    const courses = await response.json();

    const coursesDiv = document.getElementById("courses");

    coursesDiv.innerHTML = courses
      .map(
        (course) => `
          <div>
            <h3>${course.courseCode}: ${course.title}</h3>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Campus:</strong> ${course.campus}</p>
            <p><strong>Category:</strong> ${course.category}</p>
          </div>
          <hr>
        `
      )
      .join("");
  } catch (error) {
    console.log("Error loading courses:", error);
    document.getElementById("courses").innerHTML = "<p>Could not load courses.</p>";
  }
}

loadWeather();
loadCourses();

async function loadWeather() {
  try {
    const response = await fetch("/api/weather");
    const weather = await response.json();

    const weatherDiv = document.getElementById("weather");

    if (weather.error) {
      weatherDiv.innerHTML = `<p>${weather.error}</p>`;
      return;
    }

    weatherDiv.innerHTML = `
      <p><strong>City:</strong> ${weather.city}</p>
      <p><strong>Temperature:</strong> ${weather.temperature} °F</p>
      <p><strong>Condition:</strong> ${weather.description}</p>
      <p><strong>Humidity:</strong> ${weather.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${weather.windSpeed} mph</p>
    `;
  } catch (error) {
    console.log("Error loading weather:", error);
    document.getElementById("weather").innerHTML = "<p>Could not load weather data.</p>";
  }
}