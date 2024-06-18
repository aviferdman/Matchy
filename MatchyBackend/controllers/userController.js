class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async createUser(req, res) {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error.message === 'Email already in use') {
                res.status(400).json({ error: 'Email already in use' });
            } else {
                res.status(500).json({ error: 'An error occurred while creating the user' });
            }
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while retrieving the users' });
        }
    }

    async getAllUsersByGender(req, res) {
        try {
            const users = await this.userService.getAllUsersByGender(req.params.gender);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while retrieving the users' });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await this.userService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while retrieving the user' });
        }
    }

    async updateUser(req, res) {
        try {
            const result = await this.userService.updateUser(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while updating the user' });
        }
    }

    async deleteUser(req, res) {
        try {
            const result = await this.userService.deleteUser(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while deleting the user' });
        }
    }
}

module.exports = UserController;
