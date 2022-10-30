import {Paper, Typography, Box} from "@mui/material";

const AboutUsInfoPage = () => {
    return (
        <Paper elevation={3} style={{margin: "5%"}}>
            <Typography variant="h3" component="p" sx={{margin: "2% 5%", padding: "3% 0"}}>About us</Typography>
            <Box style={{margin: "0 5%", paddingBottom: "3%"}}>
                <Typography variant="h6" component="p" >"Bextor" is a highly visible and recognizable retail store in the Ukrainian market, which includes a network of more than 29 stores and the online store.</Typography>
                <Typography variant="h6" component="p" >We work in a unique for Ukraine format of innovative entertainment centers in a bright modern design, with an area up to 1200 m².</Typography>
                <Typography variant="h6" component="p" sx={{marginBottom:"10px"}}>These are open access to goods, interactive virtual reality zones and smart home devices, friendly and knowledgeable staff. A place where you are always welcome.</Typography>

                <Typography variant="h6" component="p" sx={{marginBottom:"10px"}}>The target audience of Bextor is active, advanced users of devices and gadgets: from headphones to laptops.</Typography>

                <Typography variant="h6" component="p" >Online store is confidently among the leaders of online trade in Ukraine.</Typography>
                <Typography variant="h6" component="p" sx={{marginBottom:"10px"}}>The central office is located in Kiev.</Typography>

                <Typography variant="h6" component="p" >The company is developing its own network of authorized service centers and electric vehicle rental points, as well as educational spaces in the chain's flagship stores.</Typography>
            </Box>
        </Paper>
    )
}

export default AboutUsInfoPage