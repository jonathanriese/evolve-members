import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Head from 'next/head';

export default function Home({ modules }) {

  return <div>
      <Head>
        <title>Evolve Academy – Member Space</title>
        <link rel='icon' href='https://res.cloudinary.com/dffi51zip/image/upload/v1622571758/Evolve/favicon_nlhxb3.png' />
      </Head>

      <Navbar />

      <main>
        <section class="modules">

        <nav class="moduleMenu">
          <h4>Modules</h4>
          {modules && modules.map((module) => (
            <a href={`#section${module.id}`} key={module.number}>
              <div class="moduleButton">
                  <p>
                    <b>{module.number}</b>
                    {module.title}
                  </p>
              </div>
            </a>
          ))}

        </nav>

        <div class="contentWrapper">

        {modules && modules.map((module) => (
            <div class="module" id={`section${module.id}`} key={module.number}>
              <h1>
                {module.title}
              </h1>
              <h5>
                {`Module ${module.number} — ${module.date}`}
              </h5>
              <div class="videoResponsive">
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

      <Footer />

    </div>;
}

export async function getStaticProps() {
  // get modules from api
  const res = await fetch('https://evolve-member.herokuapp.com/modules');
  const modules = await res.json();

  return {
    props: { modules },
  }
}