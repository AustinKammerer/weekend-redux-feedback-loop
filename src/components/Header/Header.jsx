import "./Header.css";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export default function Header() {
  // grab the current location from the store for conditional rendering
  const page = useSelector((store) => store.pathReducer);

  // Admin view will have different header text
  return (
    <header>
      {page === "/admin" ? (
        <>
          <Typography variant="h3" className="App-title">
            Welcome, Admin!
          </Typography>
          <Typography variant="h5" mt={1} fontStyle="italic">
            Here is Your Feedback!
          </Typography>{" "}
        </>
      ) : (
        <>
          <Typography variant="h3" className="App-title">
            Feedback!
          </Typography>
          <Typography variant="h5" mt={1} fontStyle="italic">
            Don't forget it!
          </Typography>
        </>
      )}
    </header>
  );
}
