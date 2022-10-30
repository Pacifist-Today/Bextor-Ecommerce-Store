import {Typography} from "@mui/material";

const Error404 = () => {
    return (
        <div>
            <Typography
                variant="h1"
                component="p"
                sx={{
                    textAlign:"center",
                    marginTop:"15%",
                    marginBottom:"1%"
                }}
            >Error 404</Typography>
            <Typography
                variant="h3"
                component="p"
                sx={{
                    textAlign:"center",
                }}
            >Page not found</Typography>
        </div>
    )
}

export default Error404