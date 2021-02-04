import React from 'react'
import './SignupScreen.scss'

function SignupScreen() {
    return (
        <div className="signupScreen">
            <form>
                <h1>Sign In</h1>
                <input placeholder="Email" type="email"/>
                <input placeholder="password" type="password"/>
                <button type="submit">Sign In</button>
                <h4>
                    <span className="signupScreen__gray">New to Netflix? </span>
                    <span className="signupScreen__link">Sign Up Now</span>
                </h4>
            </form>
        </div>
    )
}

export default SignupScreen
