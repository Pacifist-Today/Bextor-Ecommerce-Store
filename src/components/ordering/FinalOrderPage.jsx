import {memo, useEffect} from "react";
import {useSelector} from "react-redux";
import {Button, Paper, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useCart} from "../../redux/hooksCart";

const FinalOrderPage = memo((props) => {
    const orderId = useSelector(state => state.orderId)
    const {cleanCart} = useCart()
    console.log(orderId)

    useEffect(() => {
        cleanCart()
    }, [])

    return(
        <Paper elevation={3} sx={{margin: "5%"}}>
            <Typography variant="h4" component="p" sx={{margin: "2% 5%", padding: "2% 0"}}>Order has successfully made</Typography>
            <Typography variant="h6" component="p" sx={{margin: "0% 5%", paddingBottom: "20px"}}>Your application #{orderId} in processing.</Typography>
            <Typography variant="h6" component="p" sx={{margin: "0% 5%", paddingBottom: "20px"}}>Thanks for trusting us, have a nice day).</Typography>
            <Button LinkComponent={NavLink} to="/catalog" sx={{margin: "0% 5%", marginBottom: "40px"}}>
                <Typography variant="body1" component="p">
                    Return to catalog
                </Typography>
            </Button>
        </Paper>
    )
})

export default FinalOrderPage