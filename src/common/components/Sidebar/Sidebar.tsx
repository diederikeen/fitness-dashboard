import { styled } from "@stitches/react";
import { NavLink } from "react-router-dom";
import { Dashboard, GraphicEq } from "@mui/icons-material";

const SidebarStyles = styled("aside", {
  gridRowStart: "main-content",
  backgroundColor: "$grey300",
  height: "100vh",
  padding: "$lg",
});

const StyledNavLink = styled(NavLink, {
  padding: "$md $lg",

  borderRadius: "$default",

  color: "white",
  textDecoration: "none",
  fontWeight: "500",
  lineHeight: "26px",
  fontSize: "18px",

  transition: "all 175ms ease",

  display: "grid",
  gridTemplateColumns: "[icon] 30px [content] 1fr",
  gridGap: "$sm",

  margin: "0 0 $md",

  "&:hover": {
    backgroundColor: "rgba(0,0,0, .2)",
  },

  "&.active": {
    background: "$primary",
  },
});

function Link({ to, children }: { to: string; children: JSX.Element }) {
  return <StyledNavLink to={to}>{children}</StyledNavLink>;
}

export function Sidebar() {
  return (
    <SidebarStyles>
      <nav>
        <Link to="/">
          <>
            <Dashboard />
            <span>Dashboard</span>
          </>
        </Link>

        <Link to="/weight-tracker">
          <>
            <GraphicEq />
            <span>Weight Tracker</span>
          </>
        </Link>
      </nav>
    </SidebarStyles>
  );
}
