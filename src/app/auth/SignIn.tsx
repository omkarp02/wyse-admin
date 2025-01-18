import { Stack } from "@mui/material";
import Content from "../../features/admin/signin/components/Content";
import SignInCard from "../../features/admin/signin/components/SignInCard";

const SignIn = () => {
  return (
    <Stack
      direction={{ xs: "column-reverse", md: "row" }}
      sx={{
        justifyContent: "center",
        gap: { xs: 6, sm: 12 },
        p: { xs: 2, sm: 4 },
        m: "auto",
      }}
    >
      <Content />
      <SignInCard />
    </Stack>
  );
};

export default SignIn;
