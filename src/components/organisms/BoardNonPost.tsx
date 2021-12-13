import Box from "@mui/material/Box";

export const BoardNonPost = () => {
   return (
      <Box sx={{ height: "50vh" }}>
         <Box
            sx={{
               textAlign: "center",
               paddingTop: 20,
            }}
         >
            <p>投稿がありません</p>
            <p>思ったことを投稿してみよう</p>
         </Box>
      </Box>
   );
};
