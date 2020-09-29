
var user = require('../models/user');

module.exports.login = (req, res) => {
    res.render('login')
}
module.exports.checkLogin = async (req, res) => {
    let userName = req.body.username;
    let userId = await user.findOne({userName:userName});
    if (userId){
        let password =req.body.password;
        if (userId.passWord == password){
            res.redirect('/car')
        } else {
            res.send('Sai mật khẩu')
        }

    } else {
        res.send('Tài khoản không tồn tại')
    }
}