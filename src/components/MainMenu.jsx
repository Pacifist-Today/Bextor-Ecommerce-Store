import {memo} from "react";
import {Typography, Box} from "@mui/material";
import BextorLogo from "../assets/images/BextorLogo.png"

const mainMenu = memo((props) => {
    return (
        <Box style={{display: "flex", flexDirection:"column", margin: "3% 5%", padding: "0 170px"}}>
            <Typography variant="h3" component="h3" sx={{marginBottom:"50px"}}>Welcome to Bextor store</Typography>
            <Box sx={{marginBottom:"50px"}}><img style={{width: "50%"}} src={BextorLogo} /></Box>
            <Typography variant="h5" component="p" >"Bextor" is a highly visible and recognizable retail store in the Ukrainian market, which includes a network of more than 29 stores and the online store.</Typography>
            <Typography variant="h5" component="p" >Online store is confidently among the leaders of online trade in Ukraine.</Typography>
        </Box>
    )
})

export default mainMenu