import { Router } from "express";

import {
  saveCollege,
  getSavedColleges,
  removeSavedCollege,
} from "../controllers/saved.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Saved Colleges
 *   description: User saved colleges
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/saved-colleges:
 *   post:
 *     summary: Save a college
 *     tags: [Saved Colleges]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - collegeId
 *             properties:
 *               collegeId:
 *                 type: string
 *                 example: cmqo3nwfo001ue8nks04ee3q5
 *     responses:
 *       201:
 *         description: College saved successfully
 */

router.post("/", saveCollege);

/**
 * @swagger
 * /api/saved-colleges:
 *   get:
 *     summary: Get saved colleges
 *     tags: [Saved Colleges]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Saved colleges fetched
 */

router.get("/", getSavedColleges);

/**
 * @swagger
 * /api/saved-colleges/{collegeId}:
 *   delete:
 *     summary: Remove saved college
 *     tags: [Saved Colleges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: collegeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: College removed successfully
 */
router.delete("/:collegeId", removeSavedCollege);

export default router;