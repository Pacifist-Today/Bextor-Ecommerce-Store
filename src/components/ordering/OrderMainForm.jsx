import {memo, useCallback, useEffect, useRef, useState} from "react";
import {Button, Paper, TextField, FormLabel, FormControlLabel, FormControl, Radio, RadioGroup, InputLabel, Select, MenuItem, Checkbox, Box} from "@mui/material";
import {NavLink} from "react-router-dom";
import OrderPreparation from "./OrderPreparation";
import CartPage from "../cart/CartPage";
import {useSelector} from "react-redux";
import {store} from "../../redux/store";
import {setOrderId} from "../../redux/ducks/OrderNumber-duck";
import {useCart} from "../../redux/hooksCart";

const OrderMainForm = memo(props => {
    const {
        totalSum
    } = props

    const {cartList} = useCart()

    const [isOrderMade, setIsOrderMade] = useState(false)
    const [isActiveCartPage, setIsActiveCartPage] = useState(false)

    /////////////////////////////////////////////////////////////////////////////
    //Controlled inputs

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [country, setCountry] = useState("Ukraine")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [mainAddress, setMainAddress] = useState("")
    const [additionalAddress, setAdditionalAddress] = useState("")
    const [email, setEmail] = useState("")
    const [delivery, setDelivery] = useState("postalService")
    const [dontCallMe, setDontCallMe] = useState(false)
    const [comment, setComment] = useState("")

    const [formFieldsProps, setFormFieldsProps] = useState(null)

    const onChangeFirstName = ({target}) => {
        setFirstName(target.value)
    }

    const onChangeLastName = ({target}) => {
        setLastName(target.value)
    }

    const onChangeCountry = ({target}) => {
        setCountry(target.value)
    }

    const onChangePhone = ({target}) => {
        setPhone(target.value)
    }

    const onChangeCity = ({target}) => {
        setCity(target.value)
    }

    const onChangeMainAddress = ({target}) => {
        setMainAddress(target.value)
    }

    const onChangeAdditionalAddress = ({target}) => {
        setAdditionalAddress(target.value)
    }

    const onChangeEmail = ({target}) => {
        setEmail(target.value)
    }

    const onChangeDelivery = ({target}) => {
        setDelivery(target.value)
    }

    const onChangeDontCallMe = () => {
        setDontCallMe(!dontCallMe)
    }

    const onChangeComment = ({target}) => {
        setComment(target.value)
    }

    console.log(firstName, lastName, country, phone, city, mainAddress, additionalAddress, email, delivery, dontCallMe, comment)

    const handleActiveCartPage = useCallback(() => {
        setIsActiveCartPage(!isActiveCartPage)
    }, [])

    /////////////////////////////////////////////////////////////////////////////
    // Uncontrolled inputs

    // const firstNameRef = useRef(null)
    // const lastNameRef = useRef(null)
    // const countryRef = useRef(null)
    // const phoneRef = useRef(null)
    // const cityRef = useRef(null)
    // const mainAddressRef = useRef(null)
    // const additionalAddressRef = useRef(null)
    // const emailRef = useRef(null)
    // const deliveryTypeRef = useRef(null)
    // const dontCallMeRef = useRef(null)
    // const commentRef = useRef(null)

    const [formFieldsValue, setFormFieldsValue] = useState(null)

    const onSubmitOrderForm = (e) => {
        e.preventDefault()

        // uncontrolled inputs
        // if (!firstNameRef.current?.value.trim()
        //     ||
        //     !lastNameRef.current?.value.trim()
        //     ||
        //     !countryRef.current?.value.trim()
        //     ||
        //     !cityRef.current?.value.trim()
        //     ||
        //     !mainAddressRef.current?.value.trim()
        //     ||
        //     !emailRef.current?.value.trim()
        //     ||
        //     !deliveryTypeRef.current?.value
        // ) throw new Error("Empty input")
        //
        // if (isNaN(+phoneRef.current.value)) throw new Error("Incorrect phone number")
        // if (!emailRef.current.value.includes("@")) throw new Error("Incorrect email")
        // if (commentRef.current.value.trim().length > 500) throw new Error("Much symbols in commentary")
        //
        // const firstNameValue = firstNameRef.current.value.charAt(0).toUpperCase() + firstNameRef.current.value.slice(1)
        // const lastNameValue = lastNameRef.current.value.charAt(0).toUpperCase() + lastNameRef.current.value.slice(1)
        // const cityValue = cityRef.current.value.charAt(0).toUpperCase() + cityRef.current.value.slice(1)
        // const mainAddressValue = mainAddressRef.current.value.charAt(0).toUpperCase() + mainAddressRef.current.value.slice(1)
        // const additionalAddressValue = additionalAddressRef.current.value.charAt(0).toUpperCase() + additionalAddressRef.current.value.slice(1)
        //
        // const formFieldsValue = {
        //     firstName: firstNameValue,
        //     lasName: lastNameValue,
        //     country: countryRef.current.value,
        //     phone: phoneRef.current.value,
        //     city: cityValue,
        //     mainAddress: mainAddressValue,
        //     additionalAddress: additionalAddressValue,
        //     email: emailRef.current.value,
        //     deliveryType: deliveryTypeRef.current.value,
        //     dontCallMe: dontCallMeRef.current.checked,
        //     comment: commentRef.current.value,
        // }
        //
        // setFormFieldsValue(formFieldsValue)

        ///////////////////////////////////////////////////////

        // controlled inputs

        if (!firstName.trim()
            ||
            !lastName.trim()
            ||
            !country.trim()
            ||
            !city.trim()
            ||
            !mainAddress.trim()
            ||
            !email.trim()
            ||
            !delivery.trim()
        ) throw new Error("Empty input")

        if (isNaN(+phone)) throw new Error("Incorrect phone number")
        if (!email.includes("@")) throw new Error("Incorrect email")
        if (comment.length > 500) throw new Error("Much symbols in commentary")

        const firstNameProp = firstName.charAt(0).toUpperCase() + firstName.slice(1)
        const lastNameProp = lastName.charAt(0).toUpperCase() + lastName.slice(1)
        const cityProp = city.charAt(0).toUpperCase() + city.slice(1)
        const mainAddressProp = mainAddress.charAt(0).toUpperCase() + mainAddress.slice(1)
        const additionalAddressProp = additionalAddress.charAt(0).toUpperCase() + additionalAddress.slice(1)

        const formFieldsProps = {
            firstName: firstNameProp,
            lasName: lastNameProp,
            country: country,
            phone: phone,
            city: cityProp,
            mainAddress: mainAddressProp,
            additionalAddress: additionalAddressProp,
            email: email,
            deliveryType: delivery,
            dontCallMe: dontCallMe,
            comment: comment,
        }

        setFormFieldsProps(formFieldsProps)

        ////////////////////////////////////////////////////////

        setIsOrderMade(!isOrderMade)

        store.dispatch(setOrderId())
    }

    return (
        !isOrderMade && !isActiveCartPage
        ?
        <Box sx={{display: "flex", justifyContent:"center"}}>
            <form onSubmit={onSubmitOrderForm} style={{
                display: "flex",
                flexDirection: "column",

                padding: "2% 3%",
                marginTop: "3%",
                }}
            >
                <p>Personal information</p>
                <Box sx={{display: "flex"}}>
                    <TextField
                        required
                        // inputRef={firstNameRef}
                        id="outlined-required"
                        label="First Name"
                        value={firstName}
                        onChange={onChangeFirstName}
                        sx={{marginRight:"20px"}}
                    />
                    <TextField
                        required
                        // inputRef={lastNameRef}
                        id="outlined-required"
                        label="Last Name"
                        value={lastName}
                        onChange={onChangeLastName}
                    />
                </Box>
                <p>Contact information</p>
                <Box sx={{display:"flex"}}>
                    <TextField
                        required
                        // inputRef={phoneRef}
                        id="outlined-required"
                        label="Phone"
                        value={phone}
                        onChange={onChangePhone}
                        sx={{marginRight:"20px"}}
                    />
                    <TextField
                        required
                        // inputRef={emailRef}
                        id="outlined-required"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </Box>
                <p>Address</p>
                <Box sx={{display:"flex"}}>
                    <Select
                        labelId="demo-simple-select-label"
                        // inputRef={countryRef}
                        id="demo-simple-select"
                        value={country}
                        label="Country"
                        onChange={onChangeCountry}
                        sx={{marginRight:"20px"}}
                    >
                        <MenuItem value={"Ukraine"}>Ukraine</MenuItem>
                        <MenuItem value={"Finland"}>Finland</MenuItem>
                        <MenuItem value={"Dutch"}>Dutch</MenuItem>
                    </Select>
                    <TextField
                        required
                        // inputRef={cityRef}
                        id="outlined-required"
                        label="City"
                        value={city}
                        onChange={onChangeCity}
                        sx={{marginRight:"20px"}}
                    />
                    <TextField
                        required
                        // inputRef={mainAddressRef}
                        id="outlined-required"
                        label="Main Address"
                        value={mainAddress}
                        onChange={onChangeMainAddress}
                        sx={{marginRight:"20px"}}
                    />
                    <TextField
                        // inputRef={additionalAddressRef}
                        id="outlined-required"
                        label="Additional Address"
                        value={additionalAddress}
                        onChange={onChangeAdditionalAddress}
                    />
                </Box>
                <p>Delivery</p>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="postalService"
                    name="radio-buttons-group"
                    sx={{display: "flex", flexDirection:"row"}}
                >
                    <FormControlLabel
                        value="postalService"
                        control={<Radio
                            // inputRef={deliveryTypeRef}
                        />}
                        label="Postal service"
                        onChange={onChangeDelivery}
                    />
                    <FormControlLabel
                        value="pickUp"
                        control={<Radio
                            // inputRef={deliveryTypeRef}
                        />}
                        label="Pickup"
                        onChange={onChangeDelivery}
                    />
                </RadioGroup>
                <FormControlLabel
                    control={<Checkbox
                        // inputRef={dontCallMeRef}
                        onChange={onChangeDontCallMe}
                    />} label="Don't call me" />
                <TextField
                    // inputRef={commentRef}
                    id="outlined-multiline-static"
                    label="Comment"
                    multiline
                    rows={4}
                    placeholder="Write your point..."
                    value={comment}
                    onChange={onChangeComment}
                />
                <Box sx={{display: "flex", justifyContent:"center", marginTop: "20px"}}>
                    <Button type="submit">Continue</Button>
                    <Button onClick={handleActiveCartPage} >Cancel</Button>
                </Box>
            </form>
        </Box>
        :
        isOrderMade
        ?
        <OrderPreparation
            cartList={cartList}
            totalSum={totalSum}
            formFieldsValue={formFieldsValue}
            formFieldsProps={formFieldsProps}
        />
        :
        isActiveCartPage
        ?
        <CartPage />
        :
        null
    )
})

export default OrderMainForm