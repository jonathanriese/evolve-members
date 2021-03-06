import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import Head from 'next/head';

export default function Home({ modules }) {

  const pw = "Evolvenow062021";
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(false);
  const [failed, setFailed] = useState(false);

  return <div>
      <Head>
        <title>Evolve Academy – Member Space</title>
        <link rel='icon' href='https://res.cloudinary.com/dffi51zip/image/upload/v1622571758/Evolve/favicon_nlhxb3.png' />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@700&family=Karla:wght@300;400;500&display=swap" rel="stylesheet" />

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
            <Link href={`#section${module.id}`} key={module.number}>
              <a>
              <div className="moduleButton">
                  <p>
                    <b>{module.number}</b>
                    {module.title}
                  </p>
              </div>
              </a>
            </Link>
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
              <div>
                <a href={module.videoID} target="_blank" rel="noopener noreferrer">Zoom Recording →</a>
              </div>
              <div>
                <a href={module.presentationLink} target="_blank" rel="noopener noreferrer">Presentation →</a>
              </div>
              <div>
                <h3>Assignment</h3>
                <ReactMarkdown children={module.text} />
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
    props: { modules},
  }
}
