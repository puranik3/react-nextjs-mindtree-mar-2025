import { Alert } from "react-bootstrap";
import Menu from "./components/common/Menu/Menu";

interface Props {
  title?: string,
  color?: string
}

export default function App({ title, color = 'gray' } : Props) {
  console.log(title, color);

  return (
    <>
      <Alert
          variant="warning"
          onClose={() => alert( 'The alert was closed')}
          dismissible
      >
          <Alert.Heading>Note on React Version</Alert.Heading>
          <p>
              The current version of React is v19. This app is built
              using React v19. The way an app was built using React
              v16.7 or earlier was significantly different.
          </p>
      </Alert>

      <Menu />

      {
        /*
        <button style={{
          backgroundColor: color
        }}>{title}</button>
        */
      }
    </>
  );
}

// App.defaultProps = {
//   color: 'gray'
// };