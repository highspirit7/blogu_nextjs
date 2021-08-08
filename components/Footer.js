import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="page-footer">
      <div>
        <a
          href="https://github.com/highspirit7"
          target="_blank"
          rel="noopener noreferrer"
          className="icon"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      <div>
        <p>© Jiyeol Jake Lee 2021. All rights reserved.</p>
        <p>
          Built with{" "}
          <span>
            <a
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Nextjs
            </a>
          </span>{" "}
          and{" "}
          <span>
            <a
              href="https://www.sanity.io"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Sanity
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
