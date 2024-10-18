import UserDAO from "../db/UserDAO.js";

const userService = new UserDAO()

const getAllUsers = async (req, res) =>{
    try {
        const users = await userService.getUsers();
        const limit = 10;

        // Limitar los usuarios a los primeros 10
        res.json(users.slice(0, limit));
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default {
    getAllUsers
}