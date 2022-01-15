import Head from 'next/head';
import styles from './styles.module.scss';
export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.post}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Random title</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae qui ullam, iusto expedita minus assumenda numquam
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Random title</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae qui ullam, iusto expedita minus assumenda numquam
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Random title</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae qui ullam, iusto expedita minus assumenda numquam
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
