const isValidEmail = (email, setSnackBar) => {
    const isValid = email.includes("@") && email.includes(".com")
    
    if (!isValid) { 
        setSnackBar({
            visible: true,
            isError: true,
            message: "Invalid email"
        })
    }
    
    return isValid;
}

const isValidNickname = (nickname, setSnackBar) => {
    const isValid = nickname.length > 0

    if (!isValid) { 
        setSnackBar({
            visible: true,
            isError: true,
            message: "Must have a nickname"
        })
    }

    return isValid;
}

const isValidPassword = (password, setSnackBar) => {
    const isValid = password.length >= 8

    if (!isValid) { 
        setSnackBar({
            visible: true,
            isError: true,
            message: "Invalid password (must have at least 8 characters)"
        })
    }

    return isValid;
}

const isMatchingPassword = (password, confirmedPassword, setSnackBar) => {
    const isValid = (password === confirmedPassword)

    if (!isValid) { 
        setSnackBar({
            visible: true,
            isError: true,
            message: "Passwords do not match"
        })
    }

    return isValid;
}

export {
    isValidEmail,
    isValidNickname,
    isValidPassword,
    isMatchingPassword
}