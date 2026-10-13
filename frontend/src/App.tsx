 import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import "./App.css";

type ApiCourse = {
  id: number;
  name: string;
  category: string;
};

type Course = ApiCourse & {
  description: string;
  level: string;
  duration: string;
};

type Enrollment = {
  id: number;
  name: string;
  email: string;
  course: string;
  status: string;
};

const API_URL = "http://localhost:8080/api";

const courseDetails: Record<
  number,
  { description: string; level: string; duration: string }
> = {
  1: {
    description:
      "Learn AWS cloud services, infrastructure and cloud computing fundamentals.",
    level: "Beginner",
    duration: "4 weeks",
  },
  2: {
    description:
      "Learn Docker images, containers and container management.",
    level: "Beginner",
    duration: "3 weeks",
  },
  3: {
    description:
      "Understand Kubernetes pods, deployments and services.",
    level: "Intermediate",
    duration: "5 weeks",
  },
  4: {
    description:
      "Automate cloud infrastructure using Terraform and AWS.",
    level: "Intermediate",
    duration: "4 weeks",
  },
  5: {
    description:
      "Build automated CI/CD pipelines using Jenkins.",
    level: "Beginner",
    duration: "3 weeks",
  },
};

const fallbackCourses: Course[] = [
  {
    id: 1,
    name: "AWS Cloud Fundamentals",
    category: "Cloud",
    ...courseDetails[1],
  },
  {
    id: 2,
    name: "Docker & Containers",
    category: "DevOps",
    ...courseDetails[2],
  },
  {
    id: 3,
    name: "Kubernetes Essentials",
    category: "DevOps",
    ...courseDetails[3],
  },
  {
    id: 4,
    name: "Terraform & AWS",
    category: "Cloud",
    ...courseDetails[4],
  },
  {
    id: 5,
    name: "CI/CD with Jenkins",
    category: "DevOps",
    ...courseDetails[5],
  },
];

