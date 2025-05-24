import React from 'react';
import html2pdf from 'html2pdf.js';

const GenerateCV = () => {
  const downloadCV = () => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 40px; font-family: 'Inter', sans-serif; max-width: 800px; margin: 0 auto; color: #1a202c; background-color: #ffffff;">
        <!-- Primera página -->
        <div style="page-break-after: always;">
          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 30px;">
            <div>
              <h1 style="font-size: 32px; color: #1a365d; margin: 0; font-weight: 800;">YOQUELVIS JORGE ABREU</h1>
              <h2 style="font-size: 20px; color: #2b6cb0; margin: 8px 0 0 0; font-weight: 600;">Software Developer</h2>
            </div>
            <div style="text-align: right;">
              <p style="margin: 0 0 6px 0; font-size: 14px;">
                <a href="mailto:yoquelvis18@gmail.com" style="color: #2b6cb0; text-decoration: none; font-weight: 500;">
                  📧 yoquelvis18@gmail.com
                </a>
              </p>
              <p style="margin: 0 0 6px 0; font-size: 14px;">📱 (829) 422-3313</p>
              <p style="margin: 0; font-size: 14px;">
                <a href="https://yoquelvis.dev" target="_blank" style="color: #2b6cb0; text-decoration: none; font-weight: 500;">
                  🌐 yoquelvis.dev
                </a>
              </p>
            </div>
          </div>

          <!-- Professional Summary -->
          <div style="margin-bottom: 35px;">
            <h3 style="color: #1a365d; font-size: 20px; margin: 0 0 15px 0; font-weight: 700; border-bottom: 2px solid #2b6cb0; padding-bottom: 8px;">
              PROFESSIONAL SUMMARY
            </h3>
            <p style="margin: 0; line-height: 1.6; color: #2d3748; font-size: 14px;">
              Dedicated Software Developer with experience in web development and database management. 
              Proven track record in creating and optimizing websites with a focus on user experience and application performance. 
              Strong technical skills combined with excellent problem-solving abilities.
            </p>
          </div>

          <!-- Education -->
          <div>
            <h3 style="color: #1a365d; font-size: 20px; margin: 0 0 20px 0; font-weight: 700; border-bottom: 2px solid #2b6cb0; padding-bottom: 8px;">
              EDUCATION
            </h3>
            <div style="display: grid; gap: 18px;">
              <!-- Software Engineering -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <h4 style="margin: 0; font-weight: 700; color: #2b6cb0; font-size: 15px;">SOFTWARE ENGINEERING</h4>
                  <span style="color: #4a5568; font-weight: 500; font-size: 14px;">2023 - PRESENT</span>
                </div>
                <h5 style="margin: 0; color: #1a365d; font-weight: 600; font-size: 14px;">APEC UNIVERSITY</h5>
              </div>

              <!-- Software Development Technologist -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <h4 style="margin: 0; font-weight: 700; color: #2b6cb0; font-size: 15px;">SOFTWARE DEVELOPMENT TECHNOLOGIST</h4>
                  <span style="color: #4a5568; font-weight: 500; font-size: 14px;">2021 - 2023</span>
                </div>
                <h5 style="margin: 0; color: #1a365d; font-weight: 600; font-size: 14px;">Instituto Tecnológico de las Américas (ITLA)</h5>
              </div>

              <!-- DevOps & Microservices -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <h4 style="margin: 0; font-weight: 700; color: #2b6cb0; font-size: 15px;">FUNDAMENTALS IN DEVOPS & MICROSERVICES</h4>
                  <span style="color: #4a5568; font-weight: 500; font-size: 14px;">2024</span>
                </div>
                <h5 style="margin: 0; color: #1a365d; font-weight: 600; font-size: 14px;">Udemy</h5>
              </div>

              <!-- Software Testing -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <h4 style="margin: 0; font-weight: 700; color: #2b6cb0; font-size: 15px;">SOFTWARE TESTING</h4>
                  <span style="color: #4a5568; font-weight: 500; font-size: 14px;">2023</span>
                </div>
                <h5 style="margin: 0; color: #1a365d; font-weight: 600; font-size: 14px;">Udemy</h5>
              </div>

              <!-- Ethical Hacking -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <h4 style="margin: 0; font-weight: 700; color: #2b6cb0; font-size: 15px;">ETHICAL HACKING</h4>
                  <span style="color: #4a5568; font-weight: 500; font-size: 14px;">2022</span>
                </div>
                <h5 style="margin: 0; color: #1a365d; font-weight: 600; font-size: 14px;">Instituto Tecnológico de las Américas (ITLA)</h5>
              </div>

              <!-- Big Data -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <h4 style="margin: 0; font-weight: 700; color: #2b6cb0; font-size: 15px;">BIG DATA</h4>
                  <span style="color: #4a5568; font-weight: 500; font-size: 14px;">2021</span>
                </div>
                <h5 style="margin: 0; color: #1a365d; font-weight: 600; font-size: 14px;">Pontificia Universidad Católica Madre y Maestra (PUCMM)</h5>
              </div>

              <!-- Git & Linux -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <h4 style="margin: 0; font-weight: 700; color: #2b6cb0; font-size: 15px;">GIT & LINUX MANAGEMENT</h4>
                  <span style="color: #4a5568; font-weight: 500; font-size: 14px;">2021</span>
                </div>
                <h5 style="margin: 0; color: #1a365d; font-weight: 600; font-size: 14px;">Máster Mind</h5>
              </div>
            </div>
          </div>
        </div>

        <!-- Segunda página: Professional Experience -->
        <div style="page-break-after: always;">
          <h3 style="color: #1a365d; font-size: 22px; margin-top: 0; margin-bottom: 20px; font-weight: 700; border-bottom: 2px solid #2b6cb0; padding-bottom: 8px;">
            PROFESSIONAL EXPERIENCE
          </h3>
          
          <!-- Dentsu -->
          <div style="margin-bottom: 25px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <h4 style="margin: 0; font-weight: 700; color: #2b6cb0; font-size: 18px; page-break-after: avoid;">Web Developer</h4>
              <span style="color: #4a5568; font-weight: 500;">July 2023 - Present</span>
            </div>
            <h5 style="margin: 0 0 10px 0; color: #1a365d; font-weight: 600; font-size: 16px;">Dentsu</h5>
            <ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.7;">
              <li>Develop and optimize websites using modern technologies including HTML, CSS, and JavaScript frameworks</li>
              <li>Focus on delivering exceptional user experiences and optimizing web application performance</li>
              <li>Collaborate with cross-functional teams to implement new features and improvements</li>
            </ul>
          </div>

          <!-- Bank BHD -->
          <div style="margin-bottom: 25px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <h4 style="margin: 0; font-weight: 700; color: #2b6cb0; font-size: 18px; page-break-after: avoid;">Technology Systems Intern</h4>
              <span style="color: #4a5568; font-weight: 500;">January 2023 - April 2023</span>
            </div>
            <h5 style="margin: 0 0 10px 0; color: #1a365d; font-weight: 600; font-size: 16px;">Bank BHD</h5>
            <ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.7;">
              <li>Managed enterprise data using Oracle SQL</li>
              <li>Created reports and analysis using Pentaho and BI Publisher</li>
              <li>Supported decision-making processes through data analysis and reporting</li>
            </ul>
          </div>

          <!-- VICORTIZ -->
          <div style="margin-bottom: 25px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <h4 style="margin: 0; font-weight: 700; color: #2b6cb0; font-size: 18px; page-break-after: avoid;">SQL Database Administrator</h4>
              <span style="color: #4a5568; font-weight: 500;">2022 - 2023</span>
            </div>
            <h5 style="margin: 0 0 10px 0; color: #1a365d; font-weight: 600; font-size: 16px;">VICORTIZ</h5>
            <ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.7;">
              <li>Managed database operations and maintenance</li>
              <li>Handled client communications and support</li>
              <li>Maintained system files and documentation</li>
            </ul>
          </div>
        </div>

        <!-- Tercera página: Technical Skills y Online Presence -->
        <div>
          <!-- Technical Skills -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #1a365d; font-size: 22px; margin-top: 0; margin-bottom: 20px; font-weight: 700; border-bottom: 2px solid #2b6cb0; padding-bottom: 8px;">
              TECHNICAL SKILLS
            </h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px;">
              <div style="padding: 15px;">
                <h4 style="margin: 0 0 12px 0; color: #2b6cb0; font-weight: 700; font-size: 16px; display: flex; align-items: center; gap: 8px;">
                  <span>⚛️</span> Frontend Development
                </h4>
                <ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.7;">
                  <li>React.js & Next.js</li>
                  <li>TypeScript & JavaScript (ES6+)</li>
                  <li>HTML5 & CSS3</li>
                  <li>Tailwind CSS & Material-UI</li>
                  <li>Redux & Context API</li>
                  <li>Responsive Design</li>
                  <li>Web Accessibility (WCAG)</li>
                </ul>
              </div>
              <div style="padding: 15px;">
                <h4 style="margin: 0 0 12px 0; color: #2b6cb0; font-weight: 700; font-size: 16px; display: flex; align-items: center; gap: 8px;">
                  <span>🔧</span> Backend Development
                </h4>
                <ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.7;">
                  <li>Node.js & Express.js</li>
                  <li>Python & Django</li>
                  <li>RESTful APIs</li>
                  <li>GraphQL</li>
                  <li>Microservices Architecture</li>
                  <li>API Documentation</li>
                </ul>
              </div>
              <div style="padding: 15px;">
                <h4 style="margin: 0 0 12px 0; color: #2b6cb0; font-weight: 700; font-size: 16px; display: flex; align-items: center; gap: 8px;">
                  <span>🗄️</span> Databases & Tools
                </h4>
                <ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.7;">
                  <li>SQL & Oracle</li>
                  <li>MongoDB & PostgreSQL</li>
                  <li>Redis & Elasticsearch</li>
                  <li>Git & GitHub</li>
                  <li>Docker & Kubernetes</li>
                  <li>AWS & Azure Cloud</li>
                </ul>
              </div>
              <div style="padding: 15px;">
                <h4 style="margin: 0 0 12px 0; color: #2b6cb0; font-weight: 700; font-size: 16px; display: flex; align-items: center; gap: 8px;">
                  <span>🛠️</span> Development Tools
                </h4>
                <ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.7;">
                  <li>VS Code & WebStorm</li>
                  <li>Jira & Confluence</li>
                  <li>Postman & Swagger</li>
                  <li>Jest & React Testing Library</li>
                  <li>CI/CD (Jenkins, GitHub Actions)</li>
                  <li>Agile & Scrum Methodologies</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Online Presence -->
          <div>
            <h3 style="color: #1a365d; font-size: 22px; margin-bottom: 15px; font-weight: 700; border-bottom: 2px solid #2b6cb0; padding-bottom: 8px;">
              ONLINE PRESENCE
            </h3>
            <div style="display: flex; gap: 30px; justify-content: start;">
              <p style="margin: 0; color: #4a5568; font-size: 15px;">
                <span style="font-weight: 600; color: #2b6cb0;">LinkedIn:</span> 
                <a href="https://linkedin.com/in/yoquelvis-jorge-abreu-5ba2a4234" target="_blank" style="color: #4a5568; text-decoration: none;">linkedin.com/in/yoquelvis-jorge-abreu-5ba2a4234</a>
              </p>
              <p style="margin: 0; color: #4a5568; font-size: 15px;">
                <span style="font-weight: 600; color: #2b6cb0;">GitHub:</span> 
                <a href="https://github.com/yoquelvisdev08" target="_blank" style="color: #4a5568; text-decoration: none;">github.com/yoquelvisdev08</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    const opt = {
      margin: [0.4, 0.4],
      filename: 'YoquelvisJorgeAbreu_CV.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait'
      },
      pagebreak: { 
        mode: ['css', 'legacy'],
        before: '.page-break-before',
        after: '.page-break-after',
        avoid: ['tr', 'td', 'div:not(.page-break-after)']
      }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <button
      onClick={downloadCV}
      className="btn-primary text-xl py-3 px-8 rounded-full hover-lift flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors"
    >
      <span>Download CV</span>
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
    </button>
  );
};

export default GenerateCV; 