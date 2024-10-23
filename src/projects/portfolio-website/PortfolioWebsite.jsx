import React, { useState } from 'react';
import Calculator from '../calculator/Calculator';
import ECommerce from '../e-commerce/ECommerce';
import QuizApp from '../quiz-app/QuizApp';
import TodoApp from '../todo-app/TodoApp';
import WeatherDashboard from '../weather-dashboard/WeatherDashboard';

const PortfolioWebsite = () => {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    { name: 'Calculator', component: Calculator },
    { name: 'E-Commerce', component: ECommerce },
    { name: 'Quiz App', component: QuizApp },
    { name: 'Todo App', component: TodoApp },
    { name: 'Weather Dashboard', component: WeatherDashboard },
  ];

  return (
    <div className="portfolio-website p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">My Portfolio</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {projects.map((project, index) => (
          <button
            key={index}
            onClick={() => setActiveProject(project.name)}
            className={`px-4 py-2 rounded ${
              activeProject === project.name
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500 hover:bg-blue-100'
            }`}
          >
            {project.name}
          </button>
        ))}
      </div>
      <div className="max-w-4xl mx-auto">
        {activeProject && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{activeProject}</h2>
            {projects.find(p => p.name === activeProject)?.component()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioWebsite;
