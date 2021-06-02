import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useState } from 'react';
import Head from 'next/head';

export default function Home({ modules}) {

  const pw = "Evolvenow062021";
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(false);
  const [failed, setFailed] = useState(false);

  return <div>
      <Head>
        <title>Evolve Academy – Member Space</title>
        <link rel='icon' href='https://res.cloudinary.com/dffi51zip/image/upload/v1622571758/Evolve/favicon_nlhxb3.png' />
      </Head>

      <Navbar />

      <main>
        <section className="modules">

        <div className={`password ${secure ? 'hidden' : ''}`}>
          <form>
            <label>
              <p className={`${failed ? 'hidden' : ''}`}>Please enter the member password to proceed</p>
              <p className={`failed ${failed ? '' : 'hidden'}`}>You entered the wrong password, please try again</p>
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
            <button
              type="submit"
              className="mt-3 bg-green-400 text-white p-2 font-bold rounded hover:bg-green-600"
              onClick={(e) => {
                e.preventDefault()
                if (password == pw) {
                    setSecure(true)
                }
                else {
                  setFailed(true)
                }
              }}
            >
              Submit
            </button>
          </form>
        </div>

        <nav className={`moduleMenu ${secure ? '' : 'hidden'}`}>
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

        <div className={`contentWrapper ${secure ? '' : 'hidden'}`}>

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