const { User } = require("../models/User");

let adminAuth = (req, res, next) =>{
    //인증처리를 하는 곳

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    //토큰을 복호화한 후 유저를 찾는다.
    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, isAdmin: false, error: true })
        if(user.role === 0) return res.json({ isAdmin: false})

        req.token = token;
        req.user = user;
        next();
    })

    //유저가 있으면 인증 허가

    //유저가 없으면 인증 불가
}

module.exports = {adminAuth};