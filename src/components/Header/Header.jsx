import Typography from "@mui/material/Typography";

export default function Header() {
  return (
    <header className="App-header">
      <Typography variant="h3" className="App-title">
        Feedback!
      </Typography>
      <Typography variant="h5" mt={1} fontStyle="italic">
        Don't forget it!
      </Typography>
    </header>
  );
}
