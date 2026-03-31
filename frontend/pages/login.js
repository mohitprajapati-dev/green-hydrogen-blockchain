import { useRouter } from "next/router";
import { useAuth } from "../src/context/AuthContext";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export default function LoginPage() {
  const { USERS, loginAs } = useAuth();
  const router = useRouter();

  const handleLogin = (user) => {
    loginAs(user);
    router.push("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        m: 0,
        p: 0,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", p: 2, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Login
          </Typography>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            {USERS.map((user) => (
              <Button
                key={user.userId}
                variant="contained"
                color="primary"
                onClick={() => handleLogin(user)}
                sx={{ textTransform: "none" }}
              >
                Login as {user.name} ({user.role})
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}