function App() {
  const [courses, setCourses] = useState<Course[]>(fallbackCourses);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [enrolled, setEnrolled] = useState<number[]>([]);
  const [apiStatus, setApiStatus] = useState(
    "Connecting to backend..."
  );

  const [selectedCourse, setSelectedCourse] =
    useState<Course | null>(null);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [enrollmentMessage, setEnrollmentMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/courses`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load courses");
        }

        return response.json() as Promise<ApiCourse[]>;
      })
      .then((data) => {
        const mappedCourses: Course[] = data.map((item) => ({
          ...item,
          ...(courseDetails[item.id] ?? {
            description:
              "Explore this course and develop practical skills.",
            level: "Beginner",
            duration: "4 weeks",
          }),
        }));

        setCourses(mappedCourses);
        setApiStatus("Connected to Java Spring Boot");
      })
      .catch(() => {
        setApiStatus(
          "Backend unavailable — showing demo courses"
        );
      });
  }, []);

  const categories = [
    "All",
    ...Array.from(
      new Set(courses.map((course) => course.category))
    ),
  ];

  const filteredCourses = courses.filter((course) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      course.name.toLowerCase().includes(searchText) ||
      course.category.toLowerCase().includes(searchText) ||
      course.description.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || course.category === category;

    return matchesSearch && matchesCategory;
  });

  function handleEnroll(course: Course) {
    setSelectedCourse(course);
    setStudentName("");
    setStudentEmail("");
    setEnrollmentMessage("");
  }

  async function submitEnrollment(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!selectedCourse) {
      return;
    }

    setIsSubmitting(true);
    setEnrollmentMessage("");

    try {
      const response = await fetch(`${API_URL}/enrollments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: studentName.trim(),
          email: studentEmail.trim(),
          course: selectedCourse.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Enrollment request failed");
      }

      const data: Enrollment = await response.json();

      setEnrollments((previous) => [...previous, data]);

      setEnrolled((previous) =>
        previous.includes(selectedCourse.id)
          ? previous
          : [...previous, selectedCourse.id]
      );

      setEnrollmentMessage(
        `Successfully enrolled in ${data.course}! Your Enrollment ID is ${data.id}.`
      );

      setSelectedCourse(null);
      setStudentName("");
      setStudentEmail("");
    } catch {
      setEnrollmentMessage(
        "Enrollment failed. Please check that the backend is running and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <a href="#home" className="logo">
          Cloud<span>Blitz</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#courses">Courses</a>
          <a href="#about">About</a>
        </div>

        <a className="nav-button" href="#courses">
          Explore Courses
        </a>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">YOUR FUTURE STARTS HERE</p>

            <h1>
              Learn Skills.
              <br />
              Build Your <span>Future.</span>
            </h1>

            <p className="hero-description">
              Master cloud computing, DevOps and software development
              with practical courses designed to help you grow your
              career.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#courses">
                Explore Courses →
              </a>

              <a className="secondary-button" href="#about">
                Learn More
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>{courses.length}+</strong>
                <span>Courses</span>
              </div>

              <div>
                <strong>{categories.length - 1}</strong>
                <span>Categories</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Career Focused</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-icon">☁️</div>
            <h2>Build. Deploy. Grow.</h2>
            <p>
              Your journey into cloud and DevOps begins here.
            </p>

            <div className="technology-list">
              <span>AWS</span>
              <span>Docker</span>
              <span>Kubernetes</span>
              <span>Terraform</span>
              <span>Jenkins</span>
            </div>
          </div>
        </section>

        <section className="courses-section" id="courses">
          <div className="section-heading">
            <p className="eyebrow">START LEARNING TODAY</p>
            <h2>Explore Our Courses</h2>
            <p>
              Discover practical learning paths for cloud, DevOps and
              modern infrastructure.
            </p>
          </div>

          <p className="api-status">
            <span className="status-dot"></span>
            {apiStatus}
          </p>

          <div className="course-controls">
            <input
              type="search"
              placeholder="Search courses..."
              aria-label="Search courses"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <div className="category-filters">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={
                    category === item ? "filter active" : "filter"
                  }
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {selectedCourse && (
            <div className="enrollment-form-container">
              <h3>Enroll in {selectedCourse.name}</h3>

              <form onSubmit={submitEnrollment}>
                <label htmlFor="student-name">Full Name</label>

                <input
                  id="student-name"
                  type="text"
                  value={studentName}
                  onChange={(event) =>
                    setStudentName(event.target.value)
                  }
                  placeholder="Enter your full name"
                  required
                />

                <label htmlFor="student-email">
                  Email Address
                </label>

                <input
                  id="student-email"
                  type="email"
                  value={studentEmail}
                  onChange={(event) =>
                    setStudentEmail(event.target.value)
                  }
                  placeholder="Enter your email"
                  required
                />

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Submitting..."
                    : "Confirm Enrollment"}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          {enrollmentMessage && (
            <p role="status" aria-live="polite">
              {enrollmentMessage}
            </p>
          )}

          <div className="course-grid">
            {filteredCourses.map((course) => (
              <article className="course-card" key={course.id}>
                <div className="course-card-top">
                  <span className="course-category">
                    {course.category}
                  </span>

                  <span className="course-icon">
                    {course.id === 1
                      ? "☁️"
                      : course.id === 2
                        ? "🐳"
                        : course.id === 3
                          ? "⚙️"
                          : course.id === 4
                            ? "🏗️"
                            : "🔄"}
                  </span>
                </div>

                <h3>{course.name}</h3>

                <p className="course-description">
                  {course.description}
                </p>

                <div className="course-meta">
                  <span>📊 {course.level}</span>
                  <span>🕒 {course.duration}</span>
                </div>

                <button
                  type="button"
                  className={
                    enrolled.includes(course.id)
                      ? "enroll-button enrolled"
                      : "enroll-button"
                  }
                  onClick={() => {
  console.log("Enroll button clicked:", course.name);
  handleEnroll(course);
}}
                >
                  {enrolled.includes(course.id)
                    ? "Enroll Again →"
                    : "Enroll Now →"}
                </button>
              </article>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="empty-state">
              <h3>No courses found</h3>
              <p>Try another search term or category.</p>
            </div>
          )}

          {enrollments.length > 0 && (
            <div className="enrollment-summary">
              <h3>Your Enrollments This Session</h3>

              {enrollments.map((item) => (
                <p key={item.id}>
                  {item.name} — {item.course} — {item.status}
                  {" (ID: "}
                  {item.id}
                  {")"}
                </p>
              ))}
            </div>
          )}
        </section>

        <section className="about-section" id="about">
          <p className="eyebrow">ABOUT CLOUDBLITZ</p>
          <h2>Learn Today. Lead Tomorrow.</h2>

          <p>
            CloudBlitz helps learners develop practical skills in cloud
            computing, DevOps tools and modern software development.
            Learn the fundamentals and build your technical career.
          </p>

          <a className="primary-button" href="#courses">
            Start Learning →
          </a>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">
          Cloud<span>Blitz</span>
        </a>

        <p>Learn. Build. Deploy. Grow.</p>

        <p>
          © {new Date().getFullYear()} CloudBlitz Learning Platform
        </p>
      </footer>
    </div>
  );
}

export default App;