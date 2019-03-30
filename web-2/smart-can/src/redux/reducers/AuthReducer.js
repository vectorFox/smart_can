const initState = {
    authError: null,
    emailError: null,
    usernameError: null
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {

        // Clear Status
        case 'CLEAR_STATUS':
            return {...state, authError: null, 
                emailError: null, usernameError: null}

        // Login and Logout
        case 'LOGIN_ERROR':
            return {...state, authError: 'Login Failed'};
        case 'LOGIN_SUCCESS':
            return {...state, authError: null};
        case 'SIGNOUT_SUCCESS':
            return state;

        // Sign Up
        case 'SIGNUP_SUCCESS':
            return {...state, authError: null};
        case 'SIGNUP_ERROR':
            return {...state, authError: action.error.message}
        
        // Updating Information
        case 'EMAIL_CHANGE_SUCCESS':                                 // Email
            return {...state, emailError: null};
        case 'EMAIL_CHANGE_ERROR':
            return {...state, emailError: action.error.message};
        case 'USERNAME_CHANGE_SUCCESS':                              // Username
            return {...state, usernameError: null};
        case 'USERNAME_CHANGE_ERROR':
            return {...state, usernameError: action.error};
        case 'FIRSTNAME_CHANGE_SUCCESS':                             // First Name
            return {...state, updateError: null};
        case 'FIRSTNAME_CHANGE_ERROR':
            return {...state, updateError: action.error};
        case 'LASTNAME_CHANGE_SUCCESS':                              // Last Name
            return {...state, updateError: null};
        case 'LASTNAME_CHANGE_ERROR':
            return {...state, updateError: action.error};
        case 'IMAGE_CHANGE_SUCCESS':
            return {...state, updateError: null};                    // Image
        case 'IMAGE_CHANGE_ERROR':
            return {...state, updateError: action.error};
        default:
            return state;
    }
}

export default AuthReducer