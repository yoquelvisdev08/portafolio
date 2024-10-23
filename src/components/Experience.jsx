import React from 'react';
import { FaBriefcase } from 'react-icons/fa';

const experiences = [
  {
    title: 'Web development',
    company: 'Dentsu',
    period: 'July present',
    description: 'I work on the creation and optimization of websites, using technologies such as HTML, CSS and JavaScript, among other frameworks, focusing on user experience and the performance of web applications.',
  },
 
  {
    title: 'Intern, Technology/Management Systems',
    company: 'Bank BHD',
    period: 'January 2023 - April 2023',
    description: 'During my internship in Technology/Management Systems, I used Oracle SQL to manage enterprise data and created reports and analysis using tools such as Pentaho and BI Publisher, supporting decision making.',
  },
  {
    title: 'SQL database administrator',
    company: 'VICORTIZ',
    period: '2022 - 2023',
    description: 'Reception of clients. Switchboard management. Assistance at the reception desk. File maintenance.',
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
