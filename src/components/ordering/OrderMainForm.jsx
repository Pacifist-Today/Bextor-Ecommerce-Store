import {memo, useCallback, useEffect, useRef, useState} from "react";
import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";
import OrderPreparation from "./OrderPreparation";
import CartPage from "../cart/CartPage";
import {useSelector} from "react-redux";

const OrderMainForm = memo(props => {
    const {
        // cartList,
        totalSum
    } = props

    const cartList = useSelector(state => state.cartProducts)

    console.log(cartList)

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

    /////////////////////////////////////////////////////////////////////////////
    // Uncontrolled inputs

    const handleActiveCartPage = useCallback(() => {
        setIsActiveCartPage(!isActiveCartPage)
    }, [])

    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const countryRef = useRef(null)
    const phoneRef = useRef(null)
    const cityRef = useRef(null)
    const mainAddressRef = useRef(null)
    const additionalAddressRef = useRef(null)
    const emailRef = useRef(null)
    const deliveryTypeRef = useRef(null)
    const dontCallMeRef = useRef(null)
    const commentRef = useRef(null)

    const [formFieldsValue, setFormFieldsValue] = useState(null)
    console.log(formFieldsValue)

    const onSubmitOrderForm = (e) => {
        e.preventDefault()

        if (!firstNameRef.current.value.trim().length
            ||
            !lastNameRef.current.value.trim().length
            ||
            !countryRef.current.value.trim().length
            ||
            !cityRef.current.value.trim().length
            ||
            !mainAddressRef.current.value.trim().length
            ||
            !emailRef.current.value.trim().length
            ||
            !deliveryTypeRef.current.value
        ) throw new Error("Empty input")

        if (isNaN(+phoneRef.current.value)) throw new Error("Incorrect phone number")
        if (!emailRef.current.value.includes("@")) throw new Error("Incorrect email")
        if (commentRef.current.value.trim().length > 500) throw new Error("Much symbols in commentary")

        const firstNameValue = firstNameRef.current.value.charAt(0).toUpperCase() + firstNameRef.current.value.slice(1)
        const lastNameValue = lastNameRef.current.value.charAt(0).toUpperCase() + lastNameRef.current.value.slice(1)
        const cityValue = cityRef.current.value.charAt(0).toUpperCase() + cityRef.current.value.slice(1)
        const mainAddressValue = mainAddressRef.current.value.charAt(0).toUpperCase() + mainAddressRef.current.value.slice(1)
        const additionalAddressValue = additionalAddressRef.current.value.charAt(0).toUpperCase() + additionalAddressRef.current.value.slice(1)

        // firstNameRef.current.value = firstNameRef.current.value.charAt(0).toUpperCase() + firstNameRef.current.value.slice(1)
        // lastNameRef.current.value = lastNameRef.current.value.charAt(0).toUpperCase() + lastNameRef.current.value.slice(1)
        // cityRef.current.value = cityRef.current.value.charAt(0).toUpperCase() + cityRef.current.value.slice(1)
        // mainAddressRef.current.value = mainAddressRef.current.value.charAt(0).toUpperCase() + mainAddressRef.current.value.slice(1)
        // additionalAddressRef.current.value = additionalAddressRef.current.value.charAt(0).toUpperCase() + additionalAddressRef.current.value.slice(1)

        const formFieldsValue = {
            firstName: firstNameValue,
            lasName: lastNameValue,
            country: countryRef.current.value,
            phone: phoneRef.current.value,
            city: cityValue,
            mainAddress: mainAddressValue,
            additionalAddress: additionalAddressValue,
            email: emailRef.current.value,
            deliveryType: deliveryTypeRef.current.value,
            dontCallMe: dontCallMeRef.current.checked,
            comment: commentRef.current.value,
        }

        setFormFieldsValue(formFieldsValue)

        setIsOrderMade(!isOrderMade)
    }

    return (
        !isOrderMade && !isActiveCartPage
        ?
        <div>
            <form
                onSubmit={onSubmitOrderForm}
                style={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <span>
                    <label htmlFor="firstName">First name </label>
                    <input
                        name="firstName"
                        ref={firstNameRef}
                        type="text"
                        placeholder="First Name"
                        /////////////////////////// controlled input
                        value={firstName}
                        onChange={onChangeFirstName}
                        /////////////////////////////
                        required
                    />
                </span>
                <span>
                    <label htmlFor="lastName">Last name </label>
                    <input
                        name="lastName"
                        ref={lastNameRef}
                        type="text"
                        placeholder="Last Name"
                        /////////////////////////// controlled input
                        value={lastName}
                        onChange={onChangeLastName}
                        /////////////////////////////
                        required
                    />
                </span>
                <span>
                    <span>Choose your country </span>
                    <select
                        ref={countryRef}
                        // defaultValue="Ukraine"
                        /////////////////////////// controlled input
                        onChange={onChangeCountry}
                        value="Ukraine"
                        /////////////////////////////
                    >
                        <option value="Ukraine">Ukraine</option>
                        <option value="Finland">Finland</option>
                        <option value="Dutch">Dutch</option>
                    </select>
                </span>
                <span>
                    <label htmlFor="phone">Phone </label>
                    <input
                        name="phone"
                        ref={phoneRef}
                        type="tel"
                        placeholder="Phone number"
                        /////////////////////////// controlled input
                        onChange={onChangePhone}
                        value={phone}
                        /////////////////////////////
                        required
                    />
                </span>
                <span>
                    <label htmlFor="city">City </label>
                    <input
                        name="city"
                        ref={cityRef}
                        type="text"
                        placeholder="City"
                        /////////////////////////// controlled input
                        onChange={onChangeCity}
                        value={city}
                        /////////////////////////////
                        required
                    />
                </span>
                <span>
                    <label htmlFor="mainAddress">Main address </label>
                    <input
                        name="mainAddress"
                        ref={mainAddressRef}
                        type="text"
                        placeholder="Main address"
                        /////////////////////////// controlled input
                        onChange={onChangeMainAddress}
                        value={mainAddress}
                        /////////////////////////////
                        required
                    />
                </span>
                <span>
                    <label htmlFor="additionalAddress">Additional address </label>
                    <input
                        name="additionalAddress"
                        ref={additionalAddressRef}
                        type="text"
                        /////////////////////////// controlled input
                        onChange={onChangeAdditionalAddress}
                        value={additionalAddress}
                        /////////////////////////////
                        placeholder="Additional address"
                    />
                </span>
                <span>
                    <label htmlFor="email">Email </label>
                    <input
                        name="email"
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                        /////////////////////////// controlled input
                        onChange={onChangeEmail}
                        value={email}
                        /////////////////////////////
                        required
                    />
                </span>
                <span>
                    <label htmlFor="postalService">Postal service </label>
                    <input
                        ref={deliveryTypeRef}
                        name="deliveryService"
                        value="postalService"
                        /////////////////////////// controlled input
                        onChange={onChangeDelivery}
                        /////////////////////////////
                        type="radio"
                        defaultChecked="true"
                    />
                    <label htmlFor="pickup">Pickup </label>
                    <input
                        ref={deliveryTypeRef}
                        name="deliveryService"
                        value="pickup"
                        /////////////////////////// controlled input
                        onChange={onChangeDelivery}
                        /////////////////////////////
                        type="radio"
                    />
                </span>
                <span>
                    <label htmlFor="dontCallMe">Don't recall </label>
                    <input
                        ref={dontCallMeRef}
                        name="dontCallMe"
                        type="checkbox"
                        /////////////////////////// controlled input
                        onChange={onChangeDontCallMe}
                        /////////////////////////////
                    />
                </span>
                <textarea
                    ref={commentRef}
                    placeholder="Share your opinion"
                    /////////////////////////// controlled input
                    onChange={onChangeComment}
                    value={comment}
                    /////////////////////////////
                />
                <button type="submit">Continue</button>
                <Button onClick={handleActiveCartPage} >Cancel</Button>
            </form>
        </div>
        :
        isOrderMade
        ?
        <OrderPreparation
            cartList={cartList}
            totalSum={totalSum}
            formFieldsValue={formFieldsValue}
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