import {Paper, Typography, Box} from "@mui/material";

const DeliveryInfoPage = () => {
    return (
        <Paper elevation={3} sx={{margin: "5%"}}>
            <Typography variant="h3" component="p" sx={{margin: "0 5%", padding: "3% 0"}}>Delivery and payment</Typography>
            <Box sx={{margin: "0 5%", paddingBottom: "3%"}}>
                <Typography variant="h4" component="p" sx={{marginBottom:"20px"}}>To the "Owl post" branch</Typography>
                <Typography variant="h6" component="p" sx={{marginBottom:"10px"}}>The delivery time to the "Owl post" branch is 1 - 3 days.</Typography>
                <Typography variant="h6" component="p">After sending the order, you will receive an SMS message with the number of the express invoice.</Typography>
                <Typography variant="h6" component="p" sx={{marginBottom:"10px"}}>You can specify the specific date of receipt of your order on the website of the company "Owl post"</Typography>
                <Typography variant="h6" component="p">Delivery to the "Owl post" branch is carried out according to Owl post tariffs, payment of the delivery cost is made at the branch upon receipt of the goods.</Typography>

            </Box>
            <Box sx={{margin: "0 5%", paddingBottom: "3%"}}>
                <Typography variant="h4" component="p" sx={{marginBottom:"20px"}}>From Bextor</Typography>
                <Typography variant="h6" component="p" sx={{marginBottom:"10px"}}>Self-pickup of goods from stores of the Bextor network</Typography>
                <Typography variant="h6" component="p" sx={{marginBottom:"10px"}}>You have the opportunity to place an order for the product you are interested in on our website and pick up your purchase at the nearest Bextor store.</Typography>
                <Typography variant="h6" component="p">When placing an order, the operator of the bextor.com.ua contact center specifies a convenient place and time of arrival for the purchase. Delivery of our order to the nearest Bextor store is free of charge.</Typography>
            </Box>
        </Paper>
    )
}

export default DeliveryInfoPage