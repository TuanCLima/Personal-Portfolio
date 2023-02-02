import styles from './HomeDescription.module.css';

function HomeDescription() {
  return (
    <div className={styles.wrapper}>
      <p>
        {"I'm a front end developer working mostly with tools like React, Typescript and Next.js."}
      </p>
      <p>
        {"I have a Master degree on Data Transport and Networking and have about 4 years' experience as a programmer and 2 as a React developer."}
      </p>
      <p>
        {"I'm an Agile practitioner and believe that Unit Testing pays."}
      </p>
    </div>
  )
}

export default HomeDescription;