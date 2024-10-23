import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function About() {
  return (
    <section className="my-16">
      <h2 className="section-title">About Me 👨‍💻</h2>
      <div className="card">
        <p className="mb-4">
          Hello! I'm Yoquelvis Jorge Abreu, a passionate web developer with a love for creating beautiful and functional websites. 🚀
        </p>
        <p className="mb-4">
          I specialize in front-end development, with expertise in React, JavaScript, and modern CSS frameworks like Tailwind. 💻
        </p>
        <p className="mb-4">
          When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee. ☕
        </p>
        
      </div>
    </section>
  );
}

export default About;
