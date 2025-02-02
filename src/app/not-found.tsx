import { NextPageContext } from 'next';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <a href="/" style={{ color: '#0070f3', textDecoration: 'underline' }}>
        Go back to the homepage
      </a>
    </div>
  );
}

// Optional: Set custom status code
NotFound.getInitialProps = ({ res }: NextPageContext) => {
  if (res) {
    res.statusCode = 404;
  }
  return {};
};
export default NotFound;
