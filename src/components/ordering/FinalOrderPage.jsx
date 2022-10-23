import {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";

const FinalOrderPage = memo((props) => {
    const orderId = useSelector(state => {
            if (state.ordersId.length === 1) {
                return state.ordersId[0]
            }
            else if (state.ordersId.length > 1) {
                return state.ordersId[state.ordersId.length - 1]
            }
        }
    )
    console.log(orderId)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: "clearCart"
        })
    }, [])

    return(
        <div>
            <p>
                "Your application #{orderId} is decorated.
                Our manager will contact you soon.
            </p>
            <Button LinkComponent={NavLink} to="/catalog">Return to catalog</Button>
        </div>
    )
})

export default FinalOrderPage