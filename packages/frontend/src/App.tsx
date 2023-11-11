import { Container } from "@mui/material";

import Associate from "./components/Associate";

function App() {
  return (
    <Container sx={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh'
    }} disableGutters maxWidth={false}>
      <Associate />
    </Container>
  );
}

export default App;
