import passport from "passport";
import local from 'passport-local';
import {Strategy as GitHubStrategy} from 'passport-github2';
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

import UserDAO from "../db/UserDAO.js";
import AuthService from "../services/AuthService.js";
import config from "./config.js";

const LocalStrategy = local.Strategy;
const authService = new AuthService();

