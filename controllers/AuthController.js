const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    // PÁGINA DE INICIALIZAÇÃO
    static async login(req, res) {
        res.render('auth/login')
    }

    static async register(req, res){
        
        //Disponibiliza a vizualição do menu completo dependendo do nivel do user
        let userId = req.session.userid
        let user = await User.findOne({where:{id:userId}})
        let nivel = user.nivel

        res.render('auth/register',{nivel})
    }

    // PARTE DE REGISTRO DA PÁGINA
    static async registerPost(req, res){
        let {name , email, cpf , password, confirmpassword, nivel} = req.body

        //Confirma se a senha está correta
        if(password != confirmpassword){
            console.log('A senha não é a mesma')
            redirect('/register')
            return
        }
        const salt = bcrypt.genSaltSync(8)
        const hashPassword = bcrypt.hashSync(password, salt)

         //Lógica para nível do usuário
         if(nivel == null){
            nivel = 0
        }

        //Dados que serão adicionados
        const user ={
            name, 
            email, 
            cpf,
            password:hashPassword,
            nivel
        }
       
        //Cria usuário
        try{
            await User.create(user)

            res.redirect('/ponto')
        }
        catch(err){
            console.log(err)
        }
    }   

    // LOGIN, ENTRADA DO USUÁRIO
    static async loginPost(req, res){
        let{email, password} = req.body

        let user = await User.findOne({where:{email:email}})
        if(!user){
            console.log('Usuário não encontrado')
            res.render('auth/login')
            return
        }

        let confPas = bcrypt.compareSync(password, user.password)
        
        if(!confPas){
            console.log('A senha está incorreta')
            res.redirect('/')
            return
        }
        try{
            req.session.userid = user.id
            console.log('deu certo aqui, tá salvo')
            res.redirect('/ponto')
        }
        catch(err){
            console.log(err)
            console.log('erro aqui')
            res.redirect('/')
        } 
    }

    // SAIR, LOGOUT DO USUÁRIO
    static async logOut(req,res){
        req.session = null
        res.redirect('/')
    } 

    
}