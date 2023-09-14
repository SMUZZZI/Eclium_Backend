import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import { validationResult } from 'express-validator'

import UserModel from '../models/user.js'
import SongModel from '../models/song.js'

class UserController {
    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }

            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const doc = new UserModel({
                email: req.body.email,
                name: req.body.name,
                passwordHash: hash,
            })

            const user = await doc.save();

            const token = jwt.sign(
                {
                    _id: user._id,
                },
                "ejiki",
                {
                    expiresIn: "30d"
                })

            const { passwordHash, ...userData } = user._doc;

            res.json({
                ...userData,
                token
            })

        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Не удалось зарегестрировать пользователя"
            })
        }
    }

    async login(req, res) {
        try {
            const user = await UserModel.findOne({ name: req.body.name })

            if (!user) return res.status(400).json({ message: "Пользователь не найден" })

            const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

            if (!isValidPass) return res.status(400).json({ message: "Неправильный пароль" })

            const token = jwt.sign(
                {
                    _id: user._id,
                },
                "ejiki",
                {
                    expiresIn: "30d"
                })

            const { passwordHash, ...userData } = user._doc;

            res.json({
                ...userData,
                token
            })

        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Не удалось авторизоваться"
            })
        }
    }
    async getMe(req, res) {
        try {
            const user = await UserModel.findById(req.userId);

            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден" })
            }

            const { passwordHash, ...userData } = user._doc;

            res.json(userData)
        }
        catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Пользователь не найден"
            })
        }
    }
    async editMe(req, res) {
        try {
            const user = await UserModel.findById(req.userId);

            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден" })
            }

            user.name = req.body.name
            user.about = req.body.about
            user.icon = req.body.icon

            user.save();
            res.json(user)
        }
        catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Пользователь не найден"
            })
        }
    }
    async getAccountId(req, res) {
        try {

            let _id = req.params.id
            const user = await UserModel.findOne({ _id })
            res.json(user)
        }
        catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Пользователь не найден"
            })
        }
    }
    async getAllAccount(req, res) {
        try {
            const users = await UserModel.find()
            res.json(users)
        }
        catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Пользователь не найден"
            })
        }
    }
    async addSong(req, res) {
        try {

            const user = await UserModel.findById(req.userId);
            const doc = new SongModel({
                audio: req.body.audio,
                title: req.body.title,
                author: req.body.author,
                authorLink: req.body.authorLink,
                icon: req.body.icon,
                genres: req.body.genres
            })

            const song = await doc.save();
            user.songs.push(song._id)

            user.save()
            res.json(user)


        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Не удалось добавить песню"
            })
        }
    }
    async deleteSong(req, res) {
        try {
            const user = await UserModel.findById(req.userId);
            let _id = req.params.id
            await SongModel.findOneAndDelete({ _id })

            user.songs = user.songs.filter(item => item != _id)
            user.save()

            res.json(user)

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Не удалось удалить песню"
            })
        }
    }
    async subscribe(req, res) {
        try {
            const id = req.params.id
            const user = await UserModel.findById(req.userId);

            if (!user.subscribtions.includes(id)) {
                user.subscribtions.push(id)
            }
            user.save()
            res.json(user)

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Не удалось подписаться"
            })
        }
    }
    async unsubscribe(req, res) {
        try {
            let id = req.params.id
            const user = await UserModel.findById(req.userId);
            user.subscribtions = user.subscribtions.filter(item => item != id)

            user.save()
            res.json(user)

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Не удалось отписаться"
            })
        }
    }
    async getsubscriptions(req, res) {
        try {
            const id = req.params.id
            const user = await UserModel.find({_id: id})

            const result = []

            for (let i = 0; i < user.subscribtions.length; i++) {
                
                const tmp = await UserModel.findOne({ _id: user.subscribtions[i] })
                result.push(tmp)
                
            }

            res.json(result)

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Не удалось найти подписки"
            })
        }
    }

}

export default new UserController()