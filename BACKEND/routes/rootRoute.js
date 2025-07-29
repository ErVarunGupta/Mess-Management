import express from 'express';
import { ProfileController } from '../controllers/ProfileController.js';
import { ProfileValidation } from '../middlewares/ProfileValidation.js';
import { MenuController } from '../controllers/MenuController.js';
import { UpdateMenuController } from '../controllers/UpdateMenuController.js';
import { MenuValidation } from '../middlewares/MenuValidation.js';
import { DeleteMenuController } from '../controllers/DeleteMenuController.js';
import { ViewMenuController } from '../controllers/ViewMenuController.js';
import { ViewDayMenuController } from '../controllers/ViewDayMenuController.js';
import { ViewMenuValidation } from '../middlewares/ViewMenuValidation.js';
import { UpdateDayMenuController } from '../controllers/UpdateDayMenuController.js';

const router = express.Router();


router.get("/", (req, res) =>{
    res.send("root route");
})

router.get("/user/:id",ProfileValidation, ProfileController);

router.get("/menu/view",ViewMenuValidation, ViewMenuController);
router.get("/menu/view/:day",ViewMenuValidation, ViewDayMenuController);
router.post("/menu/create",MenuValidation, MenuController);
router.put("/menu/update",MenuValidation, UpdateMenuController);
router.put("/menu/update/:day",MenuValidation, UpdateDayMenuController);
router.delete("/menu/delete",MenuValidation, DeleteMenuController);


export default router;