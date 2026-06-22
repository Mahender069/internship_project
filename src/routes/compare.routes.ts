import { Router } from "express";

import { compareColleges } from "../controllers/compare.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Compare
 *   description: College comparison
 */

/**
 * @swagger
 * /api/compare-colleges:
 *   post:
 *     summary: Compare 2-3 colleges
 *     tags: [Compare]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - collegeIds
 *             properties:
 *               collegeIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - cmqo3nugk001me8nk036871mi
 *                   - cmqo3nvr2001re8nkcsq4k3e4
 *                   - cmqo3nwfo001ue8nks04ee3q5
 *     responses:
 *       200:
 *         description: Comparison generated successfully
 */

router.post("/", compareColleges);

export default router;