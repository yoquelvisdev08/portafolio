import React from 'react';
import { FaBriefcase } from 'react-icons/fa';

const experiences = [
  {
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    period: 'Jan 2021 - Present',
    description: 'Developing responsive web applications using React and modern JavaScript.',
  },
  {
    title: 'Web Developer Intern',
    company: 'Digital Creations Co.',
    period: 'Jun 2020 - Dec 2020',
    description: 'Assisted in the development of client websites and learned modern web technologies.',
  },

];

function Experience() {
  return (
    <section className="my-16">
      <h2 className="section-title">Experience 💼</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="card">
            <div className="flex items-center mb-4">
              <FaBriefcase className="text-2xl text-accent mr-4" />
              <h3 className="text-xl font-semibold">{exp.title}</h3>
            </div>
            <p className="text-gray-300 mb-2">{exp.company}</p>
            <p className="text-gray-400 mb-4">{exp.period}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
