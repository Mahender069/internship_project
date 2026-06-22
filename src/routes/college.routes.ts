import { Router } from "express";

import {
  getColleges,
  getCollegeById,
} from "../controllers/college.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Colleges
 *   description: College APIs
 */

/**
 * @swagger
 * /api/colleges:
 *   get:
 *     summary: Get colleges
 *     tags: [Colleges]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by college name
 *
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Filter by state
 *
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *         description: Minimum rating
 *
 *       - in: query
 *         name: minFees
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: maxFees
 *         schema:
 *           type: number
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: rating
 *
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           example: desc
 *
 *     responses:
 *       200:
 *         description: Colleges fetched successfully
 */

router.get("/", getColleges);


/**
 * @swagger
 * /api/colleges/{id}:
 *   get:
 *     summary: Get college details
 *     tags: [Colleges]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: College details
 *       404:
 *         description: College not found
 */
router.get("/:id", getCollegeById);

export default router;