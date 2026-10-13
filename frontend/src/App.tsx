import { useState } from "react";
import "./App.css";

type Course = {
  id: number;
  title: string;
  category: string;
  description: string;
  level: string;
  duration: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "AWS Cloud Fundamentals",
    category: "Cloud Computing",
    description: "Learn cloud computing, AWS services and cloud infrastructure.",
    level: "Beginner",
    duration: "4 weeks",
  },
  {
    id: 2,
    title: "Docker & Containers",
    category: "DevOps",
    description: "Understand Docker images, containers and container workflows.",
    level: "Beginner",
    duration: "3 weeks",
  },
  {
    id: 3,
    title: "Kubernetes Essentials",
    category: "DevOps",
    description: "Explore pods, deployments, services and container orchestration.",
    level: "Intermediate",
    duration: "5 weeks",
  },
  {
    id: 4,
    title: "Java Spring Boot",
    category: "Development",
    description: "Build backend APIs using Java and Spring Boot.",
    level: "Intermediate",
    duration: "6 weeks",
  },
  {
    id: 5,
    title: "Terraform & AWS",
    category: "Infrastructure",
    description: "Learn infrastructure as code and cloud resource automation.",
    level: "Intermediate",
    duration: "4 weeks",
  },
  {
    id: 6,
    title: "CI/CD with Jenkins",
    category: "DevOps",
    description: "Learn how automated build and deployment pipelines work.",
    level: "Beginner",
    duration: "3 weeks",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [enrolled, setEnrolled] = useState<number[]>([]);

  const categories = [
    "All",
    ...new Set(courses.map((course) => course.category)),
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || course.category === category;

    return matchesSearch && matchesCategory;
  });

  function enroll(courseId: number) {
    setEnrolled((previous) =>
      previous.includes(courseId)
        ? previous
        : [...previous, courseId]
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#">
          <span className="brand-icon">C</span>
          CloudBlitz
        </a>

        <nav>
          <a href="#courses">Explore Courses</a>
          <a href="#about">About</a>
        </nav>

        <a className="nav-button" href="#courses">
          Start Learning
        </a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">YOUR LEARNING JOURNEY STARTS HERE</span>

            <h1>
              Build skills.
              <br />
              <span>Build your future.</span>
            </h1>

            <p>
              Learn Cloud Computing, DevOps and Software Development
              with courses designed to help you grow.
            </p>

            <a className="primary-button" href="#courses">
              Explore Courses →
            </a>

            <div className="hero-stats">
              <div>
                <strong>{courses.length}+</strong>
                <span>Learning Courses</span>
              </div>
              <div>
                <strong>3</strong>
                <span>Learning Categories</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Learn at Your Pace</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="card-top">
              <span>YOUR NEXT SKILL</span>
              <span className="status-dot">●</span>
            </div>

            <div className="learning-icon">☁️</div>
            <h2>Cloud & DevOps</h2>
            <p>Turn your curiosity into practical skills.</p>

            <div className="progress-label">
              <span>Learning journey</span>
              <span>Ready to start</span>
            </div>

            <div className="progress-bar">
              <div />
            </div>
          </div>
        </section>

        <section className="courses-section" id="courses">
          <div className="section-heading">
            <div>
              <span className="eyebrow">LEARN SOMETHING NEW</span>
              <h2>Explore our courses</h2>
              <p>Choose a course and start building your skills.</p>
            </div>

            <span className="course-count">
              {filteredCourses.length} courses available
            </span>
          </div>

          <input
            className="search-input"
            type="search"
            placeholder="Search courses..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "category active" : "category"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="course-grid">
            {filteredCourses.map((course) => {
              const isEnrolled = enrolled.includes(course.id);

              return (
                <article className="course-card" key={course.id}>
                  <div className="course-card-top">
                    <span className="course-category">{course.category}</span>
                    <span className="course-symbol">
                      {course.id === 1
                        ? "☁️"
                        : course.id === 2
                          ? "🐳"
                          : course.id === 3
                            ? "☸️"
                            : course.id === 4
                              ? "☕"
                              : course.id === 5
                                ? "🏗️"
                                : "⚙️"}
                    </span>
                  </div>

                  <h3>{course.title}</h3>
                  <p>{course.description}</p>

                  <div className="course-meta">
                    <span>{course.level}</span>
                    <span>{course.duration}</span>
                  </div>

                  <button
                    className={isEnrolled ? "enroll-button enrolled" : "enroll-button"}
                    onClick={() => enroll(course.id)}
                    disabled={isEnrolled}
                  >
                    {isEnrolled ? "✓ Enrolled" : "Enroll Now →"}
                  </button>
                </article>
              );
            })}
          </div>

          {filteredCourses.length === 0 && (
            <p className="empty-state">
              No courses found. Try another search.
            </p>
          )}
        </section>

        <section className="about-section" id="about">
          <span className="eyebrow">ABOUT CLOUDBLITZ</span>
          <h2>Your next opportunity starts with learning.</h2>
          <p>
            CloudBlitz is a learning platform project built to explore
            modern frontend development, backend APIs and DevOps practices.
          </p>
        </section>
      </main>

      <footer>
        <a className="brand" href="#">
          <span className="brand-icon">C</span>
          CloudBlitz
        </a>
        <p>Learn today. Build tomorrow.</p>
      </footer>
    </div>
  );
}

export default App;