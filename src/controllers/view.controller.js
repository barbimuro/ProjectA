 const landingPage = async(req, res)=>{
    res.render('home')
}

const registerPage = async(req, res)=>{
    res.render('register')
}

const loginPage = async(req, res)=>{
    res.render('login')
}

const profilePage = async(req, res)=>{
    res.render('profile')
}

export default {
    landingPage,
    registerPage,
    loginPage,
    profilePage
}