import './Error404.css';

/*
Error page, in normal use you should never see this page.
*/

function Error404() {
  return (
    <div className="Error404">
      Error 404
      <p>
        Vous êtes sur un lien innexistant.
      </p>
    </div>
  );
}

export default Error404;