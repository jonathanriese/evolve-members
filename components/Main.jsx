import { useState } from 'react';

export default function Main ({ modules }) {
    <main>
        <section className="modules">

        <nav className="moduleMenu">
          <h4>Modules</h4>
          {modules && modules.map((module) => (
            <a href={`#section${module.id}`} key={module.number}>
              <div className="moduleButton">
                  <p>
                    <b>{module.number}</b>
                    {module.title}
                  </p>
              </div>
            </a>
          ))}

        </nav>

        <div className="contentWrapper">

        {modules && modules.map((module) => (
            <div className="module" id={`section${module.id}`} key={module.number}>
              <h1>
                {module.title}
              </h1>
              <h5>
                {`Module ${module.number} — ${module.date}`}
              </h5>
              <div className="videoResponsive">
                <iframe
                  src={`https://www.youtube.com/embed/${module.videoID}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
              <div>
                <a src={module.presentationlink}>Presentation →</a>
              </div>
              <div>
                {module.text}
              </div>
            </div>
        ))}
        </div>
        </section>
      </main>
}

export async function getStaticProps() {
    // get modules from api
    const res = await fetch('https://evolve-member.herokuapp.com/modules');
    const modules = await res.json();

    return {
      props: { modules },
    }
  }